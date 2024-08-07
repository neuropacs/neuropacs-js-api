require("../src/neuropacs.js");
const {
  isValidUuid4,
  isValidSessionObj,
  readDirectory,
  isValidStatusObj,
  devServerUrl,
  adminKey,
  originType,
  regKey,
  invalidKey,
  invalidServerUrl,
  isValidResultRawTxt,
  isValidResultRawJson
} = require("./testUtils");
const path = require("path");

/**
 * Tests to do
 *  - admin key access to non admin job info (should succeed)
 *  - non admin key access to admin job info (should fail)
 *  - dataset upload (JS)
 *  -
 *
 */

const npcsAdmin = Neuropacs.init({
  serverUrl: devServerUrl,
  apiKey: adminKey,
  originType: originType
});

const npcsReg = Neuropacs.init({
  serverUrl: devServerUrl,
  apiKey: regKey,
  originType: originType
});

const npcsInvalidApiKey = Neuropacs.init({
  serverUrl: devServerUrl,
  apiKey: invalidKey,
  originType: originType
});

const npcsInvalidServerUrl = Neuropacs.init({
  serverUrl: invalidServerUrl,
  apiKey: regKey,
  originType: originType
});

// Invalid server URL
test("invalid server URL", async () => {
  await expect(npcsInvalidServerUrl.connect()).rejects.toThrow(
    "Connection creation failed: OAEP encryption failed: Retrieval of public key failed: request to https://invalid.execute-api.us-east-2.amazonaws.com/not_real/api/getPubKey/ failed, reason: getaddrinfo ENOTFOUND invalid.execute-api.us-east-2.amazonaws.com"
  );
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

// Test no connection id in request header
test("missing connection id in request header", async function () {
  npcsReg.connectionId = "";
  await expect(npcsReg.newJob()).rejects.toThrow(
    "Job creation failed: No connection ID in request header."
  );
});

// Successful dataset upload
// test("successful dataset upload", async () => {
//   await npcsAdmin.connect();
//   const orderId = await npcsAdmin.newJob();
//   console.log(orderId);
//   const dataset = await readDirectory("./tests/test_dataset");
//   console.log(dataset);
//   const uploadStatus = await npcsAdmin.uploadDataset({
//     dataset: dataset,
//     orderId: orderId,
//     datasetId: orderId,
//     callback: (info) => {
//       console.log(info);
//     }
//   });
//   console.log(uploadStatus);
// });

// Successful status check
test("successful status check", async () => {
  await npcsAdmin.connect();
  const status = await npcsAdmin.checkStatus({ orderId: "TEST" });
  expect(isValidStatusObj(status)).toBe(true);
});

// Invalid order id in status check
test("Invalid order id in status check", async function () {
  await npcsAdmin.connect();
  await expect(npcsAdmin.checkStatus({ orderId: "NotValid" })).rejects.toThrow(
    "Status check failed: Bucket not found."
  );
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
  ).rejects.toThrow(
    'Result retrieval failed: Invalid format! Valid formats include: "txt", "json", "xml", "png".'
  );
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
