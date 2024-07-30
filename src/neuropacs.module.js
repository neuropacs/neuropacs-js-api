//prettier-ignore
/*!
 * NeuroPACS v1.1.6
 * (c) 2024 Kerrick Cavanaugh
 * Released under the MIT License.
 */
class Neuropacs{constructor(t,e,r="API"){this.apiKey=e,this.serverUrl=t,this.aesKey="",this.orderId="",this.originType=r,this.connectionId=""}static init({serverUrl:t,apiKey:e,originType:r="api"}){return new Neuropacs(t,e,r)}#t=()=>{try{return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}catch(t){throw new Error(`UUID generation failed: ${t.message||t.toString()}`)}};#e=t=>new Promise(((e,r)=>{const a=document.createElement("script");a.src=t,a.async=!0,a.onload=()=>{e()},a.onerror=()=>{r(new Error("Script failed to load."))},document.head.appendChild(a)}));#r=()=>{try{const t=new Uint8Array(16);window.crypto.getRandomValues(t);return btoa(String.fromCharCode.apply(null,t))}catch(t){throw new Error(`AES key generation failed: ${t.message||t.toString()}`)}};#a=async t=>{try{t="string"==typeof t?t:JSON.stringify(t)}catch(t){throw new RangeError("Plaintext must be a string or JSON.")}try{const e=await this.#n(),r="-----BEGIN PUBLIC KEY-----",a="-----END PUBLIC KEY-----",n=e.substring(r.length,e.length-a.length-1),i=window.atob(n),o=this.#i(i),s=await crypto.subtle.importKey("spki",o,{name:"RSA-OAEP",hash:"SHA-256"},!0,["encrypt"]),c=await crypto.subtle.encrypt({name:"RSA-OAEP"},s,(new TextEncoder).encode(t));return this.#o(c)}catch(t){throw new Error(`OAEP encryption failed: ${t.message||t.toString()}`)}};#n=async()=>{const t={"Origin-Type":this.originType};try{const e=await fetch(`${this.serverUrl}/api/getPubKey/`,{method:"GET",headers:t});if(!e.ok){if(403==e.status)throw new Error("CORS error.");throw new Error(JSON.parse(await e.text()).error)}const r=await e.json();return r.pub_key}catch(t){throw new Error(`Retrieval of public key failed: ${t.message||t.toString()}`)}};#i=t=>{try{const e=new ArrayBuffer(t.length),r=new Uint8Array(e);for(let e=0,a=t.length;e<a;e++)r[e]=t.charCodeAt(e);return e}catch(t){throw new Error(`String to array buffer conversion failed: ${t.message||t.toString()}`)}};#o=t=>{try{const e=new Uint8Array(t);return btoa(String.fromCharCode.apply(null,e))}catch(t){throw new Error(`Array buffer to base64 conversion failed: ${t.message||t.toString()}`)}};#s=()=>{const t=new Date;return`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")} ${String(t.getUTCHours()).padStart(2,"0")}:${String(t.getUTCMinutes()).padStart(2,"0")}:${String(t.getUTCSeconds()).padStart(2,"0")} UTC`};#c=(t,e)=>{try{const r=[];let a=0;for(;a<t.size;){const n=Math.min(a+e,t.size);r.push(t.slice(a,n)),a=n}return r}catch(t){throw new Error(`Partitioning blob failed: ${t.message||t.toString()}`)}};#p=(t,e)=>{if(e<=0)throw new Error("Chunk size must be greater than 0");const r=[];for(let a=0;a<t.length;a+=e){const n=t.slice(a,a+e);r.push(n)}return r};#l=async(t,e)=>{try{const r=e-t.length%e,a=new Uint8Array(t.length+r);return a.set(t),a}catch(t){throw new Error(`AES padding failed : ${t.message||t.toString()}`)}};#d=async(t,e,r,a)=>{let n;if("string"==r&&"string"==typeof t)n=(new TextEncoder).encode(t);else if("JSON"==r){const e=JSON.stringify(t);n=(new TextEncoder).encode(e)}else{if(!("Uint8Array"==r&&t instanceof Uint8Array))throw new Error("Invalid plaintext format!");n=t}try{const t=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),r=await this.#l(n,16),i=crypto.getRandomValues(new Uint8Array(16)),o=await crypto.subtle.importKey("raw",t,{name:"AES-CTR"},!1,["encrypt"]),s=await crypto.subtle.encrypt({name:"AES-CTR",counter:i,length:128},o,r),c=new Uint8Array(i.length+s.byteLength);if(c.set(i),c.set(new Uint8Array(s),i.length),"string"===a)return btoa(String.fromCharCode.apply(null,c));if("bytes"===a)return c;throw new Error("Invalid output format")}catch(t){throw new Error(`AES encrption failed: ${t.message||t.toString()}`)}};#h=(t,e)=>{let r=!1;e.includes(".")&&(r=!0);const a=r?e.replace(/\.[^/.]+$/,""):e,n=r?e.split(".").pop():"";let i=1,o=e;for(;t.has(o);)o=r?`${a}_${i}.${n}`:`${a}_${i}`,i++;return t.add(o),o};#y=async(t,e,r)=>{try{const a=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),n=new Uint8Array(atob(t).split("").map((t=>t.charCodeAt(0)))),i=n.slice(0,16),o=n.slice(16),s=await crypto.subtle.importKey("raw",a,{name:"AES-CTR"},!1,["decrypt"]),c=await crypto.subtle.decrypt({name:"AES-CTR",counter:i,length:128},s,o);let p=(new TextDecoder).decode(c);if("JSON"===r)return p=p.trim(),JSON.parse(p);if("string"===r)return p;if("Uint8Array"===r)return bytes(p);throw new Error("Invalid output format")}catch(t){throw new Error(`AES decryption failed: ${t.message||t.toString()}`)}};#w=async(t,e,r)=>{try{const a=`${this.serverUrl}/api/multipartUploadRequest/`,n={datasetId:t,zipIndex:e,orderId:r},i=await this.#d(n,this.aesKey,"JSON","string"),o={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},s=await fetch(a,{method:"POST",body:i,headers:o});if(!s.ok)throw new Error(JSON.parse(await s.text()).error);const c=await s.text();return(await this.#y(c,this.aesKey,"JSON")).uploadId}catch(t){throw new Error(`Multipart upload initialization failed: ${t.message||t.toString()}`)}};#g=async(t,e,r,a,n)=>{try{const i=`${this.serverUrl}/api/completeMultipartUpload/`,o={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},s={datasetId:e,uploadId:a,uploadParts:n,zipIndex:r,orderId:t},c=await this.#d(s,this.aesKey,"JSON","string"),p=await fetch(i,{method:"POST",headers:o,body:c});if(!p.ok)throw new Error(JSON.parse(await p.text()).error);return 200}catch(t){throw new Error(`Multipart upload completion failed: ${t.message||t.toString()}`)}};#u=async(t,e,r,a,n,i)=>{try{const o={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},s={datasetId:e,uploadId:t,partNumber:n,zipIndex:r,orderId:a},c=await this.#d(s,this.aesKey,"JSON","string"),p=await fetch(`${this.serverUrl}/api/multipartPresignedUrl/`,{method:"POST",headers:o,body:c});if(!p.ok)throw new Error(JSON.parse(await p.text()).error);const l=await p.text(),d=(await this.#y(l,this.aesKey,"JSON")).presignedUrl;let h=!1;for(let t=0;t<3;t++){const t=await fetch(d,{method:"PUT",body:i});if(t.ok){return t.headers.get("ETag")}h=!0,failText=await t.text()}if(h)throw new Error("Upload failed after 3 attempts")}catch(t){throw new Error(`Upload part failed: ${error.message||error.toString()}`)}};#f=async(t,e=null,r=null,a=null)=>{try{if(!t instanceof FileList)throw new Error("Dataset must be an array of files");null==e&&(e=this.orderId),null==r&&(r=this.#t()),await this.#e("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");const n={},i=5e7;let o=0,s=0,c=0;for(let e=0;e<t.length;e++){if(!t[e]instanceof File)throw new Error("Invalid object in datset.");if(s+=t[e].size,n[c]||(n[c]=[],o++),n[c].push(t[e]),s>=i&&(c++,s=0),a){const n=parseFloat(((e+1)/t.length*100).toFixed(2));a({datasetId:r,progress:100==n?100:n,status:"Preprocessing"})}}const p=new Set;for(const[t,i]of Object.entries(n)){let n=new JSZip;const s=await this.#w(r,t,e);for(let e=0;e<i.length;e++){let s=i[e].name;const c=this.#h(p,s);if(n.file(c,i[e],{binary:!0}),await new Promise((t=>setTimeout(t,0))),a){const n=parseFloat(((e+1)/i.length*100).toFixed(2));a({datasetId:r,progress:parseFloat(100/(2*o)*(2*(parseInt(t)+1-1)+n/100)).toFixed(2),status:`Compressing part ${parseInt(t)+1}/${o}`})}}const c=await n.generateAsync({type:"blob"}),l=5242880,d=this.#c(c,l),h=[];for(let n=0;n<d.length;n++){const i=await this.#u(s,r,t,e,n+1,d[n]);if(h.push({PartNumber:n+1,ETag:i}),a){const e=parseFloat(((n+1)/d.length*100).toFixed(2)),i=parseFloat(100/(2*o)*(2*(parseInt(t)+1-1)+1+e/100)).toFixed(2);a({datasetId:r,progress:100==i?100:i,status:`Uploading part ${parseInt(t)+1}/${o}`})}}await this.#g(e,r,t,s,h)}return 201}catch(t){throw new Error(`Dataset upload attempt failed: ${t.message||t.toString()}`)}};async connect(){try{const t={"Content-Type":"text/plain","Origin-Type":this.originType,"X-Api-Key":this.apiKey},e=this.#r();this.aesKey=e;const r={aes_key:e},a=await this.#a(r),n=await fetch(`${this.serverUrl}/api/connect/`,{method:"POST",headers:t,body:a});if(!n.ok)throw new Error(JSON.parse(await n.text()).error);const i=(await n.json()).connectionId;return this.connectionId=i,{timestamp:this.#s(),connectionId:i,aesKey:this.aesKey}}catch(t){throw new Error(`Connection creation failed: ${t.message||t.toString()}`)}}async newJob(){try{const t=`${this.serverUrl}/api/newJob/`,e={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},r=await fetch(t,{method:"GET",headers:e});if(!r.ok)throw new Error(JSON.parse(await r.text()).error);const a=await r.text(),n=await this.#y(a,this.aesKey,"JSON");return this.orderId=n.orderId,n.orderId}catch(t){throw new Error(`Job creation failed: ${t.message||t.toString()}`)}}async uploadDataset({dataset:t,orderId:e=null,datasetId:r=null,callback:a}){try{return await this.#f(t,e,r,a),{datasetId:r,state:"success"}}catch(t){throw new Error(`Dataset upload failed: ${t.message||t.toString()}`)}}async runJob({productName:t,orderId:e=null}){null==e&&(e=this.orderId);try{const r=`${this.serverUrl}/api/runJob/`,a={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},n={orderId:e,productName:t},i=await this.#d(n,this.aesKey,"JSON","string"),o=await fetch(r,{method:"POST",headers:a,body:i});if(!o.ok)throw new Error(JSON.parse(await o.text()).error);return o.status}catch(t){throw new Error(`Job run failed: ${t.message||t.toString()}`)}}async checkStatus({orderId:t=null}){try{null==t&&(t=this.orderId);const e=`${this.serverUrl}/api/checkStatus/`,r={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType},a={orderId:t},n=await this.#d(a,this.aesKey,"JSON","string"),i=await fetch(e,{method:"POST",headers:r,body:n});if(!i.ok)throw new Error(JSON.parse(await i.text()).error);const o=await i.text();return await this.#y(o,this.aesKey,"JSON")}catch(t){throw new Error(`Status check failed: ${t.message||t.toString()}`)}}async getResults({format:t,orderId:e=null,dataType:r="raw"}){try{null==e&&(e=this.orderId);const a=`${this.serverUrl}/api/getResults/`,n={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Origin-Type":this.originType};t=String(t).toLowerCase();if(!["txt","xml","json","png"].includes(t))throw new Error('Invalid format! Valid formats include: "txt", "json", "xml", "png".');const i={orderId:e,format:t},o=await this.#d(i,this.aesKey,"JSON","string"),s=await fetch(a,{method:"POST",headers:n,body:o});if(!s.ok)throw new Error(JSON.parse(await s.text()).error);const c=await s.text();let p;switch(t){case"txt":case"json":case"xml":p=await this.#y(c,this.aesKey,"string");break;case"png":p=await this.#y(c,this.aesKey,"Uint8Array")}if("raw"===r)return p;if("blob"!==r)throw new Error("Invalid data type.");switch(t){case"TXT":return new Blob([p],{type:"text/plain"});case"JSON":return new Blob([p],{type:"application/json"});case"XML":return new Blob([p],{type:"application/xml"});case"PNG":return new Blob([p],{type:"image/png"})}}catch(t){throw new Error(`Result retrieval failed: ${t.message||t.toString()}`)}}}
module.exports = Neuropacs;
