/**
- invalid server url
- generate aes key
    - success X
- get public key
    - success X
- connect 
    - success X
    - invalid api key X
- new job 
    - success X
    - invalid connection id X
- upload 
    - File object success 
    - Uint8Array success 
- upload dataset 
    - dataset path success 
- run job
    - success
    - invalid product 
    - invalid order id 
    - invalid connection id 
- check status
    - success 
    - invalid order id 
    - invalid connection id 
- get results
    - success 
        - TXT 
        - JSON 
        - XML 
    - invalid result format 
    - invalid order id 
    - invalid connection id
**/

require("../src/neuropacs.js");

const adminKey = "cdXVNIFzEUbSElTpoVoK4SyRrJ7Zj6n6Y6wgApIc";
const regKey = "7PRHFkrxE71dpBNGw2HaS8PxesOzrZZB2XEWU3Xj";

const npcsAdmin = Neuropacs.init({
  serverUrl: "https://sl3tkzp9ve.execute-api.us-east-2.amazonaws.com/dev",
  apiKey: adminKey
});

const npcsReg = Neuropacs.init({
  serverUrl: "https://sl3tkzp9ve.execute-api.us-east-2.amazonaws.com/dev",
  apiKey: regKey
});

const npcsInvalid = Neuropacs.init({
  serverUrl: "https://invalid.execute-api.us-east-2.amazonaws.com/not_real",
  apiKey: regKey
});

// Invalid server URL
test("invalid server URL", async () => {
  await expect(await npcsInvalid.connect()).rejects.toThrow(
    "Connection creation failed: OAEP encryption failed: Retrieval of public key failed: request to https://invalid.execute-api.us-east-2.amazonaws.com/not_real/api/getPubKey/ failed, reason: getaddrinfo ENOTFOUND invalid.execute-api.us-east-2.amazonaws.com"
  );
});

// Successful connection
test("successful connection", async () => {
  const session = await npcsAdmin.connect();
  console.log(session);
  expect(typeof session).toBe("object");
});
