"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _generateUniqueUUID = /*#__PURE__*/new WeakMap();
var _loadScript = /*#__PURE__*/new WeakMap();
var _generateAesKey = /*#__PURE__*/new WeakMap();
var _oaepEncrypt = /*#__PURE__*/new WeakMap();
var _getPublicKey = /*#__PURE__*/new WeakMap();
var _str2ab = /*#__PURE__*/new WeakMap();
var _arrayBufferToBase = /*#__PURE__*/new WeakMap();
var _getTimeDateString = /*#__PURE__*/new WeakMap();
var _pad = /*#__PURE__*/new WeakMap();
var _encryptAesCtr = /*#__PURE__*/new WeakMap();
var _ensureUniqueName = /*#__PURE__*/new WeakMap();
var _decryptAesCtr = /*#__PURE__*/new WeakMap();
var _Neuropacs_brand = /*#__PURE__*/new WeakSet();
var _newMultipartUpload = /*#__PURE__*/new WeakMap();
var _completeMultipartUpload = /*#__PURE__*/new WeakMap();
var _uploadPart = /*#__PURE__*/new WeakMap();
/*!
 * neuropacs JavaScript API v1.1.9
 * (c) 2024 neuropacs
 * Released under the MIT License.
 */
var Neuropacs = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {String} apiKey API key for server
   * @param {String} serverUrl Server URL for an instance
   * @param {String} originType Request origin (default = "API")
   */
  function Neuropacs(serverUrl, apiKey) {
    var _this = this;
    var originType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "API";
    _classCallCheck(this, Neuropacs);
    /**
     * Wrapper function to retry AWS request-based function multiple times if it fails.
     * @param {*} fn Function to retry
     * @param {*} maxRetries Maximum number of retries before giving up.
     * @param {*} delay Delay in seconds between retries.
     * @returns Wrapped function promise
     */
    _classPrivateMethodInitSpec(this, _Neuropacs_brand);
    /**
     * Private methods
     */

    /**
     * Generate a unique V4 UUID
     * @returns UUID V4 string
     */
    _classPrivateFieldInitSpec(this, _generateUniqueUUID, function () {
      try {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
            v = c == "x" ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      } catch (error) {
        throw new Error("UUID generation failed: ".concat(error.message || error.toString()));
      }
    });
    /**
     * Load external dependency script
     */
    _classPrivateFieldInitSpec(this, _loadScript, function (url) {
      return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = function () {
          resolve(); // Resolve the promise when the script is loaded
        };
        script.onerror = function () {
          reject(new Error("Script failed to load."));
        };
        document.head.appendChild(script);
      });
    });
    /**
     * Generate an 16-byte AES key for AES-CTR encryption.
     * @returns AES key encoded as a base64 string.
     */
    _classPrivateFieldInitSpec(this, _generateAesKey, function () {
      try {
        var aesKey = new Uint8Array(16);
        window.crypto.getRandomValues(aesKey);
        var aesKeyBase64 = btoa(String.fromCharCode.apply(null, aesKey));
        return aesKeyBase64;
      } catch (error) {
        throw new Error("AES key generation failed: ".concat(error.message || error.toString()));
      }
    });
    /**
     * OAEP encrypt plaintext.
     * @param {String/JSON} plaintext Plaintext to be encrypted.
     * @returns Base64 string OAEP encrypted ciphertext.
     */
    _classPrivateFieldInitSpec(this, _oaepEncrypt, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(plaintext) {
        var publicKey, pemHeader, pemFooter, pemContents, binaryDerString, publicKeyBuffer, publicKeyObject, ciphertextArrayBuffer, ciphertextBase64;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // If plaintext is not a string, attempt to convert it to JSON
              plaintext = typeof plaintext === "string" ? plaintext : JSON.stringify(plaintext);
              _context.next = 7;
              break;
            case 4:
              _context.prev = 4;
              _context.t0 = _context["catch"](0);
              throw new RangeError("Plaintext must be a string or JSON.");
            case 7:
              _context.prev = 7;
              _context.next = 10;
              return _classPrivateFieldGet(_getPublicKey, _this).call(_this);
            case 10:
              publicKey = _context.sent;
              // extract the part of the PEM string between header and footer
              pemHeader = "-----BEGIN PUBLIC KEY-----";
              pemFooter = "-----END PUBLIC KEY-----";
              pemContents = publicKey.substring(pemHeader.length, publicKey.length - pemFooter.length - 1); // base64 decode the string to get the binary data
              binaryDerString = window.atob(pemContents); // convert from a binary string to an ArrayBuffer
              publicKeyBuffer = _classPrivateFieldGet(_str2ab, _this).call(_this, binaryDerString); // Convert the public key to public key objecct
              _context.next = 18;
              return crypto.subtle.importKey("spki", publicKeyBuffer, {
                name: "RSA-OAEP",
                hash: "SHA-256"
              }, true, ["encrypt"]);
            case 18:
              publicKeyObject = _context.sent;
              _context.next = 21;
              return crypto.subtle.encrypt({
                name: "RSA-OAEP"
              }, publicKeyObject, new TextEncoder().encode(plaintext));
            case 21:
              ciphertextArrayBuffer = _context.sent;
              // Convert the ciphertext to Base64
              ciphertextBase64 = _classPrivateFieldGet(_arrayBufferToBase, _this).call(_this, ciphertextArrayBuffer);
              return _context.abrupt("return", ciphertextBase64);
            case 26:
              _context.prev = 26;
              _context.t1 = _context["catch"](7);
              throw new Error("OAEP encryption failed: ".concat(_context.t1.message || _context.t1.toString()));
            case 29:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 4], [7, 26]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    /**
     * Retrieve public key from server.
     * @returns {String} Base64 string public key.
     */
    _classPrivateFieldInitSpec(this, _getPublicKey, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var headers, response, json, pubKey;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            headers = {
              "Origin-Type": _this.originType
            };
            _context2.prev = 1;
            _context2.next = 4;
            return fetch("".concat(_this.serverUrl, "/api/getPubKey/"), {
              method: "GET",
              headers: headers
            });
          case 4:
            response = _context2.sent;
            if (response.ok) {
              _context2.next = 15;
              break;
            }
            if (!(response.status == 403)) {
              _context2.next = 8;
              break;
            }
            throw new Error("CORS error.");
          case 8:
            _context2.t0 = Error;
            _context2.t1 = JSON;
            _context2.next = 12;
            return response.text();
          case 12:
            _context2.t2 = _context2.sent;
            _context2.t3 = _context2.t1.parse.call(_context2.t1, _context2.t2).error;
            throw new _context2.t0(_context2.t3);
          case 15:
            _context2.next = 17;
            return response.json();
          case 17:
            json = _context2.sent;
            pubKey = json.pub_key;
            return _context2.abrupt("return", pubKey);
          case 22:
            _context2.prev = 22;
            _context2.t4 = _context2["catch"](1);
            throw new Error("Retrieval of public key failed: ".concat(_context2.t4.message || _context2.t4.toString()));
          case 25:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 22]]);
    })));
    /**
     * String to array buffer
     * @param {*} str String to be converted
     * @returns Array buffer
     */
    _classPrivateFieldInitSpec(this, _str2ab, function (str) {
      try {
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
      } catch (error) {
        throw new Error("String to array buffer conversion failed: ".concat(error.message || error.toString()));
      }
    });
    /**
     * Convert array buffer to Base64
     * @param {ArrayBuffer} buffer Array buffer to be converted
     * @returns Base64 representation
     */
    _classPrivateFieldInitSpec(this, _arrayBufferToBase, function (buffer) {
      try {
        var binary = new Uint8Array(buffer);
        return btoa(String.fromCharCode.apply(null, binary));
      } catch (error) {
        throw new Error("Array buffer to base64 conversion failed: ".concat(error.message || error.toString()));
      }
    });
    /**
     * Generate a UTC time/date string
     * @returns UTC time/date string
     */
    _classPrivateFieldInitSpec(this, _getTimeDateString, function () {
      var currentDate = new Date();
      var year = currentDate.getUTCFullYear();
      var month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
      var day = String(currentDate.getUTCDate()).padStart(2, "0");
      var hours = String(currentDate.getUTCHours()).padStart(2, "0");
      var minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
      var seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");
      var formattedUTCDateTime = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds, " UTC");
      return formattedUTCDateTime;
    });
    /**
     * Padding for AES CTR
     * @param {*} data data to be padded
     * @param {*} blockSize block size of cipher
     * @returns  padded data
     */
    _classPrivateFieldInitSpec(this, _pad, /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, blockSize) {
        var padding, paddedData;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              padding = blockSize - data.length % blockSize;
              paddedData = new Uint8Array(data.length + padding);
              paddedData.set(data);
              return _context3.abrupt("return", paddedData);
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw new Error("AES padding failed : ".concat(_context3.t0.message || _context3.t0.toString()));
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    /**
     * AES CTR encrypt plaintext
     * @param {JSON/String/Bytes} plaintext Plaintext to be encrypted.
     * @param {String} aesKey Base64 AES key.
     * @param {String} formatOut format of ciphertext. Defaults to "string".
     * @returns {String} Encrypted ciphertext in requested format_out.
     */
    _classPrivateFieldInitSpec(this, _encryptAesCtr, /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(plaintext, aesKey, formatIn, formatOut) {
        var plaintextBytes, plaintextJson, aesKeyBytes, paddedPlaintext, iv, importedKey, ciphertext, encryptedData;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(formatIn == "string" && typeof plaintext === "string")) {
                _context4.next = 4;
                break;
              }
              plaintextBytes = new TextEncoder().encode(plaintext);
              _context4.next = 14;
              break;
            case 4:
              if (!(formatIn == "JSON")) {
                _context4.next = 9;
                break;
              }
              plaintextJson = JSON.stringify(plaintext);
              plaintextBytes = new TextEncoder().encode(plaintextJson);
              _context4.next = 14;
              break;
            case 9:
              if (!(formatIn == "Uint8Array" && plaintext instanceof Uint8Array)) {
                _context4.next = 13;
                break;
              }
              plaintextBytes = plaintext;
              _context4.next = 14;
              break;
            case 13:
              throw new Error("Invalid plaintext format!");
            case 14:
              _context4.prev = 14;
              // Decode the base64-encoded AES key
              aesKeyBytes = new Uint8Array(atob(aesKey).split("").map(function (c) {
                return c.charCodeAt(0);
              })); // Pad the plaintext
              _context4.next = 18;
              return _classPrivateFieldGet(_pad, _this).call(_this, plaintextBytes, 16);
            case 18:
              paddedPlaintext = _context4.sent;
              // Generate IV
              iv = crypto.getRandomValues(new Uint8Array(16)); // Import AES key
              _context4.next = 22;
              return crypto.subtle.importKey("raw", aesKeyBytes, {
                name: "AES-CTR"
              }, false, ["encrypt"]);
            case 22:
              importedKey = _context4.sent;
              _context4.next = 25;
              return crypto.subtle.encrypt({
                name: "AES-CTR",
                counter: iv,
                length: 128
              }, importedKey, paddedPlaintext);
            case 25:
              ciphertext = _context4.sent;
              // Combine IV and ciphertext
              encryptedData = new Uint8Array(iv.length + ciphertext.byteLength);
              encryptedData.set(iv);
              encryptedData.set(new Uint8Array(ciphertext), iv.length);

              // Convert to base64 if the output format is 'string'
              if (!(formatOut === "string")) {
                _context4.next = 33;
                break;
              }
              return _context4.abrupt("return", btoa(String.fromCharCode.apply(null, encryptedData)));
            case 33:
              if (!(formatOut === "bytes")) {
                _context4.next = 37;
                break;
              }
              return _context4.abrupt("return", encryptedData);
            case 37:
              throw new Error("Invalid output format");
            case 38:
              _context4.next = 43;
              break;
            case 40:
              _context4.prev = 40;
              _context4.t0 = _context4["catch"](14);
              throw new Error("AES encrption failed: ".concat(_context4.t0.message || _context4.t0.toString()));
            case 43:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[14, 40]]);
      }));
      return function (_x4, _x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }());
    /**
     * Ensures filenames are unique (some scanners produce duplicate filenames)
     * @param {Set} fileSet Set of existing file names
     * @param {String} filename File name to be added
     * @returns {String} Unique filename
     */
    _classPrivateFieldInitSpec(this, _ensureUniqueName, function (fileSet, filename) {
      var hasExt = false;
      if (filename.includes(".")) {
        hasExt = true;
      }
      var baseName = hasExt ? filename.replace(/\.[^/.]+$/, "") : filename; // Extract base name
      var extension = hasExt ? filename.split(".").pop() : ""; // Extract extension if exists
      var counter = 1;
      var newName = filename;
      while (fileSet.has(newName)) {
        newName = hasExt ? "".concat(baseName, "_").concat(counter, ".").concat(extension) : "".concat(baseName, "_").concat(counter);
        counter++;
      }
      fileSet.add(newName);
      return newName;
    });
    /**
     * AES CTR decrypt cyphertext
     * @param {JSON/String/Bytes} encryptedData Ciphertext to be decrypted.
     * @param {String} aesKey Base64 AES key.
     * @param {String} formatOut format of ciphertext. Defaults to "string".
     *
     * @returns {String} Decrpyted plaintext in requested format_out.
     */
    _classPrivateFieldInitSpec(this, _decryptAesCtr, /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(encryptedData, aesKey, formatOut) {
        var aesKeyBytes, encryptedBytes, iv, ciphertext, importedKey, decryptedBytes, decryptedText;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              // Decode the base64-encoded AES key
              aesKeyBytes = new Uint8Array(atob(aesKey).split("").map(function (c) {
                return c.charCodeAt(0);
              })); // Convert the base64-encoded encrypted data to Uint8Array
              encryptedBytes = new Uint8Array(atob(encryptedData).split("").map(function (c) {
                return c.charCodeAt(0);
              })); // Extract IV and ciphertext
              iv = encryptedBytes.slice(0, 16);
              ciphertext = encryptedBytes.slice(16); // Import AES key
              _context5.next = 7;
              return crypto.subtle.importKey("raw", aesKeyBytes, {
                name: "AES-CTR"
              }, false, ["decrypt"]);
            case 7:
              importedKey = _context5.sent;
              _context5.next = 10;
              return crypto.subtle.decrypt({
                name: "AES-CTR",
                counter: iv,
                length: 128
              }, importedKey, ciphertext);
            case 10:
              decryptedBytes = _context5.sent;
              // Convert the decrypted result to a string
              decryptedText = new TextDecoder().decode(decryptedBytes); // Handle the output format
              if (!(formatOut === "JSON")) {
                _context5.next = 17;
                break;
              }
              decryptedText = decryptedText.trim();
              return _context5.abrupt("return", JSON.parse(decryptedText));
            case 17:
              if (!(formatOut === "string")) {
                _context5.next = 21;
                break;
              }
              return _context5.abrupt("return", decryptedText);
            case 21:
              if (!(formatOut === "Uint8Array")) {
                _context5.next = 25;
                break;
              }
              return _context5.abrupt("return", decryptedBytes);
            case 25:
              throw new Error("Invalid output format");
            case 26:
              _context5.next = 31;
              break;
            case 28:
              _context5.prev = 28;
              _context5.t0 = _context5["catch"](0);
              throw new Error("AES decryption failed: ".concat(_context5.t0.message || _context5.t0.toString()));
            case 31:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 28]]);
      }));
      return function (_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }());
    /**
     * Start new multipart upload
     * @param {String} datasetId Base64 datasetId
     * @param {Number} partIndex Index of zip file
     * @param {String} orderId Base64 orderId
     * @returns AWS UploadId
     */
    _classPrivateFieldInitSpec(this, _newMultipartUpload, /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(datasetId, index, orderId) {
        var url, body, encryptedBody, headers, response, resText, resJson;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              url = "".concat(_this.serverUrl, "/api/multipartUploadRequest/");
              body = {
                datasetId: datasetId,
                zipIndex: index,
                orderId: orderId
              };
              _context6.next = 5;
              return _classPrivateFieldGet(_encryptAesCtr, _this).call(_this, body, _this.aesKey, "JSON", "string");
            case 5:
              encryptedBody = _context6.sent;
              headers = {
                "Content-Type": "text/plain",
                "Connection-Id": _this.connectionId,
                "Origin-Type": _this.originType
              };
              _context6.next = 9;
              return fetch(url, {
                method: "POST",
                body: encryptedBody,
                headers: headers
              });
            case 9:
              response = _context6.sent;
              if (response.ok) {
                _context6.next = 18;
                break;
              }
              _context6.t0 = Error;
              _context6.t1 = JSON;
              _context6.next = 15;
              return response.text();
            case 15:
              _context6.t2 = _context6.sent;
              _context6.t3 = _context6.t1.parse.call(_context6.t1, _context6.t2).error;
              throw new _context6.t0(_context6.t3);
            case 18:
              _context6.next = 20;
              return response.text();
            case 20:
              resText = _context6.sent;
              _context6.next = 23;
              return _classPrivateFieldGet(_decryptAesCtr, _this).call(_this, resText, _this.aesKey, "JSON");
            case 23:
              resJson = _context6.sent;
              return _context6.abrupt("return", resJson.uploadId);
            case 27:
              _context6.prev = 27;
              _context6.t4 = _context6["catch"](0);
              throw new Error("Multipart upload initialization failed: ".concat(_context6.t4.message || _context6.t4.toString()));
            case 30:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 27]]);
      }));
      return function (_x11, _x12, _x13) {
        return _ref6.apply(this, arguments);
      };
    }());
    /**
     * Complete multipart upload
     * @param {String} orderId Base64 orderId
     * @param {String} datasetId Base64 datasetId
     * @param {Number} partIndex Index of zip file
     * @param {String} uploadId Base64 uploadId
     * @param {Object} uploadParts Uploaded parts object
     * @returns status code
     */
    _classPrivateFieldInitSpec(this, _completeMultipartUpload, /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(orderId, datasetId, zipIndex, uploadId, uploadParts) {
        var url, headers, body, encryptedBody, response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              url = "".concat(_this.serverUrl, "/api/completeMultipartUpload/");
              headers = {
                "Content-Type": "text/plain",
                "Connection-Id": _this.connectionId,
                "Origin-Type": _this.originType
              };
              body = {
                datasetId: datasetId,
                uploadId: uploadId,
                uploadParts: uploadParts,
                zipIndex: zipIndex,
                orderId: orderId
              };
              _context7.next = 6;
              return _classPrivateFieldGet(_encryptAesCtr, _this).call(_this, body, _this.aesKey, "JSON", "string");
            case 6:
              encryptedBody = _context7.sent;
              _context7.next = 9;
              return fetch(url, {
                method: "POST",
                headers: headers,
                body: encryptedBody
              });
            case 9:
              response = _context7.sent;
              if (response.ok) {
                _context7.next = 18;
                break;
              }
              _context7.t0 = Error;
              _context7.t1 = JSON;
              _context7.next = 15;
              return response.text();
            case 15:
              _context7.t2 = _context7.sent;
              _context7.t3 = _context7.t1.parse.call(_context7.t1, _context7.t2).error;
              throw new _context7.t0(_context7.t3);
            case 18:
              return _context7.abrupt("return", 200);
            case 21:
              _context7.prev = 21;
              _context7.t4 = _context7["catch"](0);
              throw new Error("Multipart upload completion failed: ".concat(_context7.t4.message || _context7.t4.toString()));
            case 24:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 21]]);
      }));
      return function (_x14, _x15, _x16, _x17, _x18) {
        return _ref7.apply(this, arguments);
      };
    }());
    /**
     * Upload a part of the multipart upload
     * @param {String} uploadId Base64 uploadId
     * @param {String} datasetId Base64 datasetId
     * @param {Number} partIndex Index of zip file
     * @param {String} orderId Base64 orderId
     * @param {Number} partNumber Part number
     * @param {Bytes} partData Part data
     * @returns
     */
    _classPrivateFieldInitSpec(this, _uploadPart, /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(uploadId, datasetId, zipIndex, orderId, partNumber, partData) {
        var response, headers, body, encryptedBody, resText, resJson, presignedUrl, eTag;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              headers = {
                "Content-Type": "text/plain",
                "Connection-Id": _this.connectionId,
                "Origin-Type": _this.originType
              };
              body = {
                datasetId: datasetId,
                uploadId: uploadId,
                partNumber: partNumber,
                zipIndex: zipIndex,
                orderId: orderId
              };
              _context8.next = 5;
              return _classPrivateFieldGet(_encryptAesCtr, _this).call(_this, body, _this.aesKey, "JSON", "string");
            case 5:
              encryptedBody = _context8.sent;
              _context8.next = 8;
              return fetch("".concat(_this.serverUrl, "/api/multipartPresignedUrl/"), {
                method: "POST",
                headers: headers,
                body: encryptedBody
              });
            case 8:
              response = _context8.sent;
              if (response.ok) {
                _context8.next = 17;
                break;
              }
              _context8.t0 = Error;
              _context8.t1 = JSON;
              _context8.next = 14;
              return response.text();
            case 14:
              _context8.t2 = _context8.sent;
              _context8.t3 = _context8.t1.parse.call(_context8.t1, _context8.t2).error;
              throw new _context8.t0(_context8.t3);
            case 17:
              _context8.next = 19;
              return response.text();
            case 19:
              resText = _context8.sent;
              _context8.next = 22;
              return _classPrivateFieldGet(_decryptAesCtr, _this).call(_this, resText, _this.aesKey, "JSON");
            case 22:
              resJson = _context8.sent;
              presignedUrl = resJson.presignedUrl;
              if (presignedUrl) {
                _context8.next = 26;
                break;
              }
              throw new Error("Presigned URL not present in AWS response.");
            case 26:
              _context8.next = 28;
              return fetch(presignedUrl, {
                method: "PUT",
                body: partData
              });
            case 28:
              response = _context8.sent;
              if (response.ok) {
                _context8.next = 35;
                break;
              }
              _context8.t4 = Error;
              _context8.next = 33;
              return response.text();
            case 33:
              _context8.t5 = _context8.sent;
              throw new _context8.t4(_context8.t5);
            case 35:
              eTag = response.headers.get("ETag");
              if (eTag) {
                _context8.next = 38;
                break;
              }
              throw new Error("Etag header not present in AWS response.");
            case 38:
              return _context8.abrupt("return", eTag);
            case 41:
              _context8.prev = 41;
              _context8.t6 = _context8["catch"](0);
              throw new Error("Upload part failed: ".concat(_context8.t6.message || _context8.t6.toString()));
            case 44:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 41]]);
      }));
      return function (_x19, _x20, _x21, _x22, _x23, _x24) {
        return _ref8.apply(this, arguments);
      };
    }());
    this.apiKey = apiKey;
    this.serverUrl = serverUrl;
    this.aesKey = null;
    this.originType = originType;
    this.connectionId = null;
    this.maxZipSize = 15 * 1024 * 1024; // 15MB max zip file size

    // Wrapped methods with retry (3 times, every 1000ms)
    _classPrivateFieldSet(_newMultipartUpload, this, _assertClassBrand(_Neuropacs_brand, this, _withRetry).call(this, _classPrivateFieldGet(_newMultipartUpload, this).bind(this), 3, 1000));
    _classPrivateFieldSet(_completeMultipartUpload, this, _assertClassBrand(_Neuropacs_brand, this, _withRetry).call(this, _classPrivateFieldGet(_completeMultipartUpload, this).bind(this), 3, 1000));
    _classPrivateFieldSet(_uploadPart, this, _assertClassBrand(_Neuropacs_brand, this, _withRetry).call(this, _classPrivateFieldGet(_uploadPart, this).bind(this), 3, 1000));
  }

  /**
   * Init method
   * @param {String} serverUrl URL of server
   * @param {String} apiKey API key
   * @param {String} originType originType (default = 'api')
    * @returns {Neuropacs} instance
   */
  return _createClass(Neuropacs, [{
    key: "connect",
    value: (
    /**
     * Public methods
     */
    /**
     * Create a connection with the server
      * @returns {String} Base64 string encrypted AES key
     */
    function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var headers, aesKey, body, encryptedBody, response, json, connectionId;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              headers = {
                "Content-Type": "text/plain",
                "Origin-Type": this.originType,
                "X-Api-Key": this.apiKey
              };
              aesKey = _classPrivateFieldGet(_generateAesKey, this).call(this);
              this.aesKey = aesKey;
              body = {
                aes_key: aesKey
              };
              _context9.next = 7;
              return _classPrivateFieldGet(_oaepEncrypt, this).call(this, body);
            case 7:
              encryptedBody = _context9.sent;
              _context9.next = 10;
              return fetch("".concat(this.serverUrl, "/api/connect/"), {
                method: "POST",
                headers: headers,
                body: encryptedBody
              });
            case 10:
              response = _context9.sent;
              if (response.ok) {
                _context9.next = 19;
                break;
              }
              _context9.t0 = Error;
              _context9.t1 = JSON;
              _context9.next = 16;
              return response.text();
            case 16:
              _context9.t2 = _context9.sent;
              _context9.t3 = _context9.t1.parse.call(_context9.t1, _context9.t2).error;
              throw new _context9.t0(_context9.t3);
            case 19:
              _context9.next = 21;
              return response.json();
            case 21:
              json = _context9.sent;
              connectionId = json.connectionId;
              this.connectionId = connectionId;
              return _context9.abrupt("return", {
                timestamp: _classPrivateFieldGet(_getTimeDateString, this).call(this),
                connectionId: connectionId,
                aesKey: this.aesKey
              });
            case 27:
              _context9.prev = 27;
              _context9.t4 = _context9["catch"](0);
              throw new Error("Connection creation failed: ".concat(_context9.t4.message || _context9.t4.toString()));
            case 30:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 27]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
    /**
     * Create a new order
      * @returns {String} Base64 string orderId.
     */
    )
  }, {
    key: "newJob",
    value: (function () {
      var _newJob = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var url, headers, response, text, decryptedJson;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              if (!(!this.connectionId || !this.aesKey)) {
                _context10.next = 3;
                break;
              }
              throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");
            case 3:
              url = "".concat(this.serverUrl, "/api/newJob/");
              headers = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              };
              _context10.next = 7;
              return fetch(url, {
                method: "GET",
                headers: headers
              });
            case 7:
              response = _context10.sent;
              if (response.ok) {
                _context10.next = 16;
                break;
              }
              _context10.t0 = Error;
              _context10.t1 = JSON;
              _context10.next = 13;
              return response.text();
            case 13:
              _context10.t2 = _context10.sent;
              _context10.t3 = _context10.t1.parse.call(_context10.t1, _context10.t2).error;
              throw new _context10.t0(_context10.t3);
            case 16:
              _context10.next = 18;
              return response.text();
            case 18:
              text = _context10.sent;
              _context10.next = 21;
              return _classPrivateFieldGet(_decryptAesCtr, this).call(this, text, this.aesKey, "JSON");
            case 21:
              decryptedJson = _context10.sent;
              this.orderId = decryptedJson.orderId;
              return _context10.abrupt("return", decryptedJson.orderId);
            case 26:
              _context10.prev = 26;
              _context10.t4 = _context10["catch"](0);
              throw new Error("Job creation failed: ".concat(_context10.t4.message || _context10.t4.toString()));
            case 29:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[0, 26]]);
      }));
      function newJob() {
        return _newJob.apply(this, arguments);
      }
      return newJob;
    }()
    /**
     * Upload a dataset from a file object array
     * @param {String} orderId Unique base64 identifier for the order.
     * @param {FileList} fileArray Array containing File objects
     * @param {Function} [callback] Callback function invoked with upload progress.
     * @returns {Promise<Object>} A promise that resolves to the response of the upload operation.
     */
    )
  }, {
    key: "uploadDatasetFromFileArray",
    value: (function () {
      var _uploadDatasetFromFileArray = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(_ref9) {
        var orderId, fileArray, _ref9$callback, callback, filenamesSet, filesUploaded, partIndex, jsZip, currentZipSize, f, curFile, curFilename, curFileSize, uniqueFilename, zipBytes, zipIndex, uploadId, ETag, progress, _zipBytes, _zipIndex, _uploadId, _ETag;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              orderId = _ref9.orderId, fileArray = _ref9.fileArray, _ref9$callback = _ref9.callback, callback = _ref9$callback === void 0 ? null : _ref9$callback;
              _context11.prev = 1;
              if (!(!fileArray || !orderId)) {
                _context11.next = 4;
                break;
              }
              throw new Error("Parameter is missing");
            case 4:
              if (!(!this.connectionId || !this.aesKey)) {
                _context11.next = 6;
                break;
              }
              throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");
            case 6:
              if (!(!(fileArray instanceof FileList) && !(Array.isArray(fileArray) && fileArray.every(function (file) {
                return file instanceof File;
              })))) {
                _context11.next = 8;
                break;
              }
              throw new Error("Dataset must be an array of files or a FileList");
            case 8:
              _context11.next = 10;
              return _classPrivateFieldGet(_loadScript, this).call(this, "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
            case 10:
              filenamesSet = new Set(); // Set to hold filenames (to detect duplicates)
              filesUploaded = 0; // Counts number of files uploaded
              partIndex = 1; // Counts index of zip file
              jsZip = new JSZip(); // New JSZip instance
              currentZipSize = 0; // Keep track of current zip size
              f = 0;
            case 16:
              if (!(f < fileArray.length)) {
                _context11.next = 44;
                break;
              }
              // Get name of the current file
              curFile = fileArray[f];
              curFilename = curFile.name;
              curFileSize = curFile.size; // Ensure a unique filename
              uniqueFilename = _classPrivateFieldGet(_ensureUniqueName, this).call(this, filenamesSet, curFilename); // If adding the current file would exceed max zip size, generate and upload the zip
              if (!(currentZipSize + curFileSize > this.maxZipSize && currentZipSize > 0)) {
                _context11.next = 37;
                break;
              }
              _context11.next = 24;
              return jsZip.generateAsync({
                type: "blob"
                // compression: "STORE"
              });
            case 24:
              zipBytes = _context11.sent;
              // Start a new multipart upload
              zipIndex = partIndex;
              _context11.next = 28;
              return _classPrivateFieldGet(_newMultipartUpload, this).call(this, orderId, String(zipIndex), orderId);
            case 28:
              uploadId = _context11.sent;
              _context11.next = 31;
              return _classPrivateFieldGet(_uploadPart, this).call(this, uploadId, orderId, String(zipIndex), orderId, 1,
              // PartNumber is usually 1 for single-part uploads
              zipBytes);
            case 31:
              ETag = _context11.sent;
              _context11.next = 34;
              return _classPrivateFieldGet(_completeMultipartUpload, this).call(this, orderId, orderId, String(zipIndex), uploadId, [{
                PartNumber: 1,
                ETag: ETag
              }]);
            case 34:
              // Reset jsZip and currentZipSize
              jsZip = new JSZip();
              currentZipSize = 0;
              partIndex++; // Increment partIndex for the next zip file
            case 37:
              // Add file to zip
              jsZip.file(uniqueFilename, curFile, {
                // compression: "STORE",
                binary: true
              });

              // Increment currentZipSize
              currentZipSize += curFileSize;

              // Increment filesUploaded
              filesUploaded++;

              // Call progress callback
              if (callback) {
                progress = parseFloat((filesUploaded / fileArray.length * 100).toFixed(2));
                callback({
                  orderId: orderId,
                  progress: progress,
                  status: "Uploading file ".concat(filesUploaded, "/").concat(fileArray.length)
                });
              }
            case 41:
              f++;
              _context11.next = 16;
              break;
            case 44:
              if (!(currentZipSize > 0)) {
                _context11.next = 57;
                break;
              }
              _context11.next = 47;
              return jsZip.generateAsync({
                type: "blob",
                compression: "STORE"
              });
            case 47:
              _zipBytes = _context11.sent;
              // Start a new multipart upload
              _zipIndex = partIndex;
              _context11.next = 51;
              return _classPrivateFieldGet(_newMultipartUpload, this).call(this, orderId, String(_zipIndex), orderId);
            case 51:
              _uploadId = _context11.sent;
              _context11.next = 54;
              return _classPrivateFieldGet(_uploadPart, this).call(this, _uploadId, orderId, String(_zipIndex), orderId, 1,
              // PartNumber is usually 1 for single-part uploads
              _zipBytes);
            case 54:
              _ETag = _context11.sent;
              _context11.next = 57;
              return _classPrivateFieldGet(_completeMultipartUpload, this).call(this, orderId, orderId, String(_zipIndex), _uploadId, [{
                PartNumber: 1,
                ETag: _ETag
              }]);
            case 57:
              return _context11.abrupt("return", true);
            case 60:
              _context11.prev = 60;
              _context11.t0 = _context11["catch"](1);
              throw new Error("Error uploading study from file array: ".concat(_context11.t0.message || _context11.t0.toString()));
            case 63:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[1, 60]]);
      }));
      function uploadDatasetFromFileArray(_x25) {
        return _uploadDatasetFromFileArray.apply(this, arguments);
      }
      return uploadDatasetFromFileArray;
    }()
    /**
     * Upload a dataset via DICOMweb WADO-RS protocol.
     *
     * @param {string} orderId - Unique base64 identifier for the order.
     * @param {string} wadoUrl - URL to access DICOM images via the WADO-RS protocol (e.g. 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs').
     * @param {string} studyUid - Unique Study Instance UID of the study to be retrieved.
     * @param {string} [username] - Username for basic authentication (if required).
     * @param {string} [password] - Password for basic authentication (if required).
     * @param {function} [callback] - Callback function invoked with upload progress.
     * @returns {Promise<boolean>} - Boolean indicating upload status.
     */
    )
  }, {
    key: "uploadDatasetFromDicomWeb",
    value: (function () {
      var _uploadDatasetFromDicomWeb = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(_ref10) {
        var orderId, wadoUrl, studyUid, _ref10$username, username, _ref10$password, password, _ref10$callback, callback, dicomWebClient, instances, jsZip, totalInstances, partNumber, currentZipSize, i, instanceData, uniqueFilename, dataBytes, curFileSize, zipBytes, zipIndex, uploadId, eTag, progress, _zipBytes2, _zipIndex2, _uploadId2, _eTag;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              orderId = _ref10.orderId, wadoUrl = _ref10.wadoUrl, studyUid = _ref10.studyUid, _ref10$username = _ref10.username, username = _ref10$username === void 0 ? null : _ref10$username, _ref10$password = _ref10.password, password = _ref10$password === void 0 ? null : _ref10$password, _ref10$callback = _ref10.callback, callback = _ref10$callback === void 0 ? null : _ref10$callback;
              _context12.prev = 1;
              if (!(!orderId || !wadoUrl || !studyUid)) {
                _context12.next = 4;
                break;
              }
              throw new Error("Parameter is missing");
            case 4:
              if (!(!this.connectionId || !this.aesKey)) {
                _context12.next = 6;
                break;
              }
              throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");
            case 6:
              _context12.next = 8;
              return _classPrivateFieldGet(_loadScript, this).call(this, "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
            case 8:
              _context12.next = 10;
              return _classPrivateFieldGet(_loadScript, this).call(this, "https://unpkg.com/dicomweb-client");
            case 10:
              // Create a DICOMweb client
              if (username && password) {
                // w/ auth
                dicomWebClient = new DICOMwebClient.api.DICOMwebClient({
                  url: wadoUrl,
                  username: username,
                  password: password
                });
              } else {
                // w/out auth
                dicomWebClient = new DICOMwebClient.api.DICOMwebClient({
                  url: wadoUrl
                });
              }

              // Update callback
              if (callback) {
                callback({
                  order_id: orderId,
                  progress: 0,
                  status: "Retrieving instances from DICOMweb for study ".concat(studyUid)
                });
              }

              // Get the instances associated with the study
              _context12.next = 14;
              return dicomWebClient.retrieveStudy({
                studyInstanceUID: studyUid
              });
            case 14:
              instances = _context12.sent;
              if (!(!instances || instances.length === 0)) {
                _context12.next = 17;
                break;
              }
              throw new Error("No instances recieved from DICOMweb for study ".concat(studyUid));
            case 17:
              // Update callback
              if (callback) {
                callback({
                  order_id: orderId,
                  progress: 100,
                  status: "Retrieving instances from DICOMweb for study ".concat(studyUid)
                });
              }
              jsZip = new JSZip(); // New JSZip instance
              totalInstances = instances.length; // Total number of instances
              partNumber = 1; // Track current part number
              currentZipSize = 0; // Keep track of current zip size
              // Iterate through instances
              i = 0;
            case 23:
              if (!(i < instances.length)) {
                _context12.next = 50;
                break;
              }
              instanceData = instances[i]; // Generate a filename
              uniqueFilename = _classPrivateFieldGet(_generateUniqueUUID, this).call(this); // instanceData is already an ArrayBuffer!
              dataBytes = instanceData; // Get length of the current file
              curFileSize = instanceData.byteLength; // If adding the current file would exceed max zip size, generate and upload the zip
              if (!(currentZipSize + curFileSize > this.maxZipSize && currentZipSize > 0)) {
                _context12.next = 44;
                break;
              }
              _context12.next = 31;
              return jsZip.generateAsync({
                type: "blob"
              });
            case 31:
              zipBytes = _context12.sent;
              // Get zip index
              zipIndex = partNumber - 1; // Get upload_id for multipart upload
              _context12.next = 35;
              return _classPrivateFieldGet(_newMultipartUpload, this).call(this, orderId, String(zipIndex), orderId);
            case 35:
              uploadId = _context12.sent;
              _context12.next = 38;
              return _classPrivateFieldGet(_uploadPart, this).call(this, uploadId, orderId, String(zipIndex), orderId, partNumber, zipBytes);
            case 38:
              eTag = _context12.sent;
              _context12.next = 41;
              return _classPrivateFieldGet(_completeMultipartUpload, this).call(this, orderId, orderId, String(zipIndex), uploadId, [{
                PartNumber: partNumber,
                ETag: eTag
              }]);
            case 41:
              // Reset zip and currentZipSize
              jsZip = new JSZip();
              currentZipSize = 0;
              partNumber++; // Increment part number for next zip file
            case 44:
              // Add the current instance to the zip
              jsZip.file(uniqueFilename, dataBytes, {
                binary: true
              });

              // Increment currentZipSize
              currentZipSize += curFileSize;

              // Update callback
              if (callback) {
                progress = (i + 1) / totalInstances * 100;
                progress = Math.round(progress * 100) / 100; // Round to two decimal places
                progress = progress === 100 ? 100 : progress;
                callback({
                  order_id: orderId,
                  progress: progress,
                  status: "Uploaded instance ".concat(i + 1, "/").concat(instances.length)
                });
              }
            case 47:
              i++;
              _context12.next = 23;
              break;
            case 50:
              if (!(currentZipSize > 0)) {
                _context12.next = 63;
                break;
              }
              _context12.next = 53;
              return jsZip.generateAsync({
                type: "blob"
              });
            case 53:
              _zipBytes2 = _context12.sent;
              // Get zip index
              _zipIndex2 = partNumber - 1; // Get upload_id for multipart upload
              _context12.next = 57;
              return _classPrivateFieldGet(_newMultipartUpload, this).call(this, orderId, String(_zipIndex2), orderId);
            case 57:
              _uploadId2 = _context12.sent;
              _context12.next = 60;
              return _classPrivateFieldGet(_uploadPart, this).call(this, _uploadId2, orderId, String(_zipIndex2), orderId, partNumber, _zipBytes2);
            case 60:
              _eTag = _context12.sent;
              _context12.next = 63;
              return _classPrivateFieldGet(_completeMultipartUpload, this).call(this, orderId, orderId, String(_zipIndex2), _uploadId2, [{
                PartNumber: partNumber,
                ETag: _eTag
              }]);
            case 63:
              return _context12.abrupt("return", true);
            case 66:
              _context12.prev = 66;
              _context12.t0 = _context12["catch"](1);
              throw new Error("Error uploading study from DICOMweb: ".concat(_context12.t0.message || _context12.t0.toString()));
            case 69:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[1, 66]]);
      }));
      function uploadDatasetFromDicomWeb(_x26) {
        return _uploadDatasetFromDicomWeb.apply(this, arguments);
      }
      return uploadDatasetFromDicomWeb;
    }()
    /**
     * Run a job for a specified order with a specified product
     * @param {String} orderId Unique base64 identifier for the order.
     * @param {String} productName Product to be executed
     * @returns {Number} Job run status code
     */
    )
  }, {
    key: "runJob",
    value: (function () {
      var _runJob = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(_ref11) {
        var orderId, productName, url, headers, body, encryptedBody, response;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              orderId = _ref11.orderId, productName = _ref11.productName;
              _context13.prev = 1;
              if (!(!orderId || !productName)) {
                _context13.next = 4;
                break;
              }
              throw new Error("Parameter is missing");
            case 4:
              if (!(!this.connectionId || !this.aesKey)) {
                _context13.next = 6;
                break;
              }
              throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");
            case 6:
              url = "".concat(this.serverUrl, "/api/runJob/");
              headers = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              };
              body = {
                orderId: orderId,
                productName: productName
              };
              _context13.next = 11;
              return _classPrivateFieldGet(_encryptAesCtr, this).call(this, body, this.aesKey, "JSON", "string");
            case 11:
              encryptedBody = _context13.sent;
              _context13.next = 14;
              return fetch(url, {
                method: "POST",
                headers: headers,
                body: encryptedBody
              });
            case 14:
              response = _context13.sent;
              if (response.ok) {
                _context13.next = 23;
                break;
              }
              _context13.t0 = Error;
              _context13.t1 = JSON;
              _context13.next = 20;
              return response.text();
            case 20:
              _context13.t2 = _context13.sent;
              _context13.t3 = _context13.t1.parse.call(_context13.t1, _context13.t2).error;
              throw new _context13.t0(_context13.t3);
            case 23:
              return _context13.abrupt("return", response.status);
            case 26:
              _context13.prev = 26;
              _context13.t4 = _context13["catch"](1);
              throw new Error("Job run failed: ".concat(_context13.t4.message || _context13.t4.toString()));
            case 29:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this, [[1, 26]]);
      }));
      function runJob(_x27) {
        return _runJob.apply(this, arguments);
      }
      return runJob;
    }()
    /**
     * Check job status for a specified order
     * @param {String} orderId Unique base64 identifier for the order.
    
     * @returns {Number} Job status message
     */
    )
  }, {
    key: "checkStatus",
    value: (function () {
      var _checkStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(_ref12) {
        var orderId, url, headers, body, encryptedBody, response, text, json;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              orderId = _ref12.orderId;
              _context14.prev = 1;
              if (orderId) {
                _context14.next = 4;
                break;
              }
              throw new Error("Parameter is missing");
            case 4:
              if (!(!this.connectionId || !this.aesKey)) {
                _context14.next = 6;
                break;
              }
              throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");
            case 6:
              url = "".concat(this.serverUrl, "/api/checkStatus/");
              headers = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              };
              body = {
                orderId: orderId
              };
              _context14.next = 11;
              return _classPrivateFieldGet(_encryptAesCtr, this).call(this, body, this.aesKey, "JSON", "string");
            case 11:
              encryptedBody = _context14.sent;
              _context14.next = 14;
              return fetch(url, {
                method: "POST",
                headers: headers,
                body: encryptedBody
              });
            case 14:
              response = _context14.sent;
              if (response.ok) {
                _context14.next = 23;
                break;
              }
              _context14.t0 = Error;
              _context14.t1 = JSON;
              _context14.next = 20;
              return response.text();
            case 20:
              _context14.t2 = _context14.sent;
              _context14.t3 = _context14.t1.parse.call(_context14.t1, _context14.t2).error;
              throw new _context14.t0(_context14.t3);
            case 23:
              _context14.next = 25;
              return response.text();
            case 25:
              text = _context14.sent;
              _context14.next = 28;
              return _classPrivateFieldGet(_decryptAesCtr, this).call(this, text, this.aesKey, "JSON");
            case 28:
              json = _context14.sent;
              return _context14.abrupt("return", json);
            case 32:
              _context14.prev = 32;
              _context14.t4 = _context14["catch"](1);
              throw new Error("Status check failed: ".concat(_context14.t4.message || _context14.t4.toString()));
            case 35:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[1, 32]]);
      }));
      function checkStatus(_x28) {
        return _checkStatus.apply(this, arguments);
      }
      return checkStatus;
    }()
    /**
     * Get job results
     * @param {String} orderId Unique base64 identifier for the order.
     * @param {String} format Base64 AES key
     * @param {String} dataType Type of data to be returned (defaults to "raw")
     * @returns Result data in specified format
     */
    )
  }, {
    key: "getResults",
    value: (function () {
      var _getResults = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(_ref13) {
        var orderId, format, _ref13$dataType, dataType, url, headers, validFormats, body, encryptedBody, response, text, rawData;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              orderId = _ref13.orderId, format = _ref13.format, _ref13$dataType = _ref13.dataType, dataType = _ref13$dataType === void 0 ? "raw" : _ref13$dataType;
              _context15.prev = 1;
              if (!(!orderId || !format || !dataType)) {
                _context15.next = 4;
                break;
              }
              throw new Error("Parameter is missing");
            case 4:
              if (!(!this.connectionId || !this.aesKey)) {
                _context15.next = 6;
                break;
              }
              throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");
            case 6:
              url = "".concat(this.serverUrl, "/api/getResults/");
              headers = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              }; // Make format and dataType case insensative
              format = String(format).toLowerCase();
              dataType = String(dataType).toLowerCase();
              validFormats = ["txt", "xml", "json", "png"]; // Check for invalid format
              if (validFormats.includes(format)) {
                _context15.next = 13;
                break;
              }
              throw new Error("Invalid format");
            case 13:
              body = {
                orderId: orderId,
                format: format
              };
              _context15.next = 16;
              return _classPrivateFieldGet(_encryptAesCtr, this).call(this, body, this.aesKey, "JSON", "string");
            case 16:
              encryptedBody = _context15.sent;
              _context15.next = 19;
              return fetch(url, {
                method: "POST",
                headers: headers,
                body: encryptedBody
              });
            case 19:
              response = _context15.sent;
              if (response.ok) {
                _context15.next = 28;
                break;
              }
              _context15.t0 = Error;
              _context15.t1 = JSON;
              _context15.next = 25;
              return response.text();
            case 25:
              _context15.t2 = _context15.sent;
              _context15.t3 = _context15.t1.parse.call(_context15.t1, _context15.t2).error;
              throw new _context15.t0(_context15.t3);
            case 28:
              _context15.next = 30;
              return response.text();
            case 30:
              text = _context15.sent;
              _context15.t4 = format;
              _context15.next = _context15.t4 === "txt" ? 34 : _context15.t4 === "json" ? 34 : _context15.t4 === "xml" ? 34 : _context15.t4 === "png" ? 38 : 42;
              break;
            case 34:
              _context15.next = 36;
              return _classPrivateFieldGet(_decryptAesCtr, this).call(this, text, this.aesKey, "string");
            case 36:
              rawData = _context15.sent;
              return _context15.abrupt("break", 42);
            case 38:
              _context15.next = 40;
              return _classPrivateFieldGet(_decryptAesCtr, this).call(this, text, this.aesKey, "Uint8Array");
            case 40:
              rawData = _context15.sent;
              return _context15.abrupt("break", 42);
            case 42:
              if (!(dataType === "raw")) {
                _context15.next = 46;
                break;
              }
              return _context15.abrupt("return", rawData);
            case 46:
              if (!(dataType === "blob")) {
                _context15.next = 56;
                break;
              }
              _context15.t5 = format;
              _context15.next = _context15.t5 === "txt" ? 50 : _context15.t5 === "json" ? 51 : _context15.t5 === "xml" ? 52 : _context15.t5 === "png" ? 53 : 54;
              break;
            case 50:
              return _context15.abrupt("return", new Blob([rawData], {
                type: "text/plain"
              }));
            case 51:
              return _context15.abrupt("return", new Blob([rawData], {
                type: "application/json"
              }));
            case 52:
              return _context15.abrupt("return", new Blob([rawData], {
                type: "application/xml"
              }));
            case 53:
              return _context15.abrupt("return", new Blob([rawData], {
                type: "image/png"
              }));
            case 54:
              _context15.next = 57;
              break;
            case 56:
              throw new Error("Invalid data type.");
            case 57:
              _context15.next = 62;
              break;
            case 59:
              _context15.prev = 59;
              _context15.t6 = _context15["catch"](1);
              throw new Error("Result retrieval failed: ".concat(_context15.t6.message || _context15.t6.toString()));
            case 62:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this, [[1, 59]]);
      }));
      function getResults(_x29) {
        return _getResults.apply(this, arguments);
      }
      return getResults;
    }())
  }], [{
    key: "init",
    value: function init(_ref14) {
      var serverUrl = _ref14.serverUrl,
        apiKey = _ref14.apiKey,
        _ref14$originType = _ref14.originType,
        originType = _ref14$originType === void 0 ? "api" : _ref14$originType;
      return new Neuropacs(serverUrl, apiKey, originType);
    }
  }]);
}();
function _withRetry(fn) {
  var maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  return /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    var attempt,
      lastError,
      _args16 = arguments;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          attempt = 0;
        case 1:
          if (!(attempt < maxRetries)) {
            _context16.next = 17;
            break;
          }
          _context16.prev = 2;
          _context16.next = 5;
          return fn.apply(void 0, _args16);
        case 5:
          return _context16.abrupt("return", _context16.sent);
        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](2);
          lastError = _context16.t0;
          attempt++;
          if (!(attempt < maxRetries)) {
            _context16.next = 15;
            break;
          }
          _context16.next = 15;
          return new Promise(function (resolve) {
            return setTimeout(resolve, delay);
          });
        case 15:
          _context16.next = 1;
          break;
        case 17:
          throw lastError;
        case 18:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[2, 8]]);
  }));
}
var _default = exports["default"] = Neuropacs;