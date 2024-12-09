/*!
 * neuropacs JavaScript API v1.1.8
 * (c) 2024 neuropacs
 * Released under the MIT License.
 */

class Neuropacs {
  /**
   * Constructor
   * @param {String} apiKey API key for server
   * @param {String} serverUrl Server URL for an instance
   * @param {String} originType Request origin (default = "API")
   */
  constructor(serverUrl, apiKey, originType = "API") {
    this.apiKey = apiKey;
    this.serverUrl = serverUrl;
    this.aesKey = null;
    this.originType = originType;
    this.connectionId = null;
    this.maxZipSize = 15 * 1024 * 1024; // 15MB max zip file size

    // Wrapped methods with retry (3 times, every 1000ms)
    this.#newMultipartUpload = this.#withRetry(
      this.#newMultipartUpload.bind(this),
      3,
      1000
    );
    this.#completeMultipartUpload = this.#withRetry(
      this.#completeMultipartUpload.bind(this),
      3,
      1000
    );
    this.#uploadPart = this.#withRetry(this.#uploadPart.bind(this), 3, 1000);
  }

  /**
   * Init method
   * @param {String} serverUrl URL of server
   * @param {String} apiKey API key
   * @param {String} originType originType (default = 'api')

   * @returns {Neuropacs} instance
   */
  static init({ serverUrl, apiKey, originType = "api" }) {
    return new Neuropacs(serverUrl, apiKey, originType);
  }

  /**
   * Private methods
   */

  /**
   * Generate a unique V4 UUID
   * @returns UUID V4 string
   */
  #generateUniqueUUID = () => {
    try {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    } catch (error) {
      throw new Error(
        `UUID generation failed: ${error.message || error.toString()}`
      );
    }
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
        reject(new Error(`Script failed to load.`));
      };

      document.head.appendChild(script);
    });
  };

  /**
   * Generate an 16-byte AES key for AES-CTR encryption.
   * @returns AES key encoded as a base64 string.
   */
  #generateAesKey = () => {
    try {
      const aesKey = new Uint8Array(16);
      window.crypto.getRandomValues(aesKey);
      const aesKeyBase64 = btoa(String.fromCharCode.apply(null, aesKey));
      return aesKeyBase64;
    } catch (error) {
      throw new Error(
        `AES key generation failed: ${error.message || error.toString()}`
      );
    }
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
      throw new RangeError("Plaintext must be a string or JSON.");
    }

    try {
      const publicKey = await this.#getPublicKey();

      // extract the part of the PEM string between header and footer
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

      // Convert the public key to public key objecct
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
      // Encrypt the plaintext using OAEP
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
    } catch (error) {
      throw new Error(
        `OAEP encryption failed: ${error.message || error.toString()}`
      );
    }
  };

  /**
   * Retrieve public key from server.
   * @returns {String} Base64 string public key.
   */
  #getPublicKey = async () => {
    const headers = {
      "Origin-Type": this.originType
    };

    try {
      const response = await fetch(`${this.serverUrl}/api/getPubKey/`, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        if (response.status == 403) {
          throw new Error("CORS error.");
        }
        throw new Error(JSON.parse(await response.text()).error);
      }

      const json = await response.json();
      const pubKey = json.pub_key;
      return pubKey;
    } catch (error) {
      throw new Error(
        `Retrieval of public key failed: ${error.message || error.toString()}`
      );
    }
  };

  /**
   * String to array buffer
   * @param {*} str String to be converted
   * @returns Array buffer
   */
  #str2ab = (str) => {
    try {
      const buf = new ArrayBuffer(str.length);
      const bufView = new Uint8Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    } catch (error) {
      throw new Error(
        `String to array buffer conversion failed: ${
          error.message || error.toString()
        }`
      );
    }
  };

  /**
   * Convert array buffer to Base64
   * @param {ArrayBuffer} buffer Array buffer to be converted
   * @returns Base64 representation
   */
  #arrayBufferToBase64 = (buffer) => {
    try {
      const binary = new Uint8Array(buffer);
      return btoa(String.fromCharCode.apply(null, binary));
    } catch (error) {
      throw new Error(
        `Array buffer to base64 conversion failed: ${
          error.message || error.toString()
        }`
      );
    }
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
   * Padding for AES CTR
   * @param {*} data data to be padded
   * @param {*} blockSize block size of cipher
   * @returns  padded data
   */
  #pad = async (data, blockSize) => {
    try {
      const padding = blockSize - (data.length % blockSize);
      const paddedData = new Uint8Array(data.length + padding);
      paddedData.set(data);
      return paddedData;
    } catch (error) {
      throw new Error(
        `AES padding failed : ${error.message || error.toString()}`
      );
    }
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
      } else {
        throw new Error(`Invalid output format`);
      }
    } catch (error) {
      throw new Error(
        `AES encrption failed: ${error.message || error.toString()}`
      );
    }
  };

  /**
   * Ensures filenames are unique (some scanners produce duplicate filenames)
   * @param {Set} fileSet Set of existing file names
   * @param {String} filename File name to be added
   * @returns {String} Unique filename
   */
  #ensureUniqueName = (fileSet, filename) => {
    let hasExt = false;
    if (filename.includes(".")) {
      hasExt = true;
    }
    const baseName = hasExt ? filename.replace(/\.[^/.]+$/, "") : filename; // Extract base name
    const extension = hasExt ? filename.split(".").pop() : ""; // Extract extension if exists
    let counter = 1;

    let newName = filename;
    while (fileSet.has(newName)) {
      newName = hasExt
        ? `${baseName}_${counter}.${extension}`
        : `${baseName}_${counter}`;
      counter++;
    }
    fileSet.add(newName);
    return newName;
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
      } else if (formatOut === "Uint8Array") {
        return decryptedBytes;
      } else {
        throw new Error(`Invalid output format`);
      }
    } catch (error) {
      throw new Error(
        `AES decryption failed: ${error.message || error.toString()}`
      );
    }
  };

  /**
   * Wrapper function to retry AWS request-based function multiple times if it fails.
   * @param {*} fn Function to retry
   * @param {*} maxRetries Maximum number of retries before giving up.
   * @param {*} delay Delay in seconds between retries.
   * @returns Wrapped function promise
   */
  #withRetry(fn, maxRetries = 3, delay = 1000) {
    return async function (...args) {
      let attempt = 0;
      let lastError;
      while (attempt < maxRetries) {
        try {
          return await fn(...args);
        } catch (error) {
          lastError = error;
          attempt++;
          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
      throw lastError;
    };
  }

  /**
   * Start new multipart upload
   * @param {String} datasetId Base64 datasetId
   * @param {Number} partIndex Index of zip file
   * @param {String} orderId Base64 orderId
   * @returns AWS UploadId
   */
  #newMultipartUpload = async (datasetId, index, orderId) => {
    try {
      const url = `${this.serverUrl}/api/multipartUploadRequest/`;

      const body = {
        datasetId: datasetId,
        zipIndex: index,
        orderId: orderId
      };

      const encryptedBody = await this.#encryptAesCtr(
        body,
        this.aesKey,
        "JSON",
        "string"
      );

      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        "Origin-Type": this.originType
      };

      const response = await fetch(url, {
        method: "POST",
        body: encryptedBody,
        headers: headers
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).error);
      }

      const resText = await response.text();
      const resJson = await this.#decryptAesCtr(resText, this.aesKey, "JSON");

      return resJson.uploadId;
    } catch (error) {
      throw new Error(
        `Multipart upload initialization failed: ${
          error.message || error.toString()
        }`
      );
    }
  };

  /**
   * Complete multipart upload
   * @param {String} orderId Base64 orderId
   * @param {String} datasetId Base64 datasetId
   * @param {Number} partIndex Index of zip file
   * @param {String} uploadId Base64 uploadId
   * @param {Object} uploadParts Uploaded parts object
   * @returns status code
   */
  #completeMultipartUpload = async (
    orderId,
    datasetId,
    zipIndex,
    uploadId,
    uploadParts
  ) => {
    try {
      const url = `${this.serverUrl}/api/completeMultipartUpload/`;

      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        "Origin-Type": this.originType
      };

      const body = {
        datasetId: datasetId,
        uploadId: uploadId,
        uploadParts: uploadParts,
        zipIndex: zipIndex,
        orderId: orderId
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
        throw new Error(JSON.parse(await response.text()).error);
      }

      return 200;
    } catch (error) {
      throw new Error(
        `Multipart upload completion failed: ${
          error.message || error.toString()
        }`
      );
    }
  };

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
  #uploadPart = async (
    uploadId,
    datasetId,
    zipIndex,
    orderId,
    partNumber,
    partData
  ) => {
    try {
      let response;

      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        "Origin-Type": this.originType
      };

      const body = {
        datasetId: datasetId,
        uploadId: uploadId,
        partNumber: partNumber,
        zipIndex: zipIndex,
        orderId: orderId
      };

      const encryptedBody = await this.#encryptAesCtr(
        body,
        this.aesKey,
        "JSON",
        "string"
      );

      // Retrieve a presigned url
      response = await fetch(`${this.serverUrl}/api/multipartPresignedUrl/`, {
        method: "POST",
        headers: headers,
        body: encryptedBody
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).error);
      }

      const resText = await response.text();
      const resJson = await this.#decryptAesCtr(resText, this.aesKey, "JSON");

      const presignedUrl = resJson.presignedUrl;

      if (!presignedUrl) {
        throw new Error("Presigned URL not present in AWS response.");
      }

      // Put data to presigned url
      response = await fetch(presignedUrl, {
        method: "PUT",
        body: partData
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const eTag = response.headers.get("ETag");

      if (!eTag) {
        throw new Error("Etag header not present in AWS response.");
      }

      return eTag;
    } catch (error) {
      throw new Error(
        `Upload part failed: ${error.message || error.toString()}`
      );
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
    try {
      const headers = {
        "Content-Type": "text/plain",
        "Origin-Type": this.originType,
        "X-Api-Key": this.apiKey
      };

      const aesKey = this.#generateAesKey();
      this.aesKey = aesKey;

      const body = {
        aes_key: aesKey
      };

      const encryptedBody = await this.#oaepEncrypt(body);

      const response = await fetch(`${this.serverUrl}/api/connect/`, {
        method: "POST",
        headers: headers,
        body: encryptedBody
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).error);
      }

      const json = await response.json();
      const connectionId = json.connectionId;
      this.connectionId = connectionId;
      return {
        timestamp: this.#getTimeDateString(),
        connectionId: connectionId,
        aesKey: this.aesKey
      };
    } catch (error) {
      throw new Error(
        `Connection creation failed: ${error.message || error.toString()}`
      );
    }
  }

  /**
   * Create a new order

   * @returns {String} Base64 string orderId.
   */
  async newJob() {
    try {
      if (!this.connectionId || !this.aesKey) {
        throw new Error(
          "Missing session parameters, start a new session with 'connect()' and try again."
        );
      }

      const url = `${this.serverUrl}/api/newJob/`;

      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        "Origin-Type": this.originType
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).error);
      }

      const text = await response.text();
      const decryptedJson = await this.#decryptAesCtr(
        text,
        this.aesKey,
        "JSON"
      );

      this.orderId = decryptedJson.orderId;
      return decryptedJson.orderId;
    } catch (error) {
      throw new Error(
        `Job creation failed: ${error.message || error.toString()}`
      );
    }
  }

  /**
   * Upload a dataset from a file object array
   * @param {String} orderId Unique base64 identifier for the order.
   * @param {FileList} fileArray Array containing File objects
   * @param {Function} [callback] Callback function invoked with upload progress.
   * @returns {Promise<Object>} A promise that resolves to the response of the upload operation.
   */
  async uploadDatasetFromFileArray({ orderId, fileArray, callback = null }) {
    try {
      if (!fileArray || !orderId) {
        throw new Error("Parameter is missing");
      }

      if (!this.connectionId || !this.aesKey) {
        throw new Error(
          "Missing session parameters, start a new session with 'connect()' and try again."
        );
      }

      if (
        !(fileArray instanceof FileList) &&
        !(
          Array.isArray(fileArray) &&
          fileArray.every((file) => file instanceof File)
        )
      ) {
        throw new Error(`Dataset must be an array of files or a FileList`);
      }

      // Load JSZip
      await this.#loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
      );

      const filenamesSet = new Set(); // Set to hold filenames (to detect duplicates)
      let filesUploaded = 0; // Counts number of files uploaded
      let partIndex = 1; // Counts index of zip file
      let jsZip = new JSZip(); // New JSZip instance
      let currentZipSize = 0; // Keep track of current zip size

      for (let f = 0; f < fileArray.length; f++) {
        // Get name of the current file
        const curFile = fileArray[f];
        const curFilename = curFile.name;
        const curFileSize = curFile.size;

        // Ensure a unique filename
        const uniqueFilename = this.#ensureUniqueName(
          filenamesSet,
          curFilename
        );

        // If adding the current file would exceed max zip size, generate and upload the zip
        if (
          currentZipSize + curFileSize > this.maxZipSize &&
          currentZipSize > 0
        ) {
          // Generate zipBytes
          const zipBytes = await jsZip.generateAsync({
            type: "blob"
            // compression: "STORE"
          });

          // Start a new multipart upload
          const zipIndex = partIndex;
          const uploadId = await this.#newMultipartUpload(
            orderId,
            String(zipIndex),
            orderId
          );

          // Upload part
          const ETag = await this.#uploadPart(
            uploadId,
            orderId,
            String(zipIndex),
            orderId,
            1, // PartNumber is usually 1 for single-part uploads
            zipBytes
          );

          // Complete multipart upload
          await this.#completeMultipartUpload(
            orderId,
            orderId,
            String(zipIndex),
            uploadId,
            [{ PartNumber: 1, ETag: ETag }]
          );

          // Reset jsZip and currentZipSize
          jsZip = new JSZip();
          currentZipSize = 0;
          partIndex++; // Increment partIndex for the next zip file
        }

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
          const progress = parseFloat(
            ((filesUploaded / fileArray.length) * 100).toFixed(2)
          );

          callback({
            orderId: orderId,
            progress: progress,
            status: `Uploading file ${filesUploaded}/${fileArray.length}`
          });
        }
      }

      // After all files are processed, if there are files left in jsZip, generate and upload
      if (currentZipSize > 0) {
        // Generate zipBytes
        const zipBytes = await jsZip.generateAsync({
          type: "blob",
          compression: "STORE"
        });

        // Start a new multipart upload
        const zipIndex = partIndex;
        const uploadId = await this.#newMultipartUpload(
          orderId,
          String(zipIndex),
          orderId
        );

        // Upload part
        const ETag = await this.#uploadPart(
          uploadId,
          orderId,
          String(zipIndex),
          orderId,
          1, // PartNumber is usually 1 for single-part uploads
          zipBytes
        );

        // Complete multipart upload
        await this.#completeMultipartUpload(
          orderId,
          orderId,
          String(zipIndex),
          uploadId,
          [{ PartNumber: 1, ETag: ETag }]
        );
      }

      // Return final upload status
      return true;
    } catch (error) {
      throw new Error(
        `Error uploading study from file array: ${
          error.message || error.toString()
        }`
      );
    }
  }

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
  async uploadDatasetFromDicomWeb({
    orderId,
    wadoUrl,
    studyUid,
    username = null,
    password = null,
    callback = null
  }) {
    try {
      if (!orderId || !wadoUrl || !studyUid) {
        throw new Error("Parameter is missing");
      }

      if (!this.connectionId || !this.aesKey) {
        throw new Error(
          "Missing session parameters, start a new session with 'connect()' and try again."
        );
      }

      //load JSZip
      await this.#loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
      );
      //load DICOMweb client
      await this.#loadScript("https://unpkg.com/dicomweb-client");

      let dicomWebClient;
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
          status: `Retrieving instances from DICOMweb for study ${studyUid}`
        });
      }

      // Get the instances associated with the study
      const instances = await dicomWebClient.retrieveStudy({
        studyInstanceUID: studyUid
      });

      if (!instances || instances.length === 0) {
        throw new Error(
          `No instances recieved from DICOMweb for study ${studyUid}`
        );
      }

      // Update callback
      if (callback) {
        callback({
          order_id: orderId,
          progress: 100,
          status: `Retrieving instances from DICOMweb for study ${studyUid}`
        });
      }

      let jsZip = new JSZip(); // New JSZip instance
      const totalInstances = instances.length; // Total number of instances
      let partNumber = 1; // Track current part number
      let currentZipSize = 0; // Keep track of current zip size

      // Iterate through instances
      for (let i = 0; i < instances.length; i++) {
        let instanceData = instances[i];

        // Generate a filename
        const uniqueFilename = this.#generateUniqueUUID();

        // instanceData is already an ArrayBuffer!
        const dataBytes = instanceData;

        // Get length of the current file
        const curFileSize = instanceData.byteLength;

        // If adding the current file would exceed max zip size, generate and upload the zip
        if (
          currentZipSize + curFileSize > this.maxZipSize &&
          currentZipSize > 0
        ) {
          // Get byte contents of zip file
          const zipBytes = await jsZip.generateAsync({
            type: "blob"
          });

          // Get zip index
          const zipIndex = partNumber - 1;

          // Get upload_id for multipart upload
          const uploadId = await this.#newMultipartUpload(
            orderId,
            String(zipIndex),
            orderId
          );

          // Upload the zip file
          const eTag = await this.#uploadPart(
            uploadId,
            orderId,
            String(zipIndex),
            orderId,
            partNumber,
            zipBytes
          );

          // Complete multipart upload
          await this.#completeMultipartUpload(
            orderId,
            orderId,
            String(zipIndex),
            uploadId,
            [{ PartNumber: partNumber, ETag: eTag }]
          );

          // Reset zip and currentZipSize
          jsZip = new JSZip();
          currentZipSize = 0;
          partNumber++; // Increment part number for next zip file
        }

        // Add the current instance to the zip
        jsZip.file(uniqueFilename, dataBytes, {
          binary: true
        });

        // Increment currentZipSize
        currentZipSize += curFileSize;

        // Update callback
        if (callback) {
          let progress = ((i + 1) / totalInstances) * 100;
          progress = Math.round(progress * 100) / 100; // Round to two decimal places
          progress = progress === 100 ? 100 : progress;
          callback({
            order_id: orderId,
            progress: progress,
            status: `Uploaded instance ${i + 1}/${instances.length}`
          });
        }
      }

      // After all files are processed, if there are files left in jsZip, generate and upload
      if (currentZipSize > 0) {
        // Get byte contents of zip file
        const zipBytes = await jsZip.generateAsync({
          type: "blob"
        });

        // Get zip index
        const zipIndex = partNumber - 1;

        // Get upload_id for multipart upload
        const uploadId = await this.#newMultipartUpload(
          orderId,
          String(zipIndex),
          orderId
        );

        // Upload the zip file
        const eTag = await this.#uploadPart(
          uploadId,
          orderId,
          String(zipIndex),
          orderId,
          partNumber,
          zipBytes
        );

        // Complete multipart upload
        await this.#completeMultipartUpload(
          orderId,
          orderId,
          String(zipIndex),
          uploadId,
          [{ PartNumber: partNumber, ETag: eTag }]
        );
      }

      return true;
    } catch (error) {
      throw new Error(
        `Error uploading study from DICOMweb: ${
          error.message || error.toString()
        }`
      );
    }
  }

  /**
   * Run a job for a specified order with a specified product
   * @param {String} orderId Unique base64 identifier for the order.
   * @param {String} productName Product to be executed
   * @returns {Number} Job run status code
   */
  async runJob({ orderId, productName }) {
    try {
      if (!orderId || !productName) {
        throw new Error("Parameter is missing");
      }

      if (!this.connectionId || !this.aesKey) {
        throw new Error(
          "Missing session parameters, start a new session with 'connect()' and try again."
        );
      }

      const url = `${this.serverUrl}/api/runJob/`;
      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        "Origin-Type": this.originType
      };

      const body = {
        orderId: orderId,
        productName: productName
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
        throw new Error(JSON.parse(await response.text()).error);
      }

      return response.status;
    } catch (error) {
      throw new Error(`Job run failed: ${error.message || error.toString()}`);
    }
  }

  /**
   * Check job status for a specified order
   * @param {String} orderId Unique base64 identifier for the order.
  
   * @returns {Number} Job status message
   */
  async checkStatus({ orderId }) {
    try {
      if (!orderId) {
        throw new Error("Parameter is missing");
      }

      if (!this.connectionId || !this.aesKey) {
        throw new Error(
          "Missing session parameters, start a new session with 'connect()' and try again."
        );
      }

      const url = `${this.serverUrl}/api/checkStatus/`;
      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        "Origin-Type": this.originType
      };

      const body = {
        orderId: orderId
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
        throw new Error(JSON.parse(await response.text()).error);
      }

      const text = await response.text();
      const json = await this.#decryptAesCtr(text, this.aesKey, "JSON");
      return json;
    } catch (error) {
      throw new Error(
        `Status check failed: ${error.message || error.toString()}`
      );
    }
  }

  /**
   * Get job results
   * @param {String} orderId Unique base64 identifier for the order.
   * @param {String} format Base64 AES key
   * @param {String} dataType Type of data to be returned (defaults to "raw")
   * @returns Result data in specified format
   */
  async getResults({ orderId, format, dataType = "raw" }) {
    try {
      if (!orderId || !format || !dataType) {
        throw new Error("Parameter is missing");
      }

      if (!this.connectionId || !this.aesKey) {
        throw new Error(
          "Missing session parameters, start a new session with 'connect()' and try again."
        );
      }

      const url = `${this.serverUrl}/api/getResults/`;
      const headers = {
        "Content-Type": "text/plain",
        "Connection-Id": this.connectionId,
        "Origin-Type": this.originType
      };

      // Make format and dataType case insensative
      format = String(format).toLowerCase();
      dataType = String(dataType).toLowerCase();

      const validFormats = ["txt", "xml", "json", "png"];

      // Check for invalid format
      if (!validFormats.includes(format)) {
        throw new Error(`Invalid format`);
      }

      const body = {
        orderId: orderId,
        format: format
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
        throw new Error(JSON.parse(await response.text()).error);
      }

      // Get raw response data
      const text = await response.text();

      // Decrpyt raw data
      let rawData;
      switch (format) {
        case "txt":
        case "json":
        case "xml":
          rawData = await this.#decryptAesCtr(text, this.aesKey, "string");
          break;
        case "png":
          rawData = await this.#decryptAesCtr(text, this.aesKey, "Uint8Array");
          break;
      }

      // Generate correct output format
      if (dataType === "raw") {
        return rawData;
      } else if (dataType === "blob") {
        switch (format) {
          case "txt":
            return new Blob([rawData], { type: "text/plain" });
          case "json":
            return new Blob([rawData], { type: "application/json" });
          case "xml":
            return new Blob([rawData], { type: "application/xml" });
          case "png":
            return new Blob([rawData], { type: "image/png" });
        }
      } else {
        throw new Error("Invalid data type.");
      }
    } catch (error) {
      throw new Error(
        `Result retrieval failed: ${error.message || error.toString()}`
      );
    }
  }
}

window.Neuropacs = Neuropacs;
