// v1.1.1 is of neuropacs.js is lost

/*!
 * NeuroPACS v1.1.0
 * (c) 2024 Kerrick Cavanaugh
 * Released under the MIT License.
 */

class Neuropacs {
  /**
   * Constructor
   * @param {String} apiKey API key for server
   * @param {String} serverUrl Server URL for an instance
   * @param {String} client ClientID (default = "api")
   */
  constructor(serverUrl, apiKey, client = "api") {
    this.apiKey = apiKey;
    this.serverUrl = serverUrl;
    this.aesKey = this.#generateAesKey();
    this.orderId = "";
    this.client = client;
    this.connectionId = "";
  }

  /**
   * Init method
   * @param {String} serverUrl URL of server
   * @param {String} apiKey API key
   * @param {String} client ClientID (default = 'api')

   * @returns {Neuropacs} instance
   */
  static init(serverUrl, apiKey, client = "api") {
    return new Neuropacs(serverUrl, apiKey, client);
  }

  /**
   * Private methods
   */

  /**
   * Genereate unique ID for socket messages
   */
  #generateUniqueId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  /**
   * Load external dependency script
   */
  #loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      script.onload = () => {
        resolve(); // Resolve the promise when the script is loaded
      };
      script.onerror = () => {
        reject(new Error(`Script failed to load from ${url}`));
      };

      document.head.appendChild(script);
    });
  };

  /**
   * Generate an 16-byte AES key for AES-CTR encryption.
   * @returns AES key encoded as a base64 string.
   */
  #generateAesKey = () => {
    const aesKey = new Uint8Array(16);
    window.crypto.getRandomValues(aesKey);
    const aesKeyBase64 = btoa(String.fromCharCode.apply(null, aesKey));
    return aesKeyBase64;
  };

  /**
   * OAEP encrypt plaintext.
   * @param {String/JSON} plaintext Plaintext to be encrypted.
   * @returns Base64 string OAEP encrypted ciphertext.
   */
  #oaepEncrypt = async (plaintext) => {
    try {
      // If plaintext is not a string, attempt to convert it to JSON
      plaintext =
        typeof plaintext === "string" ? plaintext : JSON.stringify(plaintext);
    } catch (error) {
      throw { neuropacsError: "Plaintext must be a string or JSON!" };
    }

    const publicKey = await this.#getPublicKey();

    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = publicKey.substring(
      pemHeader.length,
      publicKey.length - pemFooter.length - 1
    );
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const publicKeyBuffer = this.#str2ab(binaryDerString);

    // Convert the public key to ArrayBuffer
    const publicKeyObject = await crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      true,
      ["encrypt"]
    );
    // Encrypt the plaintext using OAEP padding
    const ciphertextArrayBuffer = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      publicKeyObject,
      new TextEncoder().encode(plaintext)
    );

    // Convert the ciphertext to Base64
    const ciphertextBase64 = this.#arrayBufferToBase64(ciphertextArrayBuffer);
    return ciphertextBase64;
  };

  /**
   * Retrieve public key from server.
   * @returns {String} Base64 string public key.
   */
  #getPublicKey = async () => {
    try {
      const response = await fetch(`${this.serverUrl}/api/getPubKey/`);

      if (!response.ok) {
        throw { neuropacsError: `${await response.text()}` };
      }

      const json = await response.json();
      const pubKey = json.pub_key;
      return pubKey;
    } catch (error) {
      if (error.neuropacsError) {
        throw new Error(error.neuropacsError);
      } else {
        throw new Error("Failed to retrieve the public key.");
      }
    }
  };

  /**
   * String to array buffer
   * @param {*} str String to be converted
   * @returns Array buffer
   */
  #str2ab = (str) => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };

  /**
   * Convert array buffer to Base64
   * @param {ArrayBuffer} buffer Array buffer to be converted
   * @returns Base64 representation
   */
  #arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer);
    return btoa(String.fromCharCode.apply(null, binary));
  };

  /**
   * Generate a UTC time/date string
   * @returns UTC time/date string
   */
  #getTimeDateString = () => {
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getUTCDate()).padStart(2, "0");
    const hours = String(currentDate.getUTCHours()).padStart(2, "0");
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");
    const formattedUTCDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
    return formattedUTCDateTime;
  };

  /**
   * Split blob into partSize pieces for processing
   * @param {*} blob Blob object
   * @param {*} partSize Part size in bytes
   * @returns
   */
  #splitBlob = (blob, partSize) => {
    const parts = [];
    let start = 0;
    while (start < blob.size) {
      const end = Math.min(start + partSize, blob.size);
      parts.push(blob.slice(start, end));
      start = end;
    }
    return parts;
  };

  /**
   * Padding for AES CTR
   * @param {*} data data to be padded
   * @param {*} blockSize block size of cipher
   * @returns  padded data
   */
  #pad = async (data, blockSize) => {
    const padding = blockSize - (data.length % blockSize);
    const paddedData = new Uint8Array(data.length + padding);
    paddedData.set(data);
    return paddedData;
  };

  /**
   * AES CTR encrypt plaintext
   * @param {JSON/String/Bytes} plaintext Plaintext to be encrypted.
   * @param {String} aesKey Base64 AES key.
   * @param {String} formatOut format of ciphertext. Defaults to "string".
   * @returns {String} Encrypted ciphertext in requested format_out.
   */
  #encryptAesCtr = async (plaintext, aesKey, formatIn, formatOut) => {
    let plaintextBytes;

    try {
      if (formatIn == "string" && typeof plaintext === "string") {
        plaintextBytes = new TextEncoder().encode(plaintext);
      } else if (formatIn == "JSON") {
        const plaintextJson = JSON.stringify(plaintext);
        plaintextBytes = new TextEncoder().encode(plaintextJson);
      } else if (formatIn == "Uint8Array" && plaintext instanceof Uint8Array) {
        plaintextBytes = plaintext;
      } else {
        throw new Error("Invalid plaintext format!");
      }
    } catch (error) {
      if (error) {
        throw new Error(error);
      } else {
        throw new Error("Plaintext decoding failed!");
      }
    }

    try {
      // Decode the base64-encoded AES key
      const aesKeyBytes = new Uint8Array(
        atob(aesKey)
          .split("")
          .map((c) => c.charCodeAt(0))
      );

      // Pad the plaintext
      const paddedPlaintext = await this.#pad(plaintextBytes, 16);

      // Generate IV
      const iv = crypto.getRandomValues(new Uint8Array(16));

      // Import AES key
      const importedKey = await crypto.subtle.importKey(
        "raw",
        aesKeyBytes,
        { name: "AES-CTR" },
        false,
        ["encrypt"]
      );

      // Encrypt the plaintext using AES in CTR mode
      const ciphertext = await crypto.subtle.encrypt(
        {
          name: "AES-CTR",
          counter: iv,
          length: 128
        },
        importedKey,
        paddedPlaintext
      );

      // Combine IV and ciphertext
      const encryptedData = new Uint8Array(iv.length + ciphertext.byteLength);
      encryptedData.set(iv);
      encryptedData.set(new Uint8Array(ciphertext), iv.length);

      // Convert to base64 if the output format is 'string'
      if (formatOut === "string") {
        return btoa(String.fromCharCode.apply(null, encryptedData));
      } else if (formatOut === "bytes") {
        return encryptedData;
      }
    } catch (error) {
      if (error) {
        throw new Error(error);
      } else {
        throw new Error("AES encryption failed!");
      }
    }
  };

  /**
   * AES CTR decrypt cyphertext
   * @param {JSON/String/Bytes} encryptedData Ciphertext to be decrypted.
   * @param {String} aesKey Base64 AES key.
   * @param {String} formatOut format of ciphertext. Defaults to "string".
   *
   * @returns {String} Decrpyted plaintext in requested format_out.
   */
  #decryptAesCtr = async (encryptedData, aesKey, formatOut) => {
    try {
      // Decode the base64-encoded AES key
      const aesKeyBytes = new Uint8Array(
        atob(aesKey)
          .split("")
          .map((c) => c.charCodeAt(0))
      );

      // Convert the base64-encoded encrypted data to Uint8Array
      const encryptedBytes = new Uint8Array(
        atob(encryptedData)
          .split("")
          .map((c) => c.charCodeAt(0))
      );

      // Extract IV and ciphertext
      const iv = encryptedBytes.slice(0, 16);
      const ciphertext = encryptedBytes.slice(16);

      // Import AES key
      const importedKey = await crypto.subtle.importKey(
        "raw",
        aesKeyBytes,
        { name: "AES-CTR" },
        false,
        ["decrypt"]
      );

      // Decrypt the ciphertext using AES in CTR mode
      const decryptedBytes = await crypto.subtle.decrypt(
        {
          name: "AES-CTR",
          counter: iv,
          length: 128
        },
        importedKey,
        ciphertext
      );

      // Convert the decrypted result to a string
      let decryptedText = new TextDecoder().decode(decryptedBytes);

      // Handle the output format
      if (formatOut === "JSON") {
        decryptedText = decryptedText.trim();
        return JSON.parse(decryptedText);
      } else if (formatOut === "string") {
        return decryptedText;
      }
    } catch (error) {
      if (error) {
        throw new Error(error);
      } else {
        throw new Error("AES decryption failed!");
      }
    }
  };

  /**
   * Start new multipart upload
   * @param {*} datasetId Base64 datasetId
   * @param {*} orderId Base64 orderId
   * @returns AWS UploadId
   */
  #newMultipartUpload = async (datasetId, orderId) => {
    const url = `${this.serverUrl}/api/multipartUploadRequest/`;

    const encryptedOrderId = await this.#encryptAesCtr(
      orderId,
      this.aesKey,
      "string",
      "string"
    );

    const headers = {
      "Content-Type": "text/plain",
      "Connection-Id": this.connectionId,
      "Order-Id": encryptedOrderId,
      Client: this.client,
      "Dataset-Id": datasetId
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      const jsonErr = JSON.parse(await response.text());
      throw { neuropacsError: `${jsonErr.error}` };
    }

    const resText = await response.text();
    const resJson = await this.#decryptAesCtr(resText, this.aesKey, "JSON");

    return resJson.uploadId;
  };

  /**
   * Complete multipart upload
   * @param {String} orderId Base64 orderId
   * @param {String} datasetId Base64 datasetId
   * @param {String} uploadId Base64 uploadId
   * @param {Object} uploadParts Uploaded parts object
   * @returns status code
   */
  #completeMultipartUpload = async (
    orderId,
    datasetId,
    uploadId,
    uploadParts
  ) => {
    const url = `${this.serverUrl}/api/completeMultipartUpload/`;

    const encryptedOrderId = await this.#encryptAesCtr(
      orderId,
      this.aesKey,
      "string",
      "string"
    );

    const headers = {
      "Content-Type": "text/plain",
      "Order-Id": encryptedOrderId,
      "Connection-Id": this.connectionId,
      Client: this.client
    };

    const body = {
      datasetId: datasetId,
      uploadId: uploadId,
      uploadParts: uploadParts
    };

    const encryptedBody = await this.#encryptAesCtr(
      body,
      this.aesKey,
      "JSON",
      "string"
    );

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: encryptedBody
    });

    if (!response.ok) {
      const jsonErr = JSON.parse(await response.text());
      throw { neuropacsError: `${jsonErr.error}` };
    }

    return 200;
  };

  /**
   * Upload a part of the multipart upload
   * @param {String} uploadId Base64 uploadId
   * @param {String} datasetId Base64 datasetId
   * @param {String} orderId Base64 orderId
   * @param {Number} partNumber Part number
   * @param {Bytes} partData Part data
   * @returns
   */
  #uploadPart = async (uploadId, datasetId, orderId, partNumber, partData) => {
    const encryptedOrderId = await this.#encryptAesCtr(
      orderId,
      this.aesKey,
      "string",
      "string"
    );

    const headers = {
      "Content-Type": "text/plain",
      "connection-id": this.connectionId,
      "Order-Id": encryptedOrderId,
      client: this.client
    };

    const body = {
      datasetId: datasetId,
      uploadId: uploadId,
      partNumber: partNumber
    };

    const encryptedBody = await this.#encryptAesCtr(
      body,
      this.aesKey,
      "JSON",
      "string"
    );

    const response = await fetch(
      `${this.serverUrl}/api/multipartPresignedUrl/`,
      {
        method: "POST",
        headers: headers,
        body: encryptedBody
      }
    );

    if (!response.ok) {
      const jsonErr = JSON.parse(await response.text());
      throw { neuropacsError: `${jsonErr.error}` };
    }

    const resText = await response.text();
    const resJson = await this.#decryptAesCtr(resText, this.aesKey, "JSON");

    const presignedUrl = resJson.presignedURL;

    let fail = false;
    let failText = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      const upload_res = await fetch(presignedUrl, {
        method: "PUT",
        body: partData
      });

      if (!upload_res.ok) {
        fail = true;
        failText = await upload_res.text();
      } else {
        const eTag = upload_res.headers.get("ETag");
        return eTag;
      }
    }

    if (fail) {
      throw { neuropacsError: `${failText}` };
    }
  };

  /**
   * Public methods
   */

  /**
   * Create a connection with the server

   * @returns {String} Base64 string encrypted AES key
   */
  async connect() {
    const headers = {
      "Content-Type": "text/plain",
      Client: this.client
    };

    const body = {
      aes_key: this.aesKey,
      api_key: this.apiKey
    };

    try {
      const encryptedBody = await this.#oaepEncrypt(body);

      const response = await fetch(`${this.serverUrl}/api/connect/`, {
        method: "POST",
        headers: headers,
        body: encryptedBody
      });

      if (!response.ok) {
        const jsonErr = JSON.parse(await response.text());
        throw { neuropacsError: `${jsonErr.error}` };
      }

      const json = await response.json();
      const connectionId = json.connectionID;
      this.connectionId = connectionId;
      return {
        timestamp: this.#getTimeDateString(),
        connectionId: connectionId,
        aesKey: this.aesKey
      };
    } catch (error) {
      if (error.neuropacsError) {
        throw new Error(error.neuropacsError);
      } else {
        throw new Error("Connection failed!");
      }
    }
  }

  /**
   * Create a new order

   * @returns {String} Base64 string orderID.
   */
  async newJob() {
    try {
      const url = `${this.serverUrl}/api/newJob/`;
      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        Client: this.client
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers
      });

      if (!response.ok) {
        const jsonErr = JSON.parse(await response.text());
        throw { neuropacsError: `${jsonErr.error}` };
      }

      const text = await response.text();
      const orderId = await this.#decryptAesCtr(text, this.aesKey, "string");
      this.orderId = orderId;
      return orderId;
    } catch (error) {
      if (error.neuropacsError) {
        throw new Error(error.neuropacsError);
      } else {
        throw new Error("Job creation failed!");
      }
    }
  }

  // async uploadPart(jsZip) {
  //   // Generate the zip file as a Blob
  //   const blob = await jsZip.generateAsync({ type: "uint8array" });
  //   const form = {
  //     "Content-Disposition": "form-data"
  //     // filename: filename
  //   };

  //   const encoder = new TextEncoder();

  //   const BOUNDARY = encoder.encode("neuropacs----------");
  //   const DELIM = encoder.encode(";");
  //   const CRLF = encoder.encode("\r\n");
  //   const SEPARATOR = new Uint8Array([
  //     ...encoder.encode("--"),
  //     ...BOUNDARY,
  //     ...CRLF
  //   ]);
  //   const END = new Uint8Array([
  //     ...encoder.encode("--"),
  //     ...BOUNDARY,
  //     ...encoder.encode("--"),
  //     ...CRLF
  //   ]);
  //   const CONTENT_TYPE = encoder.encode(
  //     "Content-Type: application/octet-stream"
  //   );

  //   let header = SEPARATOR;

  //   for (const [key, value] of Object.entries(form)) {
  //     const formField = encoder.encode(`${key}: ${value}`);
  //     header = new Uint8Array([...header, ...formField, ...DELIM]);
  //   }
  //   header = new Uint8Array([
  //     ...header,
  //     ...CRLF,
  //     ...CONTENT_TYPE,
  //     ...CRLF,
  //     ...CRLF
  //   ]);

  //   const headerBytes = header;

  //   const footerBytes = END;

  //   const message = new Uint8Array([...headerBytes, ...blob, ...footerBytes]);

  //   const partSize = 10 * 1024 * 1024; // 10 MB

  //   const parts = message.length / partSize;
  // }

  /**
   * Fast upload dataset
   * @param {Array<File>} dataset Array of File objects
   * @param {String} datasetId Base64 datasetId (optional)
   * @param {String} orderId Base64 orderId (optional)
   * @param {Function} callback Callback for progress updates
   * @returns {Number} Upload status code.
   */
  async uploadDataset(
    dataset,
    datasetId = null,
    orderId = null,
    callback = null
  ) {
    if (orderId == null) {
      orderId = this.orderId;
    }

    if (datasetId == null) {
      datasetId = this.#generateUniqueId();
    }

    //load JSZip
    await this.#loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
    );

    //get uploadID
    const uploadId = await this.#newMultipartUpload(datasetId, orderId);

    let jsZip = new JSZip();
    //zip all file contents
    for (let f = 0; f < dataset.length; f++) {
      jsZip.file(dataset[f].name, dataset[f], { binary: true });
      await new Promise((resolve) => setTimeout(resolve, 0)); //release memory
      if (callback) {
        const fileProcessed = f + 1;
        const progress = parseFloat(
          ((fileProcessed / dataset.length) * 100).toFixed(2)
        );
        callback({
          datasetId: datasetId,
          progress: progress == 100.0 ? 100 : progress,
          status: "Compressing"
        });
      }
    }

    //create a blob object for zip file contents
    const blob = await jsZip.generateAsync({ type: "blob" });

    const partSize = 5 * 1024 * 1024; // 5MB minimum part size

    //split into partSize chunks
    const blobParts = this.#splitBlob(blob, partSize);

    const finalParts = [];

    for (let up = 0; up < blobParts.length; up++) {
      //upload part
      const ETag = await this.#uploadPart(
        uploadId,
        datasetId,
        orderId,
        up + 1,
        blobParts[up]
      );
      //puh to finalParts array
      finalParts.push({ PartNumber: up + 1, ETag: ETag });
      //invoke callback
      if (callback) {
        const filesUploaded = up + 1;
        const progress = parseFloat(
          ((filesUploaded / blobParts.length) * 100).toFixed(2)
        );
        callback({
          datasetId: datasetId,
          progress: progress == 100.0 ? 100 : progress,
          status: "Uploading"
        });
      }
    }

    //complete multipart upload
    await this.#completeMultipartUpload(
      orderId,
      datasetId,
      uploadId,
      finalParts
    );

    return datasetId; // Upload success status code
  }

  /**
   * Validate a dataset upload
   * @param {Array<String>} fileArray Array of filenames
   * @param {*} datasetId  Base64 datasetId
   * @param {*} orderId Base64 orderId
   * @param {*} connectionId  Base64 connectionId
   * @returns
   */
  async validateUpload(
    fileArray,
    datasetId,
    orderId = null,
    connectionId = null
  ) {
    if (orderId == null) {
      orderId = this.orderId;
    }
    if (connectionId == null) {
      connectionId = this.connectionId;
    }
    try {
      //encrypt order ID
      const encryptedOrderId = await this.#encryptAesCtr(
        orderId,
        this.aesKey,
        "string",
        "string"
      );

      const url = `${this.serverUrl}/api/verifyUpload/`;
      const headers = {
        "Content-Type": "text/plain",
        "Dataset-Id": datasetId,
        "Order-Id": encryptedOrderId,
        "Connection-Id": this.connectionId,
        Client: this.client
      };

      const body = {
        fileArray: fileArray
      };

      const encryptedBody = await this.#encryptAesCtr(
        body,
        this.aesKey,
        "JSON",
        "string"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: encryptedBody
      });

      if (!response.ok) {
        const jsonErr = JSON.parse(await response.text());
        throw { neuropacsError: `${jsonErr.error}` };
      }

      const text = await response.text();
      const decryptedDatasetValidation = await this.#decryptAesCtr(
        text,
        this.aesKey,
        "JSON"
      );

      return decryptedDatasetValidation;
    } catch (error) {
      if (error.neuropacsError) {
        throw new Error(error.neuropacsError);
      } else {
        throw new Error("Dataset validation failed!");
      }
    }
  }

  /**
   * Run a job
   * @param {String} productId Product to be executed
   * @param {String} orderId Base64 order Id (optional)
   * @param {String} datasetId Base64 dataset Id (optional)

   * @returns {Number} Job run status code
   */
  async runJob(productId, orderId = null, datasetId = null) {
    if (orderId == null) {
      orderId = this.orderId;
    }

    try {
      const url = `${this.serverUrl}/api/runJob/`;
      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        Client: this.client
      };

      const body = {
        orderID: orderId,
        productID: productId,
        datasetID: datasetId
      };

      const encryptedBody = await this.#encryptAesCtr(
        body,
        this.aesKey,
        "JSON",
        "string"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: encryptedBody
      });

      if (!response.ok) {
        const jsonErr = JSON.parse(await response.text());
        throw { neuropacsError: `${jsonErr.error}` };
      }

      return response.status;
    } catch (error) {
      if (error.neuropacsError) {
        throw new Error(error.neuropacsError);
      } else {
        throw new Error("Job run failed!");
      }
    }
  }

  /**
   * Check job status
   * @param {String} orderId Base64 order_id (optional)
   * @param {String} datasetId Base64 dataset_id (optional)
  
   * @returns {Number} Job status message
   */
  async checkStatus(orderId = null, datasetId = null) {
    if (orderId == null) {
      orderId = this.orderId;
    }

    try {
      const url = `${this.serverUrl}/api/checkStatus/`;
      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        Client: this.client
      };

      const body = {
        orderID: orderId,
        datasetID: datasetId
      };

      const encryptedBody = await this.#encryptAesCtr(
        body,
        this.aesKey,
        "JSON",
        "string"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: encryptedBody
      });

      if (!response.ok) {
        const jsonErr = JSON.parse(await response.text());
        throw { neuropacsError: `${jsonErr.error}` };
      }

      const text = await response.text();
      const json = await this.#decryptAesCtr(text, this.aesKey, "JSON");
      return json;
    } catch (error) {
      if (error.neuropacsError) {
        throw new Error(error.neuropacsError);
      } else {
        throw new Error("Status check failed.");
      }
    }
  }

  /**
   * Get job results
   * @param {String} format Base64 AES key
   * @param {String} orderId Base64 connection_id(optional)
   * @param {String} datasetId Base64 dataset_id (optional)

   * @returns  AES encrypted file data in specified format
   */
  async getResults(format, orderId = null, datasetId = null) {
    if (orderId == null) {
      orderId = this.orderId;
    }
    try {
      const url = `${this.serverUrl}/api/getResults/`;
      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        Client: this.client
      };

      const validFormats = ["TXT", "XML", "JSON"];

      if (!validFormats.includes(format)) {
        throw {
          neuropacsError: `Invalid format! Valid formats include: "TXT", "JSON", "XML"`
        };
      }

      const body = {
        orderID: orderId,
        format: format,
        datasetID: datasetId
      };

      const encryptedBody = await this.#encryptAesCtr(
        body,
        this.aesKey,
        "JSON",
        "string"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: encryptedBody
      });

      if (!response.ok) {
        const jsonErr = JSON.parse(await response.text());
        throw { neuropacsError: `${jsonErr.error}` };
      }

      const text = await response.text();
      const decryptedFileData = await this.#decryptAesCtr(
        text,
        this.aesKey,
        "string"
      );

      return decryptedFileData;
    } catch (error) {
      if (error.neuropacsError) {
        throw new Error(error.neuropacsError);
      } else {
        throw new Error("Result retrieval failed!");
      }
    }
  }
}

window.Neuropacs = Neuropacs;
