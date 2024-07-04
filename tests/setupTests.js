global.fetch = require("cross-fetch");
// require("jest-fetch-mock").enableMocks();

const crypto = require("crypto").webcrypto;
global.crypto.subtle = crypto.subtle;

const util = require("util");
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>");
global.document = dom.window.document;

const fs = require("fs");
global.fs = fs;
