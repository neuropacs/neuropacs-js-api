const { validate: uuidValidate, version: uuidVersion } = require("uuid");
const base64 = require("base-64");

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

module.exports = { isValidAesCtrKey, isObject, isValidUuid4, isValidTimestamp };
