require("../src/neuropacs.js");
const {
  isValidUuid4,
  isValidSessionObj,
  readDirectory,
  isValidStatusObj,
  serverUrl,
  adminKey,
  originType,
  regKey,
  invalidKey,
  invalidServerUrl,
  isValidResultRawTxt,
  isValidResultRawJson,
  noUsageRemainingApiKey,
  invalidOrderId,
  productId,
  testFile,
  isValidReportTxt,
  isValidReportJson,
  sleep
} = require("./testUtils");

/**
 * Tests to do
 *  - admin key access to non admin job info (should succeed)
 *  - non admin key access to admin job info (should fail)
 *  - successful job run
 *  - invalid order id in job run
 *  - no api key usages remaining
 *  - invalid product
 *  -
 */

const npcsAdmin = Neuropacs.init({
  serverUrl: serverUrl,
  apiKey: adminKey,
  originType: originType
});

const npcsReg = Neuropacs.init({
  serverUrl: serverUrl,
  apiKey: regKey,
  originType: originType
});

const npcsInvalidApiKey = Neuropacs.init({
  serverUrl: serverUrl,
  apiKey: invalidKey,
  originType: originType
});

const npcsNoRemainingUsages = Neuropacs.init({
  serverUrl: serverUrl,
  apiKey: noUsageRemainingApiKey,
  originType: originType
});

const npcsInvalidServerUrl = Neuropacs.init({
  serverUrl: invalidServerUrl,
  apiKey: regKey,
  originType: originType
});

describe("neuropacs JS Unit Tests", () => {
  beforeEach(() => {
    // Mock the appendChild to simulate script loading success
    const originalAppendChild = document.head.appendChild;
    jest.spyOn(document.head, "appendChild").mockImplementation((element) => {
      if (element.tagName === "SCRIPT") {
        // 1) Provide a minimal mock for window.JSZip
        global.window.JSZip = class {
          constructor() {
            this.files = {};
          }
          file(name, content) {
            this.files[name] = content;
          }
          async generateAsync(options) {
            // Return a mock blob or something you need
            return new Blob(["fake zip content"], { type: "application/zip" });
          }
        };

        // 2) Simulate async load by calling onload
        setTimeout(() => {
          if (typeof element.onload === "function") {
            element.onload();
          }
        }, 0);
      }
      // Let the original behavior also occur if needed
      return originalAppendChild.call(document.head, element);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // Clean up if needed
    delete global.window.JSZip;
  });

  // Successful connection
  test("successful connection", async () => {
    const session = await npcsAdmin.connect();
    expect(isValidSessionObj(session)).toBe(true);
  });

  // Invalid API key
  test("invalid api key", async function () {
    await expect(npcsInvalidApiKey.connect()).rejects.toThrow(
      "Connection creation failed: API key not found."
    );
  });

  // Successful order creation
  test("successful order creation", async () => {
    await npcsAdmin.connect();
    const orderId = await npcsAdmin.newJob();
    expect(isValidUuid4(orderId)).toBe(true);
  });

  // Test no connection params
  test("missing connection parameters", async function () {
    npcsReg.aesKey = null;
    npcsReg.connectionId = null;
    await expect(npcsReg.newJob()).rejects.toThrow(
      "Job creation failed: Missing session parameters, start a new session with 'connect()' and try again."
    );
  });

  // Successful dataset upload
  test("successful dataset upload", async () => {
    await npcsAdmin.connect();

    const orderId = await npcsAdmin.newJob();

    const upload = await npcsAdmin.uploadDatasetFromFileArray({
      orderId: orderId,
      fileArray: [testFile]
    });

    expect(upload).toBe(true);
  });

  // Invalid dataset type
  test("invalid dataset type", async function () {
    await npcsReg.connect();
    const orderId = await npcsReg.newJob();
    await expect(
      npcsReg.uploadDatasetFromFileArray({
        orderId: orderId,
        fileArray: ["/file/path"]
      })
    ).rejects.toThrow(
      "Error uploading study from file array: Dataset must be an array of files or a FileList"
    );
  });

  // Invalid order ID
  test("invalid orderID on upload", async function () {
    await npcsReg.connect();
    await expect(
      npcsReg.uploadDatasetFromFileArray({
        orderId: "not_real",
        fileArray: [testFile]
      })
    ).rejects.toThrow(
      "Error uploading study from file array: Multipart upload initialization failed: Bucket not found."
    );
  });

  // Successful job run
  test("successful job run", async () => {
    await npcsAdmin.connect();

    const orderId = await npcsAdmin.newJob();

    await npcsAdmin.uploadDatasetFromFileArray({
      orderId: orderId,
      fileArray: [testFile]
    });

    const job = await npcsAdmin.runJob({
      orderId: orderId,
      productName: productId
    });

    expect(job).toBe(202);
  });

  // Invalid order
  test("invalid order id in job run", async function () {
    await npcsReg.connect();
    await expect(
      npcsReg.runJob({ orderId: invalidOrderId, productName: productId })
    ).rejects.toThrow("Job run failed: Bucket not found.");
  });

  // No API key usages remaining
  test("no api key usages remaining", async function () {
    await npcsNoRemainingUsages.connect();
    const orderId = await npcsNoRemainingUsages.newJob();

    await expect(
      npcsNoRemainingUsages.runJob({
        orderId: orderId,
        productName: productId
      })
    ).rejects.toThrow("Job run failed: No API key usages remaining.");
  });

  // Invalid product ID
  test("invalid product id", async function () {
    await npcsAdmin.connect();
    const orderId = await npcsAdmin.newJob();

    await npcsAdmin.uploadDatasetFromFileArray({
      orderId: orderId,
      fileArray: [testFile]
    });

    await expect(
      npcsAdmin.runJob({
        orderId: orderId,
        productName: "not_real"
      })
    ).rejects.toThrow("Job run failed: Product not found.");
  });

  // Successful status check
  test("successful status check", async () => {
    await npcsAdmin.connect();
    const status = await npcsAdmin.checkStatus({ orderId: "TEST" });
    expect(isValidStatusObj(status)).toBe(true);
  });

  // Invalid order id in status check
  test("Invalid order id in status check", async function () {
    await npcsAdmin.connect();
    await expect(
      npcsAdmin.checkStatus({ orderId: "NotValid" })
    ).rejects.toThrow("Status check failed: Bucket not found.");
  });

  // Successful result retrieval in raw txt format
  test("successful result retrieval in raw txt format", async () => {
    await npcsAdmin.connect();
    const status = await npcsAdmin.getResults({
      orderId: "TEST",
      format: "TXT",
      dataType: "raw"
    });
    expect(isValidResultRawTxt(status)).toBe(true);
  });

  // Successful result retrieval in raw json format
  test("successful result retrieval in raw json format", async () => {
    await npcsAdmin.connect();
    const status = await npcsAdmin.getResults({
      orderId: "TEST",
      format: "json",
      dataType: "raw"
    });
    expect(isValidResultRawJson(status)).toBe(true);
  });

  // Invalid result format
  test("invalid result format for result retrieval", async () => {
    await npcsAdmin.connect();

    await expect(
      npcsAdmin.getResults({
        orderId: "TEST",
        format: "INVALID",
        dataType: "raw"
      })
    ).rejects.toThrow("Result retrieval failed: Invalid format.");
  });

  // Invalid result data type
  test("invalid result data type for result retrieval", async () => {
    await npcsAdmin.connect();

    await expect(
      npcsAdmin.getResults({
        orderId: "TEST",
        format: "TXT",
        dataType: "INVALID"
      })
    ).rejects.toThrow("Result retrieval failed: Invalid data type.");
  });

  // Successful report retrieval in txt format
  test("successful report retrieval in txt format", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    const tenDaysAgoStr = `${
      tenDaysAgo.getMonth() + 1
    }/${tenDaysAgo.getDate()}/${tenDaysAgo.getFullYear()}`;

    await npcsTemp.connect();
    const report = await npcsTemp.getReport({
      format: "txt",
      startDate: tenDaysAgoStr,
      endDate: todayStr
    });
    expect(isValidReportTxt(report)).toBe(true);
  });

  // Successful report retrieval in json format
  test("successful report retrieval in json format", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    const tenDaysAgoStr = `${
      tenDaysAgo.getMonth() + 1
    }/${tenDaysAgo.getDate()}/${tenDaysAgo.getFullYear()}`;

    await npcsTemp.connect();
    const report = await npcsTemp.getReport({
      format: "json",
      startDate: tenDaysAgoStr,
      endDate: todayStr
    });
    expect(isValidReportJson(report)).toBe(true);
  });

  // Successful report retrieval in email format
  test("successful report retrieval in email format", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    const tenDaysAgoStr = `${
      tenDaysAgo.getMonth() + 1
    }/${tenDaysAgo.getDate()}/${tenDaysAgo.getFullYear()}`;

    await npcsTemp.connect();
    const report = await npcsTemp.getReport({
      format: "email",
      startDate: tenDaysAgoStr,
      endDate: todayStr
    });
    expect(report).toBe("Email sent successfully to kerrick@neuropacs.com.");
  });

  // Invalid start date format in report retrieval
  test("invalid start date format in report retrieval", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    await npcsTemp.connect();

    const today = new Date();
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    await expect(
      npcsTemp.getReport({
        format: "txt",
        startDate: "invalid",
        endDate: todayStr
      })
    ).rejects.toThrow(
      "Report retrieval failed: Invalid date format (MM/DD/YYYY)."
    );
  });

  // Invalid end date format in report retrieval
  test("invalid end date format in report retrieval", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    await npcsTemp.connect();

    const today = new Date();
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    await expect(
      npcsTemp.getReport({
        format: "txt",
        startDate: todayStr,
        endDate: "invalid"
      })
    ).rejects.toThrow(
      "Report retrieval failed: Invalid date format (MM/DD/YYYY)."
    );
  });

  // End date before start date in report retrieval
  test("end date before start date in report retrieval", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    await npcsTemp.connect();

    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    const tenDaysAgoStr = `${
      tenDaysAgo.getMonth() + 1
    }/${tenDaysAgo.getDate()}/${tenDaysAgo.getFullYear()}`;

    await expect(
      npcsTemp.getReport({
        format: "txt",
        startDate: todayStr,
        endDate: tenDaysAgoStr
      })
    ).rejects.toThrow(
      "Report retrieval failed: startDate must not exceed endDate."
    );
  });

  // End date exceeds current date in report retrieval
  test("end date exceeds current date in report retrieval", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    await npcsTemp.connect();

    const today = new Date();
    const tenDaysAhead = new Date(today);
    tenDaysAhead.setDate(today.getDate() + 10);
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    const tenDaysAheadStr = `${
      tenDaysAhead.getMonth() + 1
    }/${tenDaysAhead.getDate()}/${tenDaysAhead.getFullYear()}`;

    await expect(
      npcsTemp.getReport({
        format: "txt",
        startDate: todayStr,
        endDate: tenDaysAheadStr
      })
    ).rejects.toThrow(
      "Report retrieval failed: Provided date must not exceed current date."
    );
  });

  // Start date exceeds current date in report retrieval
  test("start date exceeds current date in report retrieval", async () => {
    // TODO: CHANGE THIS
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });

    await npcsTemp.connect();

    const today = new Date();
    const tenDaysAhead = new Date(today);
    tenDaysAhead.setDate(today.getDate() + 10);
    const todayStr = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    const tenDaysAheadStr = `${
      tenDaysAhead.getMonth() + 1
    }/${tenDaysAhead.getDate()}/${tenDaysAhead.getFullYear()}`;

    await expect(
      npcsTemp.getReport({
        format: "txt",
        startDate: tenDaysAheadStr,
        endDate: todayStr
      })
    ).rejects.toThrow(
      "Report retrieval failed: Provided date must not exceed current date."
    );
  });

  // Successful run QC check (DCM2NIIX error)
  test("successful run QC check", async () => {
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });
    await npcsTemp.connect();
    const orderId = await npcsTemp.newJob();
    await npcsTemp.uploadDatasetFromFileArray({
      orderId: orderId,
      fileArray: [testFile]
    });
    await sleep(50000);
    const qc = await npcsTemp.qcCheck({
      orderId: orderId,
      format: "txt"
    });
    expect(qc).toBe("QC FAILED: ERR_UNZIP_FAILED");
  });

  // Invalid format in QC check
  test("invalid format for QC check", async () => {
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });
    await npcsTemp.connect();
    const orderId = await npcsTemp.newJob();

    await expect(
      npcsTemp.qcCheck({
        orderId: orderId,
        format: "not_real"
      })
    ).rejects.toThrow("QC check failed: Invalid format.");
  });

  // No dataset found in QC check
  test("no dataset found in QC check", async () => {
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });
    await npcsTemp.connect();
    const orderId = await npcsTemp.newJob();

    await expect(
      npcsTemp.qcCheck({
        orderId: orderId,
        format: "txt"
      })
    ).rejects.toThrow(
      "QC check failed: No dataset found. Upload a dataset before running QC."
    );
  });

  // Dataset in use in QC check
  test("dataset in use in QC check", async () => {
    const npcsTemp = Neuropacs.init({
      serverUrl:
        "https://ud7cvn39n4.execute-api.us-east-1.amazonaws.com/sandbox",
      apiKey: "generate_api_key"
    });
    await npcsTemp.connect();
    const orderId = await npcsTemp.newJob();
    await npcsTemp.uploadDatasetFromFileArray({
      orderId: orderId,
      fileArray: [testFile],
      callback: (info) => {
        console.log(info);
      }
    });
    await expect(
      npcsTemp.qcCheck({
        orderId: orderId,
        format: "txt"
      })
    ).rejects.toThrow("QC check failed: Dataset in use, try again later.");
  });
});
