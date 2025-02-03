[![Integration Tests](https://github.com/neuropacs/neuropacs-js-api/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/neuropacs/neuropacs-js-api/actions/workflows/ci.yaml)
![CodeQL](https://github.com/neuropacs/neuropacs-js-api/actions/workflows/codeql-analysis.yml/badge.svg)

# neuropacs™ JavaScript API

Connect to neuropacs diagnostic capabilities with our JavaScript API.

## Getting Started

### Installation

There are several bundles available:

| Name                | Size | Description                               |
| ------------------- | ---- | ----------------------------------------- |
| neuropacs.js        | 43KB | Unminified version, with debug            |
| neuropacs.min.js    | 15KB | Production version, without debug         |
| neuropacs.module.js | 15KB | Production version, without debug, module |

### Include in project

Option 1: Download neuropacs™ API file locally

- Download prefered bundle for neuropacs
- Include in project
  - Your project strucutre should look something like this:

```
project-root/
|-- src/
| |-- script.py
|-- lib/
| |-- neuropacs.min.js
```

Option 2: Import via CDN

```html
<script src="https://d2g8ya06umhjvk.cloudfront.net/neuropacs.min.js"></script>
```

### Usage

```html
<head>
  <!-- NEUROPACS API -->
  <script src="https://d2g8ya06umhjvk.cloudfront.net/neuropacs.min.js"></script>
</head>
<script>
  async function main() {
    // DEFINE NEUROPACS PARAMS
    const apiKey = "your_api_key";
    const serverUrl = "https://your_neuropacs_url";
    const productName = "PD/MSA/PSP-v1.0";
    const predictionFormat = "XML";
    const predictionDataType = "RAW";
    const originType = "my_application";

    try {
      // INITIALIZE NEUROPACS API
      const npcs = Neuropacs.init({
        serverUrl: serverUrl,
        apiKey: apiKey,
        originType: originType
      });

      // CONNECT TO NEUROPACS
      const connection = await npcs.connect();

      // CREATE A NEW JOB
      const orderId = await npcs.newJob();

      // UPLOAD A DATASET
      const blob1 = new Blob(["DICOM CONTENT"], { type: "application/dicom" });
      const file1 = new File([blob1], "example1.dcm", {
        type: "application/dicom"
      });
      const blob2 = new Blob(["DICOM CONTENT"], { type: "application/dicom" });
      const file2 = new File([blob2], "example2.dcm", {
        type: "application/dicom"
      });
      const blob3 = new Blob(["DICOM CONTENT"], { type: "application/dicom" });
      const file3 = new File([blob3], "example3.dcm", {
        type: "application/dicom"
      });
      const dataset = [file1, file2, file3];

      const datasetID = await npcs.uploadDatasetFromFileArray({
        orderId: orderId,
        fileArray: dataset,
        callback: (info) => {
          console.log(info);
        }
      });

      // START A JOB
      const order = await npcs.runJob({
        orderId: orderId,
        productName: productName
      });

      // CHECK STATUS
      const status = await npcs.checkStatus({
        orderId: orderId
      });

      // GET RESULTS
      // --> Valid format options: JSON, TXT, XML, PNG
      // --> Valid dataType options: RAW, BLOB
      const results = await npcs.getResults({
        orderId: orderId
        format: predictionFormat,
        dataType: predictionDataType,
      });
    } catch (e) {
      console.log(e);
    }
  }
  main();
</script>
```

### Generate API Key Usage Report

```html
<head>
  <!-- NEUROPACS API -->
  <script src="https://d2g8ya06umhjvk.cloudfront.net/neuropacs.min.js"></script>
</head>
<script>
  async function main() {
    // DEFINE NEUROPACS PARAMS
    const apiKey = "your_api_key";
    const serverUrl = "https://your_neuropacs_url";
    const originType = "my_application";
    const format = "JSON"; // Valid options include "txt", "json", and "email"
    const startDate = "10/1/2024"; // Must be in mM/dD/YYYY format
    const endDate = "12/1/2025"; // Must be in mM/dD/YYYY format

    try {
      // INITIALIZE NEUROPACS API
      const npcs = Neuropacs.init({
        serverUrl: serverUrl,
        apiKey: apiKey,
        originType: originType
      });

      // CONNECT TO NEUROPACS
      const connection = await npcs.connect();

      // GET USAGE REPORT
      // --> If 'email' format used, an email will be sent to the admin user associated with the specified key.
      const report = await npcs.getReport({
        format: format,
        startDate: startDate,
        endDate: endDate
      });
    } catch (e) {
      console.log(e);
    }
  main();
</script>
```

### DICOMweb WADO-RS Integration

```html
<head>
  <!-- NEUROPACS API -->
  <script src="https://d2g8ya06umhjvk.cloudfront.net/neuropacs.min.js"></script>
</head>
<script>
  async function main() {
    // DEFINE NEUROPACS PARAMS
    const apiKey = "your_api_key";
    const serverUrl = "https://your_neuropacs_url";
    const originType = "my_application";
    const wadoUrl = "http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs";
    const studyUid = "1.3.12.2.1107.5.2.32.35162.30000022041820573832300000043";

    try {
      // INITIALIZE NEUROPACS API
      const npcs = Neuropacs.init({
        serverUrl: serverUrl,
        apiKey: apiKey,
        originType: originType
      });

      // CONNECT TO NEUROPACS
      const connection = await npcs.connect();

      // START A JOB
      const orderId = await npcs.runJob({
        orderId: orderId,
        productName: productName
      });

      // UPLOAD DATASET WITH DICOM WEB WADO-RS
      const upload = uploadDatasetFromDicomWeb({
          orderId: orderId,
          wadoUrl: wadoUrl,
          studyUid: studyUid,
          username = null,
          password = null,
          callback = null
        })
    } catch (e) {
      console.log(e);
    }
  main();
</script>
```

## Authors

Kerrick Cavanaugh - kerrick@neuropacs.com

## Version History

- 1.0
  - Initial Release
- 1.2.0
  - Latest Stable Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
