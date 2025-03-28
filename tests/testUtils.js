const { validate: uuidValidate, version: uuidVersion } = require("uuid");
const base64 = require("base-64");
const fs = require("fs").promises;
const path = require("path");

const serverUrl =
  "https://zq5jg2kqvj.execute-api.us-east-1.amazonaws.com/staging";

const invalidServerUrl =
  "https://invalid.execute-api.us-east-2.amazonaws.com/not_real";

const adminKey = process.env.ADMIN_API_KEY;
const regKey = process.env.REG_API_KEY;
const noUsageRemainingApiKey = process.env.NO_USAGES_REMAINING_API_KEY;

const invalidKey = "invalidApiKey123";
const invalidOrderId = "notARealOrderId";
const productId = "Atypical/MSAp/PSP-v1.0";

const originType = "JS Integration Tests";

const testFile = new File(
  [new Blob(["DICOM"], { type: "application/dicom" })],
  "example.dcm",
  { type: "application/dicom", lastModified: new Date() }
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const isValidResultRawJson = (result) => {
  try {
    JSON.parse(String(result).trim());
    return true;
  } catch (e) {
    return false;
  }
};

const isValidResultRawPng = (result) => {};

const isValidResultRawXml = (result) => {};

const isValidResultRawTxt = (result) => {
  return typeof result == "string" && String(result).length > 0;
};

const isValidResultBlobTxt = (result) => {};

const isValidResultBlobXml = (result) => {};

const isValidResultBlobJson = (result) => {};

const isValidResultBlobPng = (result) => {};

const isValidReportTxt = (result) => {
  return typeof result == "string" && String(result).length > 0;
};

const isValidReportJson = (result) => {
  try {
    JSON.stringify(result);
    return true;
  } catch (e) {
    return false;
  }
};

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
  isValidReportJson,
  isValidReportTxt,
  serverUrl,
  invalidKey,
  invalidServerUrl,
  adminKey,
  regKey,
  noUsageRemainingApiKey,
  originType,
  invalidOrderId,
  productId,
  testFile,
  sleep
};
