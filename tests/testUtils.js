const { validate: uuidValidate, version: uuidVersion } = require("uuid");
const base64 = require("base-64");
const fs = require("fs").promises;
const path = require("path");

const devServerUrl =
  "https://sl3tkzp9ve.execute-api.us-east-2.amazonaws.com/dev";
const invalidServerUrl =
  "https://invalid.execute-api.us-east-2.amazonaws.com/not_real";

// const adminKey = process.env.ADMIN_API_KEY;
const adminKey = "IIhgYuScAuztZbWK54km38yc0da9him3Q3wyCuQ3"; //!DELETE BEFORE PUSHING
// const regKey = process.env.REG_API_KEY;
const regKey = "IIhgYuScAuztZbWK54km38yc0da9him3Q3wyCuQ3"; //! DELETE BEFORE PUSHING
const invalidKey = "invalidApiKey123";

const originType = "Integration Tests";

const isValidUuid4 = (value) => {
  return uuidValidate(value) && uuidVersion(value) === 4;
};

const isObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

const isValidAesCtrKey = (key) => {
  try {
    base64.decode(key);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date);
};

const isValidSessionObj = (conn) => {
  return (
    conn &&
    isObject(conn) &&
    isValidTimestamp(conn.timestamp) &&
    isValidUuid4(conn.connectionId) &&
    isValidAesCtrKey(conn.aesKey)
  );
};

const readDirectory = async (dirPath) => {
  try {
    const files = await fs.readdir(dirPath);
    const fileObjects = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      fileObjects.push({
        name: file,
        path: filePath,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        mtime: stats.mtime
      });
    }

    return fileObjects;
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
};

const isValidStatusObj = (statusObj) => {
  return (
    statusObj &&
    isObject(statusObj) &&
    typeof statusObj.started == "boolean" &&
    typeof statusObj.finished == "boolean" &&
    typeof statusObj.failed == "boolean" &&
    statusObj.progress &&
    typeof statusObj.progress == "number" &&
    statusObj.info &&
    typeof statusObj.info == "string"
  );
};

const getUTCDate = () => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isValidResultRawXml = (result) => {};

const isValidResultRawJson = (result) => {};

const isValidResultRawPng = (result) => {};

const isValidResultRawTxt = (result) => {
  /*
    Order ID:78dd2a0d-a7a9-4e9f-97c7-c060b5451c7f
    Date (Y-M-D):2024-06-17
    Input:9829 DICOM files
    Analysis:PD/MSA/PSP-v1.0
    ML Version:2BP20V6_29
    MSAPSPvsPD:0.2793
    MSAPSPvsPD Info:The result indicates that between PD and Atypical, there is higher probability of PD diagnosis.
    MCP Free Water Value:0.0472
    MCP Control Mean:0.0738
    MCP Control StDev:0.0259
    Putamen Free Water Value:0.1951
    Putamen Control Mean:0.1765
    Putamen Control StDev:0.0610
    SCP Free Water Value:0.2068
    SCP Control Mean:0.2989
    SCP Control StDev:0.0762
    pSN Free Water Value:0.2293
    pSN Control Mean:0.1753
    pSN Control StDev:0.0420
    Disclaimer:Patient management decisions should not be made solely on the basis of analysis by the neuropacs system.
   */
};

const isValidResultBlobTxt = (result) => {};

const isValidResultBlobXml = (result) => {};

const isValidResultBlobJson = (result) => {};

const isValidResultBlobPng = (result) => {};

module.exports = {
  isValidAesCtrKey,
  isObject,
  isValidUuid4,
  isValidTimestamp,
  readDirectory,
  isValidStatusObj,
  isValidResultRawTxt,
  isValidResultBlobTxt,
  isValidResultRawXml,
  isValidResultBlobXml,
  isValidResultRawJson,
  isValidResultBlobJson,
  isValidResultRawPng,
  isValidResultBlobPng,
  isValidSessionObj,
  devServerUrl,
  invalidKey,
  invalidServerUrl,
  adminKey,
  regKey,
  originType
};
