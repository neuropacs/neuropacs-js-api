/*!
 * NeuroPACS v1.0.0
 * (c) 2023 Kerrick Cavanaugh
 * Released under the MIT License.
 */
class Neuropacs {
  constructor(t, e) {
    (this.apiKey = t),
      (this.serverUrl = e),
      (this.ackRecieved = !1),
      (this.datasetUpload = !1);
  }
  loadSocketIOCdn(t, e) {
    var r = document.createElement("script");
    (r.type = "text/javascript"),
      (r.src = t),
      (r.onload = e),
      document.head.appendChild(r);
  }
  disconnectFromSocket() {
    this.socket.close(!1), console.log("Disconnected from upload socket.");
  }
  connectToSocket() {
    this.socket.connect();
  }
  async uploadDataset(t, e, r, n) {
    await this.initSocketIO(),
      (this.datasetUpload = !0),
      this.connectToSocket();
    let a = t.length;
    for (let o = 0; o < a; o++) {
      let i = t[o];
      await this.upload(i, e, r, n), this.printProgressBar(o + 1, a);
    }
    return this.disconnectFromSocket(), 201;
  }
  printProgressBar(t, e, r = 50) {
    let n =
      Array(Math.floor((t / e) * r))
        .fill("=")
        .join("") +
      Array(r - Math.floor((t / e) * r))
        .fill(".")
        .join("");
    console.clear(), console.log(`[${n}] ${((t / e) * 100).toFixed(2)}%`);
  }
  async upload(t, e, r, n) {
    (this.ackReceived = !1), this.datasetUpload || this.connectToSocket();
    let a = "";
    if (t instanceof Uint8Array) a = this.generateFilename();
    else if (t instanceof File) {
      let o = t instanceof File ? t : await this.readFile(t);
      a = o.name;
    } else throw Error("Unsupported data type!");
    let i = {
        "Content-Disposition": "form-data",
        filename: a,
        name: "test123"
      },
      s = "neuropacs----------",
      c = "\r\n",
      l = `--${s}${c}`,
      h = `--${s}--${c}`,
      d = l;
    for (let [p, y] of Object.entries(i)) d += `${p}: ${y};`;
    (d += c),
      (d += "Content-Type: application/octet-stream"),
      (d += `${c}${c}`);
    let u = new TextEncoder().encode(d),
      w = await this.encryptAesCtr(e, n, "string", "string"),
      f;
    if (t instanceof Uint8Array)
      f = this.encryptAesCtr(t, n, "Uint8Array", "bytes");
    else if (t instanceof File) {
      let m = await this.readFileAsArrayBuffer(t);
      f = await this.encryptAesCtr(new Uint8Array(m), n, "Uint8Array", "bytes");
    } else throw Error("Unsupported data type!");
    let C = new Uint8Array([...u, ...f, ...new TextEncoder().encode(h)]);
    this.socket.emit("file_data", {
      data: C,
      headers: {
        "Content-Type": "application/octet-stream",
        "connection-id": r,
        client: "API",
        "order-id": w
      }
    });
    let k = Date.now(),
      S = 0;
    for (; !this.ackReceived && S < 10; )
      (S = (Date.now() - k) / 1e3),
        await new Promise((t) => setTimeout(t, 100));
    if (S > 10) throw (this.disconnectFromSocket(), Error("Upload timeout!"));
    return this.datasetUpload || this.disconnectFromSocket(), 201;
  }
  generateFilename() {
    return "generated_filename";
  }
  async readFileAsArrayBuffer(t) {
    return new Promise((e, r) => {
      let n = new FileReader();
      (n.onload = () => e(n.result)), (n.onerror = r), n.readAsArrayBuffer(t);
    });
  }
  initSocketIOFromCDN(t) {
    this.loadSocketIOCdn(
      "https://neuropacs.com/js/lib/socket.io.min.js",
      () => {
        (this.socket = io(this.serverUrl, {
          autoConnect: !1,
          transports: ["websocket"]
        })),
          this.socket.on("connect", () => {
            console.log("Connected to upload socket!");
          }),
          this.socket.on("ack", (t) => {
            console.log(`ACK RECV: ${t}`),
              "0" == t ? (this.ackReceived = !0) : this.disconnectFromSocket();
          }),
          this.socket.on("error", (t) => {
            console.error("Socket.IO error:", t);
          }),
          t();
      }
    );
  }
  initSocketIO() {
    return new Promise(async (t) => {
      try {
        (this.socket = io(this.serverUrl, {
          autoConnect: !1,
          transports: ["websocket"]
        })),
          this.socket.on("connect", () => {
            console.log("Connected to upload socket!");
          }),
          this.socket.on("ack", (t) => {
            "0" == t ? (this.ackReceived = !0) : this.disconnectFromSocket();
          }),
          this.socket.on("error", (t) => {
            console.error("Socket.IO error:", t);
          }),
          t();
      } catch (e) {
        this.initSocketIOFromCDN(t);
      }
    });
  }
  generateAesKey() {
    let t = new Uint8Array(16);
    window.crypto.getRandomValues(t);
    let e = btoa(String.fromCharCode.apply(null, t));
    return e;
  }
  async oaepEncrypt(t) {
    try {
      t = JSON.stringify(t);
    } catch (e) {
      if ("string" != typeof t)
        throw Error("Plaintext must be a string or JSON!");
    }
    let r = await getPublicKey(),
      n = new TextEncoder().encode(r),
      a = n.buffer,
      o = await crypto.subtle.importKey(
        "spki",
        a,
        { name: "RSA-OAEP", hash: "SHA-256" },
        !1,
        ["encrypt"]
      ),
      i = new TextEncoder().encode(t),
      s = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, o, i),
      c = Array.from(new Uint8Array(s)),
      l = btoa(String.fromCharCode(...c));
    return l;
  }
  async connect(t, e) {
    let r = await this.oaepEncrypt({ aes_key: e, api_key: t });
    try {
      let n = await fetch(`${this.serverUrl}/connect/`, {
        method: "POST",
        headers: { "Content-Type": "text/plain", client: "api" },
        body: r
      });
      if (n.ok) {
        let a = await n.json(),
          o = a.connectionID;
        return o;
      }
      throw Error(`Connection failed! Status: ${n.status}`);
    } catch (i) {
      throw Error("Failed to connect to the server.");
    }
  }
  async getPublicKey() {
    try {
      let t = await fetch(`${this.serverUrl}/getPubKey/`);
      if (t.ok) {
        let e = await t.json(),
          r = e.pub_key;
        return r;
      }
      throw Error(`Public key retrieval failed! Status: ${t.status}`);
    } catch (n) {
      throw Error("Failed to retrieve the public key.");
    }
  }
  async newJob(t, e) {
    try {
      let r = `${this.serverUrl}/newJob/`,
        n = await fetch(r, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Connection-Id": t,
            Client: "API"
          }
        });
      if (201 === n.status) {
        let a = await n.text(),
          o = this.decryptAesCtr(a, e, "string");
        return o;
      }
      throw Error(`Job creation returned status ${n.status}.`);
    } catch (i) {
      throw Error("Failed to create a new job.");
    }
  }
  async runJob(t, e, r, n) {
    try {
      let a = `${this.serverUrl}/runJob/`,
        o = await this.encryptAesCtr(
          { orderID: e, productID: t },
          n,
          "JSON",
          "string"
        ),
        i = await fetch(a, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Connection-Id": r,
            Client: "API"
          },
          body: o
        });
      if (202 === i.status) return i.status;
      throw Error("Job run failed.");
    } catch (s) {
      throw (console.log(s), Error("Failed to run the job."));
    }
  }
  async checkStatus(t, e, r) {
    try {
      let n = `${this.serverUrl}/checkStatus/`,
        a = await this.encryptAesCtr({ orderID: t }, r, "JSON", "string"),
        o = await fetch(n, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "connection-id": e,
            client: "api"
          },
          body: a
        });
      if (200 === o.status) {
        let i = await o.text(),
          s = await this.decryptAesCtr(i, r, "JSON");
        return s;
      }
      throw Error("Status check failed.");
    } catch (c) {
      throw Error("Failed to check status.");
    }
  }
  async getResults(t, e, r, n) {
    try {
      let a = `${this.serverUrl}/getResults/`;
      if (!["TXT", "XML", "JSON", "DICOMSR", "PDF"].includes(t))
        throw Error(
          "Invalid format! Valid formats include: 'TXT', 'JSON', 'XML', 'PDF', 'DICOMSR'."
        );
      let o = this.encryptAesCtr(
          { orderID: e, format: t },
          n,
          "JSON",
          "string"
        ),
        i = await fetch(a, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Connection-Id": r,
            Client: "api"
          },
          body: o
        });
      if (200 === i.status) {
        let s = await i.text(),
          c = this.decryptAesCtr(s, n, "string");
        return c;
      }
      throw Error("Result retrieval failed!");
    } catch (l) {
      throw Error("Failed to retrieve results.");
    }
  }
  async oaepEncrypt(t) {
    try {
      t = "string" == typeof t ? t : JSON.stringify(t);
    } catch (e) {
      throw Error("Plaintext must be a string or JSON!");
    }
    let r = await this.getPublicKey(),
      n = r.substring(26, r.length - 24 - 1),
      a = window.atob(n),
      o = this.str2ab(a),
      i = await crypto.subtle.importKey(
        "spki",
        o,
        { name: "RSA-OAEP", hash: "SHA-256" },
        !0,
        ["encrypt"]
      ),
      s = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        i,
        new TextEncoder().encode(t)
      ),
      c = this.arrayBufferToBase64(s);
    return c;
  }
  str2ab(t) {
    let e = new ArrayBuffer(t.length),
      r = new Uint8Array(e);
    for (let n = 0, a = t.length; n < a; n++) r[n] = t.charCodeAt(n);
    return e;
  }
  arrayBufferToBase64(t) {
    let e = new Uint8Array(t);
    return btoa(String.fromCharCode.apply(null, e));
  }
  async encryptAesCtr(t, e, r, n) {
    let a;
    try {
      if ("string" == r && "string" == typeof t)
        a = new TextEncoder().encode(t);
      else if ("JSON" == r) {
        let o = JSON.stringify(t);
        a = new TextEncoder().encode(o);
      } else if ("Uint8Array" == r && t instanceof Uint8Array) a = t;
      else throw Error("Invalid plaintext format!");
    } catch (i) {
      throw Error("Invalid plaintext format!");
    }
    try {
      let s = new Uint8Array(
          atob(e)
            .split("")
            .map((t) => t.charCodeAt(0))
        ),
        c = await this.pad(a, 16),
        l = crypto.getRandomValues(new Uint8Array(16)),
        h = await crypto.subtle.importKey("raw", s, { name: "AES-CTR" }, !1, [
          "encrypt"
        ]),
        d = await crypto.subtle.encrypt(
          { name: "AES-CTR", counter: l, length: 128 },
          h,
          c
        ),
        p = new Uint8Array(l.length + d.byteLength);
      if ((p.set(l), p.set(new Uint8Array(d), l.length), "string" === n))
        return btoa(String.fromCharCode.apply(null, p));
      if ("bytes" === n) return p;
    } catch (y) {
      throw Error("AES encryption failed!");
    }
  }
  async pad(t, e) {
    let r = e - (t.length % e),
      n = new Uint8Array(t.length + r);
    return n.set(t), n;
  }
  async decryptAesCtr(t, e, r) {
    try {
      let n = new Uint8Array(
          atob(e)
            .split("")
            .map((t) => t.charCodeAt(0))
        ),
        a = new Uint8Array(
          atob(t)
            .split("")
            .map((t) => t.charCodeAt(0))
        ),
        o = a.slice(0, 16),
        i = a.slice(16),
        s = await crypto.subtle.importKey("raw", n, { name: "AES-CTR" }, !1, [
          "decrypt"
        ]),
        c = await crypto.subtle.decrypt(
          { name: "AES-CTR", counter: o, length: 128 },
          s,
          i
        ),
        l = new TextDecoder().decode(c);
      if ("JSON" === r) return (l = l.trim()), JSON.parse(l);
      if ("string" === r) return l;
    } catch (h) {
      throw Error("AES decryption failed!");
    }
  }
}

module.exports = Neuropacs;