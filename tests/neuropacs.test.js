require("../src/neuropacs.js");
const {
  isObject,
  isValidAesCtrKey,
  isValidUuid4,
  isValidTimestamp,
  readDirectory
} = require("./testUtils");
const path = require("path");

const devServerUrl =
  "https://sl3tkzp9ve.execute-api.us-east-2.amazonaws.com/dev";
const invalidServerUrl =
  "https://invalid.execute-api.us-east-2.amazonaws.com/not_real";

const adminKey = process.env.ADMIN_API_KEY;
const regKey = process.env.REG_API_KEY;

//change

const npcsAdmin = Neuropacs.init({
  serverUrl: devServerUrl,
  apiKey: adminKey
});

const npcsReg = Neuropacs.init({
  serverUrl: devServerUrl,
  apiKey: regKey
});

const npcsInvalid = Neuropacs.init({
  serverUrl: invalidServerUrl,
  apiKey: regKey
});

// Successful connection
test("successful connection with admin key", async () => {
  const session = await npcsAdmin.connect();
  const timestamp = session.timestamp;
  const aesKey = session.aesKey;
  const connectionId = session.connectionId;
  expect(isObject(session)).toBe(true);
  expect(isValidAesCtrKey(aesKey)).toBe(true);
  expect(isValidTimestamp(timestamp)).toBe(true);
  expect(isValidUuid4(connectionId)).toBe(true);
});

// Successful order creation
test("successful order creation", async () => {
  await npcsAdmin.connect();
  const orderId = await npcsAdmin.newJob();
  expect(isValidUuid4(orderId)).toBe(true);
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
