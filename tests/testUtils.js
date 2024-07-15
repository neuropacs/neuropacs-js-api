const { validate: uuidValidate, version: uuidVersion } = require("uuid");
const base64 = require("base-64");
const fs = require("fs").promises;
const path = require("path");

const isValidUuid4 = (value) => {
  return uuidValidate(value) && uuidVersion(value) === 4;
};

const isObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

const isValidAesCtrKey = (key) => {
  try {
    const decodedKey = base64.decode(key);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date);
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

module.exports = {
  isValidAesCtrKey,
  isObject,
  isValidUuid4,
  isValidTimestamp,
  readDirectory
};
