require("../src/neuropacs.js");
const {
  isObject,
  isValidAesCtrKey,
  isValidUuid4,
  isValidTimestamp
} = require("./testUtils");

const devServerUrl =
  "https://sl3tkzp9ve.execute-api.us-east-2.amazonaws.com/dev";
const invalidServerUrl =
  "https://invalid.execute-api.us-east-2.amazonaws.com/not_real";

const adminKey = "cdXVNIFzEUbSElTpoVoK4SyRrJ7Zj6n6Y6wgApIc";
const regKey = "7PRHFkrxE71dpBNGw2HaS8PxesOzrZZB2XEWU3Xj";

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

// // Invalid server URL
// test("invalid server URL", async () => {
//   await expect(await npcsInvalid.connect()).rejects.toThrow(
//     "Connection creation failed: OAEP encryption failed: Retrieval of public key failed: request to https://invalid.execute-api.us-east-2.amazonaws.com/not_real/api/getPubKey/ failed, reason: getaddrinfo ENOTFOUND invalid.execute-api.us-east-2.amazonaws.com"
//   );
// });

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
