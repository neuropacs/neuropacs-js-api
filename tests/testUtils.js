const { validate: uuidValidate, version: uuidVersion } = require("uuid");
const base64 = require("base-64");
const fs = require("fs").promises;
const path = require("path");

const devServerUrl =
  "https://sl3tkzp9ve.execute-api.us-east-2.amazonaws.com/dev";
const invalidServerUrl =
  "https://invalid.execute-api.us-east-2.amazonaws.com/not_real";

const adminKey = process.env.ADMIN_API_KEY;
const regKey = process.env.REG_API_KEY;
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

const isValidResultRawJson = (result) => {
  try {
    JSON.parse(String(result).trim());
    return true;
  } catch (e) {
    return false;
  }
};

const isValidResultRawPng = (result) => {};

const isValidResultRawTxt = (result) => {
  return typeof result == "string" && String(result).length > 0;
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
