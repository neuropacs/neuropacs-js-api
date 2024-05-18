//prettier-ignore
/*!
 * NeuroPACS v1.1.0
 * (c) 2024 Kerrick Cavanaugh
 * Released under the MIT License.
 */
class Neuropacs{constructor(t,e,r="api"){this.apiKey=e,this.serverUrl=t,this.aesKey=this.#t(),this.orderId="",this.client=r,this.connectionId=""}static init(t,e,r="api"){return new Neuropacs(t,e,r)}#e=()=>Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);#r=t=>new Promise(((e,r)=>{const a=document.createElement("script");a.src=t,a.async=!0,a.onload=()=>{e()},a.onerror=()=>{r(new Error(`Script failed to load from ${t}`))},document.head.appendChild(a)}));#t=()=>{const t=new Uint8Array(16);window.crypto.getRandomValues(t);return btoa(String.fromCharCode.apply(null,t))};#a=async t=>{try{t="string"==typeof t?t:JSON.stringify(t)}catch(t){throw{neuropacsError:"Plaintext must be a string or JSON!"}}const e=await this.#n(),r=e.substring(26,e.length-24-1),a=window.atob(r),n=this.#i(a),i=await crypto.subtle.importKey("spki",n,{name:"RSA-OAEP",hash:"SHA-256"},!0,["encrypt"]),s=await crypto.subtle.encrypt({name:"RSA-OAEP"},i,(new TextEncoder).encode(t));return this.#s(s)};#n=async()=>{try{const t=await fetch(`${this.serverUrl}/api/getPubKey/`);if(!t.ok)throw{neuropacsError:`${await t.text()}`};const e=await t.json();return e.pub_key}catch(t){throw t.neuropacsError?new Error(t.neuropacsError):new Error("Failed to retrieve the public key.")}};#o=async(t,e,r,a,n,i)=>new Promise(((s,o)=>{let c=0;const l=setInterval((async()=>{const a=(await this.validateUpload(t,e,r,this.connectionId)).missingFiles;c>=n?(clearInterval(l),s({datasetId:e,validation:"Failed, please reupload the missing files",missingFiles:a})):(0==a.length&&(clearInterval(l),s({datasetId:e,validation:"Success"})),c++,i({datasetId:e,progress:parseFloat((c/n*100).toFixed(2)),status:"Validating"}))}),a)}));#i=t=>{const e=new ArrayBuffer(t.length),r=new Uint8Array(e);for(let e=0,a=t.length;e<a;e++)r[e]=t.charCodeAt(e);return e};#s=t=>{const e=new Uint8Array(t);return btoa(String.fromCharCode.apply(null,e))};#c=()=>{const t=new Date;return`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")} ${String(t.getUTCHours()).padStart(2,"0")}:${String(t.getUTCMinutes()).padStart(2,"0")}:${String(t.getUTCSeconds()).padStart(2,"0")} UTC`};#l=(t,e)=>{const r=[];let a=0;for(;a<t.size;){const n=Math.min(a+e,t.size);r.push(t.slice(a,n)),a=n}return r};#d=async(t,e)=>{const r=e-t.length%e,a=new Uint8Array(t.length+r);return a.set(t),a};#h=async(t,e,r,a)=>{let n;try{if("string"==r&&"string"==typeof t)n=(new TextEncoder).encode(t);else if("JSON"==r){const e=JSON.stringify(t);n=(new TextEncoder).encode(e)}else{if(!("Uint8Array"==r&&t instanceof Uint8Array))throw new Error("Invalid plaintext format!");n=t}}catch(t){throw t?new Error(t):new Error("Plaintext decoding failed!")}try{const t=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),r=await this.#d(n,16),i=crypto.getRandomValues(new Uint8Array(16)),s=await crypto.subtle.importKey("raw",t,{name:"AES-CTR"},!1,["encrypt"]),o=await crypto.subtle.encrypt({name:"AES-CTR",counter:i,length:128},s,r),c=new Uint8Array(i.length+o.byteLength);if(c.set(i),c.set(new Uint8Array(o),i.length),"string"===a)return btoa(String.fromCharCode.apply(null,c));if("bytes"===a)return c}catch(t){throw t?new Error(t):new Error("AES encryption failed!")}};#p=async(t,e,r)=>{try{const a=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),n=new Uint8Array(atob(t).split("").map((t=>t.charCodeAt(0)))),i=n.slice(0,16),s=n.slice(16),o=await crypto.subtle.importKey("raw",a,{name:"AES-CTR"},!1,["decrypt"]),c=await crypto.subtle.decrypt({name:"AES-CTR",counter:i,length:128},o,s);let l=(new TextDecoder).decode(c);if("JSON"===r)return l=l.trim(),JSON.parse(l);if("string"===r)return l}catch(t){throw t?new Error(t):new Error("AES decryption failed!")}};#u=async(t,e)=>{const r=`${this.serverUrl}/api/multipartUploadRequest/`,a=await this.#h(e,this.aesKey,"string","string"),n={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Order-Id":a,Client:this.client,"Dataset-Id":t},i=await fetch(r,{method:"GET",headers:n});if(!i.ok){throw{neuropacsError:`${JSON.parse(await i.text()).error}`}}const s=await i.text();return(await this.#p(s,this.aesKey,"JSON")).uploadId};#y=async(t,e,r,a)=>{const n=`${this.serverUrl}/api/completeMultipartUpload/`,i={"Content-Type":"text/plain","Order-Id":await this.#h(t,this.aesKey,"string","string"),"Connection-Id":this.connectionId,Client:this.client},s={datasetId:e,uploadId:r,uploadParts:a},o=await this.#h(s,this.aesKey,"JSON","string"),c=await fetch(n,{method:"POST",headers:i,body:o});if(!c.ok){throw{neuropacsError:`${JSON.parse(await c.text()).error}`}}return 200};#w=async(t,e,r,a,n)=>{const i=await this.#h(r,this.aesKey,"string","string"),s={"Content-Type":"text/plain","connection-id":this.connectionId,"Order-Id":i,client:this.client},o={datasetId:e,uploadId:t,partNumber:a},c=await this.#h(o,this.aesKey,"JSON","string"),l=await fetch(`${this.serverUrl}/api/multipartPresignedUrl/`,{method:"POST",headers:s,body:c});if(!l.ok){throw{neuropacsError:`${JSON.parse(await l.text()).error}`}}const d=await l.text(),h=(await this.#p(d,this.aesKey,"JSON")).presignedURL;let p=!1,u="";for(let t=0;t<3;t++){const t=await fetch(h,{method:"PUT",body:n});if(t.ok){return t.headers.get("ETag")}p=!0,u=await t.text()}if(p)throw{neuropacsError:`${u}`}};async connect(){const t={"Content-Type":"text/plain",Client:this.client},e={aes_key:this.aesKey,api_key:this.apiKey};try{const r=await this.#a(e),a=await fetch(`${this.serverUrl}/api/connect/`,{method:"POST",headers:t,body:r});if(!a.ok){throw{neuropacsError:`${JSON.parse(await a.text()).error}`}}const n=(await a.json()).connectionID;return this.connectionId=n,{timestamp:this.#c(),connectionId:n,aesKey:this.aesKey}}catch(t){throw t.neuropacsError?new Error(t.neuropacsError):new Error("Connection failed!")}}async newJob(){try{const t=`${this.serverUrl}/api/newJob/`,e={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client},r=await fetch(t,{method:"POST",headers:e});if(!r.ok){throw{neuropacsError:`${JSON.parse(await r.text()).error}`}}const a=await r.text(),n=await this.#p(a,this.aesKey,"string");return this.orderId=n,n}catch(t){throw t.neuropacsError?new Error(t.neuropacsError):new Error("Job creation failed!")}}async uploadDataset(t,e=null,r=null,a=null){null==e&&(e=this.orderId),null==r&&(r=this.#e()),await this.#r("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");const n=await this.#u(r,e),i=[];let s=new JSZip;for(let e=0;e<t.length;e++)if(i.push(t[e].name),s.file(t[e].name,t[e],{binary:!0}),await new Promise((t=>setTimeout(t,0))),a){const n=parseFloat(((e+1)/t.length*100).toFixed(2));a({datasetId:r,progress:100==n?100:n,status:"Compressing"})}const o=await s.generateAsync({type:"blob"}),c=this.#l(o,5242880),l=[];for(let t=0;t<c.length;t++){const i=await this.#w(n,r,e,t+1,c[t]);if(l.push({PartNumber:t+1,ETag:i}),a){const e=parseFloat(((t+1)/c.length*100).toFixed(2));a({datasetId:r,progress:100==e?100:e,status:"Uploading"})}}await this.#y(e,r,n,l),a&&a({datasetId:r,progress:0,status:"Validating"});return await this.#o(i,r,e,5e3,20,a)}async validateUpload(t,e,r=null,a=null){null==r&&(r=this.orderId),null==a&&(a=this.connectionId);try{const a=await this.#h(r,this.aesKey,"string","string"),n=`${this.serverUrl}/api/verifyUpload/`,i={"Content-Type":"text/plain","Dataset-Id":e,"Order-Id":a,"Connection-Id":this.connectionId,Client:this.client},s={fileArray:t},o=await this.#h(s,this.aesKey,"JSON","string"),c=await fetch(n,{method:"POST",headers:i,body:o});if(!c.ok){throw{neuropacsError:`${JSON.parse(await c.text()).error}`}}const l=await c.text();return await this.#p(l,this.aesKey,"JSON")}catch(t){throw t.neuropacsError?new Error(t.neuropacsError):new Error("Dataset validation failed!")}}async runJob(t,e=null,r=null){null==e&&(e=this.orderId);try{const a=`${this.serverUrl}/api/runJob/`,n={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client},i={orderID:e,productID:t,datasetID:r},s=await this.#h(i,this.aesKey,"JSON","string"),o=await fetch(a,{method:"POST",headers:n,body:s});if(!o.ok){throw{neuropacsError:`${JSON.parse(await o.text()).error}`}}return o.status}catch(t){throw t.neuropacsError?new Error(t.neuropacsError):new Error("Job run failed!")}}async checkStatus(t=null,e=null){null==t&&(t=this.orderId);try{const r=`${this.serverUrl}/api/checkStatus/`,a={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client},n={orderID:t,datasetID:e},i=await this.#h(n,this.aesKey,"JSON","string"),s=await fetch(r,{method:"POST",headers:a,body:i});if(!s.ok){throw{neuropacsError:`${JSON.parse(await s.text()).error}`}}const o=await s.text();return await this.#p(o,this.aesKey,"JSON")}catch(t){throw t.neuropacsError?new Error(t.neuropacsError):new Error("Status check failed.")}}async getResults(t,e=null,r=null){null==e&&(e=this.orderId);try{const a=`${this.serverUrl}/api/getResults/`,n={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client};if(!["TXT","XML","JSON"].includes(t))throw{neuropacsError:'Invalid format! Valid formats include: "TXT", "JSON", "XML"'};const i={orderID:e,format:t,datasetID:r},s=await this.#h(i,this.aesKey,"JSON","string"),o=await fetch(a,{method:"POST",headers:n,body:s});if(!o.ok){throw{neuropacsError:`${JSON.parse(await o.text()).error}`}}const c=await o.text();return await this.#p(c,this.aesKey,"string")}catch(t){throw t.neuropacsError?new Error(t.neuropacsError):new Error("Result retrieval failed!")}}}
module.exports = Neuropacs;
