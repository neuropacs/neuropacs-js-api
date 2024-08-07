[![Integration Tests](https://github.com/neuropacs/neuropacs-js-api/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/neuropacs/neuropacs-js-api/actions/workflows/ci.yaml)

# neuropacs™ JavaScript API

Connect to neuropacs diagnostic capabilities with our JavaScript API.

## Getting Started

### Installation

There are several bundles available:

| Name                | Size | Description                               |
| ------------------- | ---- | ----------------------------------------- |
| neuropacs.js        | 31KB | Unminified version, with debug            |
| neuropacs.min.js    | 11KB | Production version, without debug         |
| neuropacs.module.js | 11KB | Production version, without debug, module |

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
      const blobData1 = new Blob(["Hello, world!"], { type: "text/plain" });
      const file1 = new File([blobData1], "example1.txt", {
        type: "text/plain"
      });
      const blobData2 = new Blob(["Hello, world!"], { type: "text/plain" });
      const file2 = new File([blobData2], "example2.txt", {
        type: "text/plain"
      });
      const blobData3 = new Blob(["Hello, world!"], { type: "text/plain" });
      const file3 = new File([blobData3], "example3.txt", {
        type: "text/plain"
      });
      const dataset = [file1, file2, file3];

      // --> datasetId param is optional (one will be generated for you if you do not specify it). We recommend using the orderId as the datasetId for simplicity
      const datasetID = await npcs.uploadDataset({
        dataset: dataset,
        orderId: orderId,
        datasetId: orderId,
        callback: (info) => {
          console.log(info);
        }
      });

      // START A JOB
      // --> Valid productName options: PD/MSA/PSP-v1.0
      const order = await npcs.runJob({
        productName: productName,
        orderId: orderId
      });

      // CHECK STATUS
      const status = await npcs.checkStatus({
        orderId: orderId
      });

      // GET RESULTS
      // --> Valid format options: JSON, TXT, XML, PNG
      // --> Valid dataType options: RAW, BLOB
      const results = await npcs.getResults({
        format: predictionFormat,
        dataType: predictionDataType,
        orderId: orderId
      });
    } catch (e) {
      console.log(e);
    }
  }
  main();
</script>
```

## Authors

Kerrick Cavanaugh - kerrick@neuropacs.com

## Version History

- 1.0
  - Initial Release

## License

s
This project is licensed under the MIT License - see the LICENSE.md file for details
