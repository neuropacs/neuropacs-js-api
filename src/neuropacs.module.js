//prettier-ignore
/*!
 * NeuroPACS v1.1.8
 * (c) 2024 Kerrick Cavanaugh
 * Released under the MIT License.
 */
class Neuropacs{constructor(t,e,r="API"){this.apiKey=e,this.serverUrl=t,this.aesKey=null,this.originType=r,this.connectionId=null,this.maxZipSize=15728640}static init({serverUrl:t,apiKey:e,originType:r="api"}){return new Neuropacs(t,e,r)}#t=()=>{try{return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}catch(t){throw new Error(`UUID generation failed: ${t.message||t.toString()}`)}};#e=t=>new Promise(((e,r)=>{const a=document.createElement("script");a.src=t,a.async=!0,a.onload=()=>{e()},a.onerror=()=>{r(new Error("Script failed to load."))},document.head.appendChild(a)}));#r=()=>{try{const t=new Uint8Array(16);window.crypto.getRandomValues(t);return btoa(String.fromCharCode.apply(null,t))}catch(t){throw new Error(`AES key generation failed: ${t.message||t.toString()}`)}};#a=async t=>{try{t="string"==typeof t?t:JSON.stringify(t)}catch(t){throw new RangeError("Plaintext must be a string or JSON.")}try{const e=await this.#n(),r="-----BEGIN PUBLIC KEY-----",a="-----END PUBLIC KEY-----",n=e.substring(r.length,e.length-a.length-1),i=window.atob(n),o=this.#i(i),s=await crypto.subtle.importKey("spki",o,{name:"RSA-OAEP",hash:"SHA-256"},!0,["encrypt"]),c=await crypto.subtle.encrypt({name:"RSA-OAEP"},s,(new TextEncoder).encode(t));return this.#o(c)}catch(t){throw new Error(`OAEP encryption failed: ${t.message||t.toString()}`)}};#n=async()=>{const t={"Origin-Type":this.originType};try{const e=await fetch(`${this.serverUrl}/api/getPubKey/`,{method:"GET",headers:t});if(!e.ok){if(403==e.status)throw new Error("CORS error.");throw new Error(JSON.parse(await e.text()).error)}const r=await e.json();return r.pub_key}catch(t){throw new Error(`Retrieval of public key failed: ${t.message||t.toString()}`)}};#i=t=>{try{const e=new ArrayBuffer(t.length),r=new Uint8Array(e);for(let e=0,a=t.length;e<a;e++)r[e]=t.charCodeAt(e);return e}catch(t){throw new Error(`String to array buffer conversion failed: ${t.message||t.toString()}`)}};#o=t=>{try{const e=new Uint8Array(t);return btoa(String.fromCharCode.apply(null,e))}catch(t){throw new Error(`Array buffer to base64 conversion failed: ${t.message||t.toString()}`)}};#s=()=>{const t=new Date;return`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")} ${String(t.getUTCHours()).padStart(2,"0")}:${String(t.getUTCMinutes()).padStart(2,"0")}:${String(t.getUTCSeconds()).padStart(2,"0")} UTC`};#c=(t,e)=>{try{const r=[];let a=0;for(;a<t.size;){const n=Math.min(a+e,t.size);r.push(t.slice(a,n)),a=n}return r}catch(t){throw new Error(`Partitioning blob failed: ${t.message||t.toString()}`)}};#p=async(t,e)=>{try{const r=e-t.length%e,a=new Uint8Array(t.length+r);return a.set(t),a}catch(t){throw new Error(`AES padding failed : ${t.message||t.toString()}`)}};#h=async(t,e,r,a)=>{let n;if("string"==r&&"string"==typeof t)n=(new TextEncoder).encode(t);else if("JSON"==r){const e=JSON.stringify(t);n=(new TextEncoder).encode(e)}else{if(!("Uint8Array"==r&&t instanceof Uint8Array))throw new Error("Invalid plaintext format!");n=t}try{const t=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),r=await this.#p(n,16),i=crypto.getRandomValues(new Uint8Array(16)),o=await crypto.subtle.importKey("raw",t,{name:"AES-CTR"},!1,["encrypt"]),s=await crypto.subtle.encrypt({name:"AES-CTR",counter:i,length:128},o,r),c=new Uint8Array(i.length+s.byteLength);if(c.set(i),c.set(new Uint8Array(s),i.length),"string"===a)return btoa(String.fromCharCode.apply(null,c));if("bytes"===a)return c;throw new Error("Invalid output format")}catch(t){throw new Error(`AES encrption failed: ${t.message||t.toString()}`)}};#d=(t,e)=>{let r=!1;e.includes(".")&&(r=!0);const a=r?e.replace(/\.[^/.]+$/,""):e,n=r?e.split(".").pop():"";let i=1,o=e;for(;t.has(o);)o=r?`${a}_${i}.${n}`:`${a}_${i}`,i++;return t.add(o),o};#l=async(t,e,r)=>{try{const a=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),n=new Uint8Array(atob(t).split("").map((t=>t.charCodeAt(0)))),i=n.slice(0,16),o=n.slice(16),s=await crypto.subtle.importKey("raw",a,{name:"AES-CTR"},!1,["decrypt"]),c=await crypto.subtle.decrypt({name:"AES-CTR",counter:i,length:128},s,o);let p=(new TextDecoder).decode(c);if("JSON"===r)return p=p.trim(),JSON.parse(p);if("string"===r)return p;if("Uint8Array"===r)return c;throw new Error("Invalid output format")}catch(t){throw new Error(`AES decryption failed: ${t.message||t.toString()}`)}};#w=async(t,e,r)=>{try{const a=`${this.serverUrl}/api/multipartUploadRequest/`,n={datasetId:t,zipIndex:e,orderId:r},i=await this.#h(n,this.aesKey,"JSON","string"),o={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},s=await fetch(a,{method:"POST",body:i,headers:o});if(!s.ok)throw new Error(JSON.parse(await s.text()).error);const c=await s.text();return(await this.#l(c,this.aesKey,"JSON")).uploadId}catch(t){throw new Error(`Multipart upload initialization failed: ${t.message||t.toString()}`)}};#y=async(t,e,r,a,n)=>{try{const i=`${this.serverUrl}/api/completeMultipartUpload/`,o={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},s={datasetId:e,uploadId:a,uploadParts:n,zipIndex:r,orderId:t},c=await this.#h(s,this.aesKey,"JSON","string"),p=await fetch(i,{method:"POST",headers:o,body:c});if(!p.ok)throw new Error(JSON.parse(await p.text()).error);return 200}catch(t){throw new Error(`Multipart upload completion failed: ${t.message||t.toString()}`)}};#g=async(t,e,r,a,n,i)=>{try{const o={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},s={datasetId:e,uploadId:t,partNumber:n,zipIndex:r,orderId:a},c=await this.#h(s,this.aesKey,"JSON","string"),p=await fetch(`${this.serverUrl}/api/multipartPresignedUrl/`,{method:"POST",headers:o,body:c});if(!p.ok)throw new Error(JSON.parse(await p.text()).error);const h=await p.text(),d=(await this.#l(h,this.aesKey,"JSON")).presignedUrl;let l=!1;for(let t=0;t<3;t++){const t=await fetch(d,{method:"PUT",body:i});if(t.ok){return t.headers.get("ETag")}l=!0,failText=await t.text()}if(l)throw new Error("Upload failed after 3 attempts")}catch(t){throw new Error(`Upload part failed: ${error.message||error.toString()}`)}};async connect(){try{const t={"Content-Type":"text/plain","Origin-Type":this.originType,"X-Api-Key":this.apiKey},e=this.#r();this.aesKey=e;const r={aes_key:e},a=await this.#a(r),n=await fetch(`${this.serverUrl}/api/connect/`,{method:"POST",headers:t,body:a});if(!n.ok)throw new Error(JSON.parse(await n.text()).error);const i=(await n.json()).connectionId;return this.connectionId=i,{timestamp:this.#s(),connectionId:i,aesKey:this.aesKey}}catch(t){throw new Error(`Connection creation failed: ${t.message||t.toString()}`)}}async newJob(){try{if(!this.connectionId||!this.aesKey)throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");const t=`${this.serverUrl}/api/newJob/`,e={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},r=await fetch(t,{method:"GET",headers:e});if(!r.ok)throw new Error(JSON.parse(await r.text()).error);const a=await r.text(),n=await this.#l(a,this.aesKey,"JSON");return this.orderId=n.orderId,n.orderId}catch(t){throw new Error(`Job creation failed: ${t.message||t.toString()}`)}}async uploadDatasetFromFileArray({orderId:t,fileArray:e,callback:r=null}){try{if(!e||!t)throw new Error("Parameter is missing");if(!this.connectionId||!this.aesKey)throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");if(!e instanceof FileList)throw new Error("Dataset must be an array of files");await this.#e("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");const a=new Set;let n,i=0,o=1,s=new JSZip;for(let c=0;c<e.length;c++){if(!e[c]instanceof File)throw new Error("Invalid object in datset");let p=e[c].name;const h=this.#d(a,p);if(n=await s.generateAsync({type:"blob",compression:"STORE"}),n.size>this.maxZipSize){const e=o-1,r=await this.#w(t,String(e),t),a=await this.#g(r,t,String(e),t,o,n);await this.#y(t,t,String(e),r,[{PartNumber:o,ETag:a}]),s=new JSZip,o++}if(s.file(h,e[c],{compression:"STORE",binary:!0}),i++,r){const a=parseFloat((i/e.length*100).toFixed(2));r({orderId:t,progress:parseFloat(a),status:`Uploading file ${i}/${e.length}`})}}if(n.size>0){const e=o-1,r=await this.#w(t,String(e),t),a=await this.#g(r,t,String(e),t,o,n);await this.#y(t,t,String(e),r,[{PartNumber:o,ETag:a}])}return!0}catch(t){throw new Error(`Error uploading study from file array: ${t.message||t.toString()}`)}}async uploadDatasetFromDicomWeb({orderId:t,dicomWebBaseUrl:e,studyUid:r,username:a=null,password:n=null,callback:i=null}){try{if(!t||!e||!r)throw new Error("Parameter is missing");if(!this.connectionId||!this.aesKey)throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");let o;await this.#e("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"),await this.#e("https://unpkg.com/dicomweb-client"),o=a&&n?new DICOMwebClient.api.DICOMwebClient({url:e,username:a,password:n}):new DICOMwebClient.api.DICOMwebClient({url:e}),i&&i({order_id:t,progress:0,status:`Retrieving instances from DICOMweb for study ${r}`});const s=await o.retrieveStudy({studyInstanceUID:r});if(i&&i({order_id:t,progress:100,status:`Retrieving instances from DICOMweb for study ${r}`}),!s||0===s.length)throw new Error(`No instances recieved from DICOMweb for study ${r}`);let c,p=new JSZip;const h=s.length;let d=1;for(let e=0;e<s.length;e++){let r=s[e];const a=this.#t(),n=r;if(c=await p.generateAsync({type:"blob",compression:"STORE"}),c.size>this.maxZipSize){const e=d-1,r=await this.#w(t,String(e),t),a=await this.#g(r,t,String(e),t,d,c);await this.#y(t,t,String(e),r,[{PartNumber:d,ETag:a}]),p=new JSZip,d+=1}if(p.file(a,n,{compression:"STORE",binary:!0}),i){let r=(e+1)/h*100;r=Math.round(100*r)/100,r=100===r?100:r,i({order_id:t,progress:r,status:`Uploaded instance ${e+1}/${s.length}`})}}if(c.size>0){const e=d-1,r=await this.#w(t,String(e),t),a=await this.#g(r,t,String(e),t,d,c);await this.#y(t,t,String(e),r,[{PartNumber:d,ETag:a}])}return!0}catch(t){throw new Error(`Error uploading study from DICOMweb: ${t.message||t.toString()}`)}}async runJob({orderId:t,productName:e}){try{if(!t||!e)throw new Error("Parameter is missing");if(!this.connectionId||!this.aesKey)throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");const r=`${this.serverUrl}/api/runJob/`,a={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},n={orderId:t,productName:e},i=await this.#h(n,this.aesKey,"JSON","string"),o=await fetch(r,{method:"POST",headers:a,body:i});if(!o.ok)throw new Error(JSON.parse(await o.text()).error);return o.status}catch(t){throw new Error(`Job run failed: ${t.message||t.toString()}`)}}async checkStatus({orderId:t}){try{if(!t)throw new Error("Parameter is missing");if(!this.connectionId||!this.aesKey)throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");const e=`${this.serverUrl}/api/checkStatus/`,r={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},a={orderId:t},n=await this.#h(a,this.aesKey,"JSON","string"),i=await fetch(e,{method:"POST",headers:r,body:n});if(!i.ok)throw new Error(JSON.parse(await i.text()).error);const o=await i.text();return await this.#l(o,this.aesKey,"JSON")}catch(t){throw new Error(`Status check failed: ${t.message||t.toString()}`)}}async getResults({orderId:t,format:e,dataType:r="raw"}){try{if(!t||!e||!r)throw new Error("Parameter is missing");if(!this.connectionId||!this.aesKey)throw new Error("Missing session parameters, start a new session with 'connect()' and try again.");const a=`${this.serverUrl}/api/getResults/`,n={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType};e=String(e).toLowerCase(),r=String(r).toLowerCase();if(!["txt","xml","json","png"].includes(e))throw new Error("Invalid format");const i={orderId:t,format:e},o=await this.#h(i,this.aesKey,"JSON","string"),s=await fetch(a,{method:"POST",headers:n,body:o});if(!s.ok)throw new Error(JSON.parse(await s.text()).error);const c=await s.text();let p;switch(e){case"txt":case"json":case"xml":p=await this.#l(c,this.aesKey,"string");break;case"png":p=await this.#l(c,this.aesKey,"Uint8Array")}if("raw"===r)return p;if("blob"!==r)throw new Error("Invalid data type.");switch(e){case"txt":return new Blob([p],{type:"text/plain"});case"json":return new Blob([p],{type:"application/json"});case"xml":return new Blob([p],{type:"application/xml"});case"png":return new Blob([p],{type:"image/png"})}}catch(t){throw new Error(`Result retrieval failed: ${t.message||t.toString()}`)}}}
module.exports = Neuropacs;
