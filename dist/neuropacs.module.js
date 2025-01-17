"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var _i = /*#__PURE__*/new WeakMap();
var _n = /*#__PURE__*/new WeakMap();
var _s = /*#__PURE__*/new WeakMap();
var _o = /*#__PURE__*/new WeakMap();
var _c = /*#__PURE__*/new WeakMap();
var _p = /*#__PURE__*/new WeakMap();
var _h = /*#__PURE__*/new WeakMap();
var _w = /*#__PURE__*/new WeakMap();
var _d = /*#__PURE__*/new WeakMap();
var _l = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
var _g = /*#__PURE__*/new WeakMap();
var _Neuropacs_brand = /*#__PURE__*/new WeakSet();
var _t = /*#__PURE__*/new WeakMap();
var _r = /*#__PURE__*/new WeakMap();
var _a = /*#__PURE__*/new WeakMap();
//prettier-ignore
/*!
 * neuropacs JavaScript API v1.1.9
 * (c) 2024 neuropacs
 * Released under the MIT License.
 */
var Neuropacs = /*#__PURE__*/function () {
  function Neuropacs(_t2, _e2) {
    var _this = this;
    var _r2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "API";
    _classCallCheck(this, Neuropacs);
    _classPrivateMethodInitSpec(this, _Neuropacs_brand);
    _classPrivateFieldInitSpec(this, _i, function () {
      try {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
          var e = 16 * Math.random() | 0;
          return ("x" == t ? e : 3 & e | 8).toString(16);
        });
      } catch (t) {
        throw new Error("UUID generation failed: ".concat(t.message || t.toString()));
      }
    });
    _classPrivateFieldInitSpec(this, _n, function (t) {
      return new Promise(function (e, r) {
        var a = document.createElement("script");
        a.src = t, a.async = !0, a.onload = function () {
          e();
        }, a.onerror = function () {
          r(new Error("Script failed to load."));
        }, document.head.appendChild(a);
      });
    });
    _classPrivateFieldInitSpec(this, _s, function () {
      try {
        var t = new Uint8Array(16);
        window.crypto.getRandomValues(t);
        return btoa(String.fromCharCode.apply(null, t));
      } catch (t) {
        throw new Error("AES key generation failed: ".concat(t.message || t.toString()));
      }
    });
    _classPrivateFieldInitSpec(this, _o, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(t) {
        var e, r, a, i, n, s, o, c;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              t = "string" == typeof t ? t : JSON.stringify(t);
              _context.next = 7;
              break;
            case 4:
              _context.prev = 4;
              _context.t0 = _context["catch"](0);
              throw new RangeError("Plaintext must be a string or JSON.");
            case 7:
              _context.prev = 7;
              _context.next = 10;
              return _classPrivateFieldGet(_c, _this).call(_this);
            case 10:
              e = _context.sent;
              r = "-----BEGIN PUBLIC KEY-----";
              a = "-----END PUBLIC KEY-----";
              i = e.substring(r.length, e.length - a.length - 1);
              n = window.atob(i);
              s = _classPrivateFieldGet(_p, _this).call(_this, n);
              _context.next = 18;
              return crypto.subtle.importKey("spki", s, {
                name: "RSA-OAEP",
                hash: "SHA-256"
              }, !0, ["encrypt"]);
            case 18:
              o = _context.sent;
              _context.next = 21;
              return crypto.subtle.encrypt({
                name: "RSA-OAEP"
              }, o, new TextEncoder().encode(t));
            case 21:
              c = _context.sent;
              return _context.abrupt("return", _classPrivateFieldGet(_h, _this).call(_this, c));
            case 25:
              _context.prev = 25;
              _context.t1 = _context["catch"](7);
              throw new Error("OAEP encryption failed: ".concat(_context.t1.message || _context.t1.toString()));
            case 28:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 4], [7, 25]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    _classPrivateFieldInitSpec(this, _c, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var t, _e3, r;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            t = {
              "Origin-Type": _this.originType
            };
            _context2.prev = 1;
            _context2.next = 4;
            return fetch("".concat(_this.serverUrl, "/api/getPubKey/"), {
              method: "GET",
              headers: t
            });
          case 4:
            _e3 = _context2.sent;
            if (_e3.ok) {
              _context2.next = 15;
              break;
            }
            if (!(403 == _e3.status)) {
              _context2.next = 8;
              break;
            }
            throw new Error("CORS error.");
          case 8:
            _context2.t0 = Error;
            _context2.t1 = JSON;
            _context2.next = 12;
            return _e3.text();
          case 12:
            _context2.t2 = _context2.sent;
            _context2.t3 = _context2.t1.parse.call(_context2.t1, _context2.t2).error;
            throw new _context2.t0(_context2.t3);
          case 15:
            _context2.next = 17;
            return _e3.json();
          case 17:
            r = _context2.sent;
            return _context2.abrupt("return", r.pub_key);
          case 21:
            _context2.prev = 21;
            _context2.t4 = _context2["catch"](1);
            throw new Error("Retrieval of public key failed: ".concat(_context2.t4.message || _context2.t4.toString()));
          case 24:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 21]]);
    })));
    _classPrivateFieldInitSpec(this, _p, function (t) {
      try {
        var _e4 = new ArrayBuffer(t.length),
          r = new Uint8Array(_e4);
        for (var _e5 = 0, a = t.length; _e5 < a; _e5++) r[_e5] = t.charCodeAt(_e5);
        return _e4;
      } catch (t) {
        throw new Error("String to array buffer conversion failed: ".concat(t.message || t.toString()));
      }
    });
    _classPrivateFieldInitSpec(this, _h, function (t) {
      try {
        var _e6 = new Uint8Array(t);
        return btoa(String.fromCharCode.apply(null, _e6));
      } catch (t) {
        throw new Error("Array buffer to base64 conversion failed: ".concat(t.message || t.toString()));
      }
    });
    _classPrivateFieldInitSpec(this, _w, function () {
      var t = new Date();
      return "".concat(t.getUTCFullYear(), "-").concat(String(t.getUTCMonth() + 1).padStart(2, "0"), "-").concat(String(t.getUTCDate()).padStart(2, "0"), " ").concat(String(t.getUTCHours()).padStart(2, "0"), ":").concat(String(t.getUTCMinutes()).padStart(2, "0"), ":").concat(String(t.getUTCSeconds()).padStart(2, "0"), " UTC");
    });
    _classPrivateFieldInitSpec(this, _d, /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(t, e) {
        var r, a;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              r = e - t.length % e, a = new Uint8Array(t.length + r);
              return _context3.abrupt("return", (a.set(t), a));
            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              throw new Error("AES padding failed : ".concat(_context3.t0.message || _context3.t0.toString()));
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 5]]);
      }));
      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    _classPrivateFieldInitSpec(this, _l, /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(t, e, r, a) {
        var i, _e7, _t3, _r3, n, s, o, c;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!("string" == r && "string" == typeof t)) {
                _context4.next = 4;
                break;
              }
              i = new TextEncoder().encode(t);
              _context4.next = 12;
              break;
            case 4:
              if (!("JSON" == r)) {
                _context4.next = 9;
                break;
              }
              _e7 = JSON.stringify(t);
              i = new TextEncoder().encode(_e7);
              _context4.next = 12;
              break;
            case 9:
              if ("Uint8Array" == r && t instanceof Uint8Array) {
                _context4.next = 11;
                break;
              }
              throw new Error("Invalid plaintext format!");
            case 11:
              i = t;
            case 12:
              _context4.prev = 12;
              _t3 = new Uint8Array(atob(e).split("").map(function (t) {
                return t.charCodeAt(0);
              }));
              _context4.next = 16;
              return _classPrivateFieldGet(_d, _this).call(_this, i, 16);
            case 16:
              _r3 = _context4.sent;
              n = crypto.getRandomValues(new Uint8Array(16));
              _context4.next = 20;
              return crypto.subtle.importKey("raw", _t3, {
                name: "AES-CTR"
              }, !1, ["encrypt"]);
            case 20:
              s = _context4.sent;
              _context4.next = 23;
              return crypto.subtle.encrypt({
                name: "AES-CTR",
                counter: n,
                length: 128
              }, s, _r3);
            case 23:
              o = _context4.sent;
              c = new Uint8Array(n.length + o.byteLength);
              if (!(c.set(n), c.set(new Uint8Array(o), n.length), "string" === a)) {
                _context4.next = 27;
                break;
              }
              return _context4.abrupt("return", btoa(String.fromCharCode.apply(null, c)));
            case 27:
              if (!("bytes" === a)) {
                _context4.next = 29;
                break;
              }
              return _context4.abrupt("return", c);
            case 29:
              throw new Error("Invalid output format");
            case 32:
              _context4.prev = 32;
              _context4.t0 = _context4["catch"](12);
              throw new Error("AES encrption failed: ".concat(_context4.t0.message || _context4.t0.toString()));
            case 35:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[12, 32]]);
      }));
      return function (_x4, _x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }());
    _classPrivateFieldInitSpec(this, _y, function (t, e) {
      var r = !1;
      e.includes(".") && (r = !0);
      var a = r ? e.replace(/\.[^/.]+$/, "") : e,
        i = r ? e.split(".").pop() : "";
      var n = 1,
        s = e;
      for (; t.has(s);) s = r ? "".concat(a, "_").concat(n, ".").concat(i) : "".concat(a, "_").concat(n), n++;
      return t.add(s), s;
    });
    _classPrivateFieldInitSpec(this, _g, /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(t, e, r) {
        var a, i, n, s, o, c, p;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              a = new Uint8Array(atob(e).split("").map(function (t) {
                return t.charCodeAt(0);
              }));
              i = new Uint8Array(atob(t).split("").map(function (t) {
                return t.charCodeAt(0);
              }));
              n = i.slice(0, 16);
              s = i.slice(16);
              _context5.next = 7;
              return crypto.subtle.importKey("raw", a, {
                name: "AES-CTR"
              }, !1, ["decrypt"]);
            case 7:
              o = _context5.sent;
              _context5.next = 10;
              return crypto.subtle.decrypt({
                name: "AES-CTR",
                counter: n,
                length: 128
              }, o, s);
            case 10:
              c = _context5.sent;
              p = new TextDecoder().decode(c);
              if (!("JSON" === r)) {
                _context5.next = 14;
                break;
              }
              return _context5.abrupt("return", (p = p.trim(), JSON.parse(p)));
            case 14:
              if (!("string" === r)) {
                _context5.next = 16;
                break;
              }
              return _context5.abrupt("return", p);
            case 16:
              if (!("Uint8Array" === r)) {
                _context5.next = 18;
                break;
              }
              return _context5.abrupt("return", c);
            case 18:
              throw new Error("Invalid output format");
            case 21:
              _context5.prev = 21;
              _context5.t0 = _context5["catch"](0);
              throw new Error("AES decryption failed: ".concat(_context5.t0.message || _context5.t0.toString()));
            case 24:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 21]]);
      }));
      return function (_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }());
    _classPrivateFieldInitSpec(this, _t, /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(t, e, r) {
        var a, i, n, s, o, c;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              a = "".concat(_this.serverUrl, "/api/multipartUploadRequest/");
              i = {
                datasetId: t,
                zipIndex: e,
                orderId: r
              };
              _context6.next = 5;
              return _classPrivateFieldGet(_l, _this).call(_this, i, _this.aesKey, "JSON", "string");
            case 5:
              n = _context6.sent;
              s = {
                "Content-Type": "text/plain",
                "Connection-Id": _this.connectionId,
                "Origin-Type": _this.originType
              };
              _context6.next = 9;
              return fetch(a, {
                method: "POST",
                body: n,
                headers: s
              });
            case 9:
              o = _context6.sent;
              if (o.ok) {
                _context6.next = 18;
                break;
              }
              _context6.t0 = Error;
              _context6.t1 = JSON;
              _context6.next = 15;
              return o.text();
            case 15:
              _context6.t2 = _context6.sent;
              _context6.t3 = _context6.t1.parse.call(_context6.t1, _context6.t2).error;
              throw new _context6.t0(_context6.t3);
            case 18:
              _context6.next = 20;
              return o.text();
            case 20:
              c = _context6.sent;
              _context6.next = 23;
              return _classPrivateFieldGet(_g, _this).call(_this, c, _this.aesKey, "JSON");
            case 23:
              return _context6.abrupt("return", _context6.sent.uploadId);
            case 26:
              _context6.prev = 26;
              _context6.t4 = _context6["catch"](0);
              throw new Error("Multipart upload initialization failed: ".concat(_context6.t4.message || _context6.t4.toString()));
            case 29:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 26]]);
      }));
      return function (_x11, _x12, _x13) {
        return _ref6.apply(this, arguments);
      };
    }());
    _classPrivateFieldInitSpec(this, _r, /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(t, e, r, a, i) {
        var n, s, o, c, p;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              n = "".concat(_this.serverUrl, "/api/completeMultipartUpload/");
              s = {
                "Content-Type": "text/plain",
                "Connection-Id": _this.connectionId,
                "Origin-Type": _this.originType
              };
              o = {
                datasetId: e,
                uploadId: a,
                uploadParts: i,
                zipIndex: r,
                orderId: t
              };
              _context7.next = 6;
              return _classPrivateFieldGet(_l, _this).call(_this, o, _this.aesKey, "JSON", "string");
            case 6:
              c = _context7.sent;
              _context7.next = 9;
              return fetch(n, {
                method: "POST",
                headers: s,
                body: c
              });
            case 9:
              p = _context7.sent;
              if (p.ok) {
                _context7.next = 18;
                break;
              }
              _context7.t0 = Error;
              _context7.t1 = JSON;
              _context7.next = 15;
              return p.text();
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
    _classPrivateFieldInitSpec(this, _a, /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(t, e, r, a, i, n) {
        var s, o, c, p, h, w, d;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              o = {
                "Content-Type": "text/plain",
                "Connection-Id": _this.connectionId,
                "Origin-Type": _this.originType
              };
              c = {
                datasetId: e,
                uploadId: t,
                partNumber: i,
                zipIndex: r,
                orderId: a
              };
              _context8.next = 5;
              return _classPrivateFieldGet(_l, _this).call(_this, c, _this.aesKey, "JSON", "string");
            case 5:
              p = _context8.sent;
              _context8.next = 8;
              return fetch("".concat(_this.serverUrl, "/api/multipartPresignedUrl/"), {
                method: "POST",
                headers: o,
                body: p
              });
            case 8:
              s = _context8.sent;
              if (s.ok) {
                _context8.next = 17;
                break;
              }
              _context8.t0 = Error;
              _context8.t1 = JSON;
              _context8.next = 14;
              return s.text();
            case 14:
              _context8.t2 = _context8.sent;
              _context8.t3 = _context8.t1.parse.call(_context8.t1, _context8.t2).error;
              throw new _context8.t0(_context8.t3);
            case 17:
              _context8.next = 19;
              return s.text();
            case 19:
              h = _context8.sent;
              _context8.next = 22;
              return _classPrivateFieldGet(_g, _this).call(_this, h, _this.aesKey, "JSON");
            case 22:
              w = _context8.sent.presignedUrl;
              if (w) {
                _context8.next = 25;
                break;
              }
              throw new Error("Presigned URL not present in AWS response.");
            case 25:
              _context8.next = 27;
              return fetch(w, {
                method: "PUT",
                body: n
              });
            case 27:
              s = _context8.sent;
              if (s.ok) {
                _context8.next = 34;
                break;
              }
              _context8.t4 = Error;
              _context8.next = 32;
              return s.text();
            case 32:
              _context8.t5 = _context8.sent;
              throw new _context8.t4(_context8.t5);
            case 34:
              d = s.headers.get("ETag");
              if (d) {
                _context8.next = 37;
                break;
              }
              throw new Error("Etag header not present in AWS response.");
            case 37:
              return _context8.abrupt("return", d);
            case 40:
              _context8.prev = 40;
              _context8.t6 = _context8["catch"](0);
              throw new Error("Upload part failed: ".concat(_context8.t6.message || _context8.t6.toString()));
            case 43:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 40]]);
      }));
      return function (_x19, _x20, _x21, _x22, _x23, _x24) {
        return _ref8.apply(this, arguments);
      };
    }());
    this.apiKey = _e2, this.serverUrl = _t2, this.aesKey = null, this.originType = _r2, this.connectionId = null, this.maxZipSize = 15728640, _classPrivateFieldSet(_t, this, _assertClassBrand(_Neuropacs_brand, this, _e).call(this, _classPrivateFieldGet(_t, this).bind(this), 3, 1e3)), _classPrivateFieldSet(_r, this, _assertClassBrand(_Neuropacs_brand, this, _e).call(this, _classPrivateFieldGet(_r, this).bind(this), 3, 1e3)), _classPrivateFieldSet(_a, this, _assertClassBrand(_Neuropacs_brand, this, _e).call(this, _classPrivateFieldGet(_a, this).bind(this), 3, 1e3));
  }
  return _createClass(Neuropacs, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var t, _e8, r, a, i, n;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              t = {
                "Content-Type": "text/plain",
                "Origin-Type": this.originType,
                "X-Api-Key": this.apiKey
              }, _e8 = _classPrivateFieldGet(_s, this).call(this);
              this.aesKey = _e8;
              r = {
                aes_key: _e8
              };
              _context9.next = 6;
              return _classPrivateFieldGet(_o, this).call(this, r);
            case 6:
              a = _context9.sent;
              _context9.next = 9;
              return fetch("".concat(this.serverUrl, "/api/connect/"), {
                method: "POST",
                headers: t,
                body: a
              });
            case 9:
              i = _context9.sent;
              if (i.ok) {
                _context9.next = 18;
                break;
              }
              _context9.t0 = Error;
              _context9.t1 = JSON;
              _context9.next = 15;
              return i.text();
            case 15:
              _context9.t2 = _context9.sent;
              _context9.t3 = _context9.t1.parse.call(_context9.t1, _context9.t2).error;
              throw new _context9.t0(_context9.t3);
            case 18:
              _context9.next = 20;
              return i.json();
            case 20:
              n = _context9.sent.connectionId;
              return _context9.abrupt("return", (this.connectionId = n, {
                timestamp: _classPrivateFieldGet(_w, this).call(this),
                connectionId: n,
                aesKey: this.aesKey
              }));
            case 24:
              _context9.prev = 24;
              _context9.t4 = _context9["catch"](0);
              throw new Error("Connection creation failed: ".concat(_context9.t4.message || _context9.t4.toString()));
            case 27:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 24]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "newJob",
    value: function () {
      var _newJob = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var t, _e9, r, a, i;
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
              t = "".concat(this.serverUrl, "/api/newJob/");
              _e9 = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              };
              _context10.next = 7;
              return fetch(t, {
                method: "GET",
                headers: _e9
              });
            case 7:
              r = _context10.sent;
              if (r.ok) {
                _context10.next = 16;
                break;
              }
              _context10.t0 = Error;
              _context10.t1 = JSON;
              _context10.next = 13;
              return r.text();
            case 13:
              _context10.t2 = _context10.sent;
              _context10.t3 = _context10.t1.parse.call(_context10.t1, _context10.t2).error;
              throw new _context10.t0(_context10.t3);
            case 16:
              _context10.next = 18;
              return r.text();
            case 18:
              a = _context10.sent;
              _context10.next = 21;
              return _classPrivateFieldGet(_g, this).call(this, a, this.aesKey, "JSON");
            case 21:
              i = _context10.sent;
              return _context10.abrupt("return", (this.orderId = i.orderId, i.orderId));
            case 25:
              _context10.prev = 25;
              _context10.t4 = _context10["catch"](0);
              throw new Error("Job creation failed: ".concat(_context10.t4.message || _context10.t4.toString()));
            case 28:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[0, 25]]);
      }));
      function newJob() {
        return _newJob.apply(this, arguments);
      }
      return newJob;
    }()
  }, {
    key: "uploadDatasetFromFileArray",
    value: function () {
      var _uploadDatasetFromFileArray = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(_ref9) {
        var t, e, _ref9$callback, r, a, i, n, s, o, c, p, h, w, d, _e10, _r4, _a2, _i2, _e11, _r5, _a3, _i3;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              t = _ref9.orderId, e = _ref9.fileArray, _ref9$callback = _ref9.callback, r = _ref9$callback === void 0 ? null : _ref9$callback;
              _context11.prev = 1;
              if (!(!e || !t)) {
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
              if (e instanceof FileList || Array.isArray(e) && e.every(function (t) {
                return t instanceof File;
              })) {
                _context11.next = 8;
                break;
              }
              throw new Error("Dataset must be an array of files or a FileList");
            case 8:
              _context11.next = 10;
              return _classPrivateFieldGet(_n, this).call(this, "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
            case 10:
              a = new Set();
              i = 0, n = 1, s = new JSZip(), o = 0;
              c = 0;
            case 13:
              if (!(c < e.length)) {
                _context11.next = 35;
                break;
              }
              p = e[c], h = p.name, w = p.size, d = _classPrivateFieldGet(_y, this).call(this, a, h);
              if (!(o + w > this.maxZipSize && o > 0)) {
                _context11.next = 31;
                break;
              }
              _context11.next = 18;
              return s.generateAsync({
                type: "blob"
              });
            case 18:
              _e10 = _context11.sent;
              _r4 = n;
              _context11.next = 22;
              return _classPrivateFieldGet(_t, this).call(this, t, String(_r4), t);
            case 22:
              _a2 = _context11.sent;
              _context11.next = 25;
              return _classPrivateFieldGet(_a, this).call(this, _a2, t, String(_r4), t, 1, _e10);
            case 25:
              _i2 = _context11.sent;
              _context11.next = 28;
              return _classPrivateFieldGet(_r, this).call(this, t, t, String(_r4), _a2, [{
                PartNumber: 1,
                ETag: _i2
              }]);
            case 28:
              s = new JSZip();
              o = 0;
              n++;
            case 31:
              if (s.file(d, p, {
                binary: !0
              }), o += w, i++, r) {
                r({
                  orderId: t,
                  progress: parseFloat((i / e.length * 100).toFixed(2)),
                  status: "Uploading file ".concat(i, "/").concat(e.length)
                });
              }
            case 32:
              c++;
              _context11.next = 13;
              break;
            case 35:
              if (!(o > 0)) {
                _context11.next = 48;
                break;
              }
              _context11.next = 38;
              return s.generateAsync({
                type: "blob",
                compression: "STORE"
              });
            case 38:
              _e11 = _context11.sent;
              _r5 = n;
              _context11.next = 42;
              return _classPrivateFieldGet(_t, this).call(this, t, String(_r5), t);
            case 42:
              _a3 = _context11.sent;
              _context11.next = 45;
              return _classPrivateFieldGet(_a, this).call(this, _a3, t, String(_r5), t, 1, _e11);
            case 45:
              _i3 = _context11.sent;
              _context11.next = 48;
              return _classPrivateFieldGet(_r, this).call(this, t, t, String(_r5), _a3, [{
                PartNumber: 1,
                ETag: _i3
              }]);
            case 48:
              return _context11.abrupt("return", !0);
            case 51:
              _context11.prev = 51;
              _context11.t0 = _context11["catch"](1);
              throw new Error("Error uploading study from file array: ".concat(_context11.t0.message || _context11.t0.toString()));
            case 54:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[1, 51]]);
      }));
      function uploadDatasetFromFileArray(_x25) {
        return _uploadDatasetFromFileArray.apply(this, arguments);
      }
      return uploadDatasetFromFileArray;
    }()
  }, {
    key: "uploadDatasetFromDicomWeb",
    value: function () {
      var _uploadDatasetFromDicomWeb = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(_ref10) {
        var t, e, r, _ref10$username, a, _ref10$password, i, _ref10$callback, n, s, o, c, p, h, w, _e12, _r6, _a4, _i4, _s2, _e13, _r7, _a5, _i5, _r8, _e14, _r9, _a6, _i6;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              t = _ref10.orderId, e = _ref10.wadoUrl, r = _ref10.studyUid, _ref10$username = _ref10.username, a = _ref10$username === void 0 ? null : _ref10$username, _ref10$password = _ref10.password, i = _ref10$password === void 0 ? null : _ref10$password, _ref10$callback = _ref10.callback, n = _ref10$callback === void 0 ? null : _ref10$callback;
              _context12.prev = 1;
              if (!(!t || !e || !r)) {
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
              return _classPrivateFieldGet(_n, this).call(this, "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
            case 8:
              _context12.next = 10;
              return _classPrivateFieldGet(_n, this).call(this, "https://unpkg.com/dicomweb-client");
            case 10:
              s = a && i ? new DICOMwebClient.api.DICOMwebClient({
                url: e,
                username: a,
                password: i
              }) : new DICOMwebClient.api.DICOMwebClient({
                url: e
              });
              n && n({
                order_id: t,
                progress: 0,
                status: "Retrieving instances from DICOMweb for study ".concat(r)
              });
              _context12.next = 14;
              return s.retrieveStudy({
                studyInstanceUID: r
              });
            case 14:
              o = _context12.sent;
              if (!(!o || 0 === o.length)) {
                _context12.next = 17;
                break;
              }
              throw new Error("No instances recieved from DICOMweb for study ".concat(r));
            case 17:
              n && n({
                order_id: t,
                progress: 100,
                status: "Retrieving instances from DICOMweb for study ".concat(r)
              });
              c = new JSZip();
              p = o.length;
              h = 1, w = 0;
              _e12 = 0;
            case 22:
              if (!(_e12 < o.length)) {
                _context12.next = 45;
                break;
              }
              _r6 = o[_e12];
              _a4 = _classPrivateFieldGet(_i, this).call(this), _i4 = _r6, _s2 = _r6.byteLength;
              if (!(w + _s2 > this.maxZipSize && w > 0)) {
                _context12.next = 41;
                break;
              }
              _context12.next = 28;
              return c.generateAsync({
                type: "blob"
              });
            case 28:
              _e13 = _context12.sent;
              _r7 = h - 1;
              _context12.next = 32;
              return _classPrivateFieldGet(_t, this).call(this, t, String(_r7), t);
            case 32:
              _a5 = _context12.sent;
              _context12.next = 35;
              return _classPrivateFieldGet(_a, this).call(this, _a5, t, String(_r7), t, h, _e13);
            case 35:
              _i5 = _context12.sent;
              _context12.next = 38;
              return _classPrivateFieldGet(_r, this).call(this, t, t, String(_r7), _a5, [{
                PartNumber: h,
                ETag: _i5
              }]);
            case 38:
              c = new JSZip();
              w = 0;
              h++;
            case 41:
              if (c.file(_a4, _i4, {
                binary: !0
              }), w += _s2, n) {
                _r8 = (_e12 + 1) / p * 100;
                _r8 = Math.round(100 * _r8) / 100, _r8 = 100 === _r8 ? 100 : _r8, n({
                  order_id: t,
                  progress: _r8,
                  status: "Uploaded instance ".concat(_e12 + 1, "/").concat(o.length)
                });
              }
            case 42:
              _e12++;
              _context12.next = 22;
              break;
            case 45:
              if (!(w > 0)) {
                _context12.next = 58;
                break;
              }
              _context12.next = 48;
              return c.generateAsync({
                type: "blob"
              });
            case 48:
              _e14 = _context12.sent;
              _r9 = h - 1;
              _context12.next = 52;
              return _classPrivateFieldGet(_t, this).call(this, t, String(_r9), t);
            case 52:
              _a6 = _context12.sent;
              _context12.next = 55;
              return _classPrivateFieldGet(_a, this).call(this, _a6, t, String(_r9), t, h, _e14);
            case 55:
              _i6 = _context12.sent;
              _context12.next = 58;
              return _classPrivateFieldGet(_r, this).call(this, t, t, String(_r9), _a6, [{
                PartNumber: h,
                ETag: _i6
              }]);
            case 58:
              return _context12.abrupt("return", !0);
            case 61:
              _context12.prev = 61;
              _context12.t0 = _context12["catch"](1);
              throw new Error("Error uploading study from DICOMweb: ".concat(_context12.t0.message || _context12.t0.toString()));
            case 64:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[1, 61]]);
      }));
      function uploadDatasetFromDicomWeb(_x26) {
        return _uploadDatasetFromDicomWeb.apply(this, arguments);
      }
      return uploadDatasetFromDicomWeb;
    }()
  }, {
    key: "runJob",
    value: function () {
      var _runJob = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(_ref11) {
        var t, e, r, a, i, n, s;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              t = _ref11.orderId, e = _ref11.productName;
              _context13.prev = 1;
              if (!(!t || !e)) {
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
              r = "".concat(this.serverUrl, "/api/runJob/");
              a = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              };
              i = {
                orderId: t,
                productName: e
              };
              _context13.next = 11;
              return _classPrivateFieldGet(_l, this).call(this, i, this.aesKey, "JSON", "string");
            case 11:
              n = _context13.sent;
              _context13.next = 14;
              return fetch(r, {
                method: "POST",
                headers: a,
                body: n
              });
            case 14:
              s = _context13.sent;
              if (s.ok) {
                _context13.next = 23;
                break;
              }
              _context13.t0 = Error;
              _context13.t1 = JSON;
              _context13.next = 20;
              return s.text();
            case 20:
              _context13.t2 = _context13.sent;
              _context13.t3 = _context13.t1.parse.call(_context13.t1, _context13.t2).error;
              throw new _context13.t0(_context13.t3);
            case 23:
              return _context13.abrupt("return", s.status);
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
  }, {
    key: "checkStatus",
    value: function () {
      var _checkStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(_ref12) {
        var t, _e15, r, a, i, n, s;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              t = _ref12.orderId;
              _context14.prev = 1;
              if (t) {
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
              _e15 = "".concat(this.serverUrl, "/api/checkStatus/");
              r = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              };
              a = {
                orderId: t
              };
              _context14.next = 11;
              return _classPrivateFieldGet(_l, this).call(this, a, this.aesKey, "JSON", "string");
            case 11:
              i = _context14.sent;
              _context14.next = 14;
              return fetch(_e15, {
                method: "POST",
                headers: r,
                body: i
              });
            case 14:
              n = _context14.sent;
              if (n.ok) {
                _context14.next = 23;
                break;
              }
              _context14.t0 = Error;
              _context14.t1 = JSON;
              _context14.next = 20;
              return n.text();
            case 20:
              _context14.t2 = _context14.sent;
              _context14.t3 = _context14.t1.parse.call(_context14.t1, _context14.t2).error;
              throw new _context14.t0(_context14.t3);
            case 23:
              _context14.next = 25;
              return n.text();
            case 25:
              s = _context14.sent;
              _context14.next = 28;
              return _classPrivateFieldGet(_g, this).call(this, s, this.aesKey, "JSON");
            case 28:
              return _context14.abrupt("return", _context14.sent);
            case 31:
              _context14.prev = 31;
              _context14.t4 = _context14["catch"](1);
              throw new Error("Status check failed: ".concat(_context14.t4.message || _context14.t4.toString()));
            case 34:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[1, 31]]);
      }));
      function checkStatus(_x28) {
        return _checkStatus.apply(this, arguments);
      }
      return checkStatus;
    }()
  }, {
    key: "getResults",
    value: function () {
      var _getResults = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(_ref13) {
        var t, e, _ref13$dataType, r, a, i, n, s, o, c, p;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              t = _ref13.orderId, e = _ref13.format, _ref13$dataType = _ref13.dataType, r = _ref13$dataType === void 0 ? "raw" : _ref13$dataType;
              _context15.prev = 1;
              if (!(!t || !e || !r)) {
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
              a = "".concat(this.serverUrl, "/api/getResults/"), i = {
                "Content-Type": "text/plain",
                "Connection-Id": this.connectionId,
                "Origin-Type": this.originType
              };
              e = String(e).toLowerCase(), r = String(r).toLowerCase();
              if (["txt", "xml", "json", "png"].includes(e)) {
                _context15.next = 10;
                break;
              }
              throw new Error("Invalid format");
            case 10:
              n = {
                orderId: t,
                format: e
              };
              _context15.next = 13;
              return _classPrivateFieldGet(_l, this).call(this, n, this.aesKey, "JSON", "string");
            case 13:
              s = _context15.sent;
              _context15.next = 16;
              return fetch(a, {
                method: "POST",
                headers: i,
                body: s
              });
            case 16:
              o = _context15.sent;
              if (o.ok) {
                _context15.next = 25;
                break;
              }
              _context15.t0 = Error;
              _context15.t1 = JSON;
              _context15.next = 22;
              return o.text();
            case 22:
              _context15.t2 = _context15.sent;
              _context15.t3 = _context15.t1.parse.call(_context15.t1, _context15.t2).error;
              throw new _context15.t0(_context15.t3);
            case 25:
              _context15.next = 27;
              return o.text();
            case 27:
              c = _context15.sent;
              _context15.t4 = e;
              _context15.next = _context15.t4 === "txt" ? 31 : _context15.t4 === "json" ? 31 : _context15.t4 === "xml" ? 31 : _context15.t4 === "png" ? 35 : 38;
              break;
            case 31:
              _context15.next = 33;
              return _classPrivateFieldGet(_g, this).call(this, c, this.aesKey, "string");
            case 33:
              p = _context15.sent;
              return _context15.abrupt("break", 38);
            case 35:
              _context15.next = 37;
              return _classPrivateFieldGet(_g, this).call(this, c, this.aesKey, "Uint8Array");
            case 37:
              p = _context15.sent;
            case 38:
              if (!("raw" === r)) {
                _context15.next = 40;
                break;
              }
              return _context15.abrupt("return", p);
            case 40:
              if (!("blob" !== r)) {
                _context15.next = 42;
                break;
              }
              throw new Error("Invalid data type.");
            case 42:
              _context15.t5 = e;
              _context15.next = _context15.t5 === "txt" ? 45 : _context15.t5 === "json" ? 46 : _context15.t5 === "xml" ? 47 : _context15.t5 === "png" ? 48 : 49;
              break;
            case 45:
              return _context15.abrupt("return", new Blob([p], {
                type: "text/plain"
              }));
            case 46:
              return _context15.abrupt("return", new Blob([p], {
                type: "application/json"
              }));
            case 47:
              return _context15.abrupt("return", new Blob([p], {
                type: "application/xml"
              }));
            case 48:
              return _context15.abrupt("return", new Blob([p], {
                type: "image/png"
              }));
            case 49:
              _context15.next = 54;
              break;
            case 51:
              _context15.prev = 51;
              _context15.t6 = _context15["catch"](1);
              throw new Error("Result retrieval failed: ".concat(_context15.t6.message || _context15.t6.toString()));
            case 54:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this, [[1, 51]]);
      }));
      function getResults(_x29) {
        return _getResults.apply(this, arguments);
      }
      return getResults;
    }()
  }], [{
    key: "init",
    value: function init(_ref14) {
      var t = _ref14.serverUrl,
        e = _ref14.apiKey,
        _ref14$originType = _ref14.originType,
        r = _ref14$originType === void 0 ? "api" : _ref14$originType;
      return new Neuropacs(t, e, r);
    }
  }]);
}();
function _e(t) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e3;
  return /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    var i,
      n,
      _args16 = arguments;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          n = 0;
        case 1:
          if (!(n < e)) {
            _context16.next = 18;
            break;
          }
          _context16.prev = 2;
          _context16.next = 5;
          return t.apply(void 0, _args16);
        case 5:
          return _context16.abrupt("return", _context16.sent);
        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](2);
          i = _context16.t0;
          n++;
          _context16.t1 = n < e;
          if (!_context16.t1) {
            _context16.next = 16;
            break;
          }
          _context16.next = 16;
          return new Promise(function (t) {
            return setTimeout(t, r);
          });
        case 16:
          _context16.next = 1;
          break;
        case 18:
          throw i;
        case 19:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[2, 8]]);
  }));
}
module.exports = Neuropacs;