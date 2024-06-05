//prettier-ignore
/*!
 * NeuroPACS v1.1.3
 * (c) 2024 Kerrick Cavanaugh
 * Released under the MIT License.
 */
class Neuropacs{constructor(t,e,r="api"){this.apiKey=e,this.serverUrl=t,this.aesKey=this.#t(),this.orderId="",this.client=r,this.connectionId=""}static init(t,e,r="api"){return new Neuropacs(t,e,r)}#e=()=>{try{return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}catch(t){throw new Error(`UUID generation failed: ${t.message||t}`)}};#r=t=>new Promise(((e,r)=>{const a=document.createElement("script");a.src=t,a.async=!0,a.onload=()=>{e()},a.onerror=()=>{r(new Error("Script failed to load."))},document.head.appendChild(a)}));#t=()=>{try{const t=new Uint8Array(16);window.crypto.getRandomValues(t);return btoa(String.fromCharCode.apply(null,t))}catch(t){throw new Error(`AES key generation failed: ${t.message||t}`)}};#a=async t=>{try{t="string"==typeof t?t:JSON.stringify(t)}catch(t){throw new RangeError("Plaintext must be a string or JSON.")}try{const e=await this.#n(),r="-----BEGIN PUBLIC KEY-----",a="-----END PUBLIC KEY-----",n=e.substring(r.length,e.length-a.length-1),s=window.atob(n),i=this.#s(s),o=await crypto.subtle.importKey("spki",i,{name:"RSA-OAEP",hash:"SHA-256"},!0,["encrypt"]),c=await crypto.subtle.encrypt({name:"RSA-OAEP"},o,(new TextEncoder).encode(t));return this.#i(c)}catch(t){throw new Error(`OAEP encryption failed: ${t.message||t}`)}};#n=async()=>{try{const t=await fetch(`${this.serverUrl}/api/getPubKey/`);if(!t.ok)throw new Error(JSON.parse(await t.text()).error);const e=await t.json();return e.pub_key}catch(t){throw new Error(`Retrieval of public key failed: ${t.message||t}`)}};#s=t=>{try{const e=new ArrayBuffer(t.length),r=new Uint8Array(e);for(let e=0,a=t.length;e<a;e++)r[e]=t.charCodeAt(e);return e}catch(t){throw new Error(`String to array buffer conversion failed: ${t.message||t}`)}};#i=t=>{try{const e=new Uint8Array(t);return btoa(String.fromCharCode.apply(null,e))}catch(t){throw new Error(`Array buffer to base64 conversion failed: ${t.message||t}`)}};#o=()=>{const t=new Date;return`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")} ${String(t.getUTCHours()).padStart(2,"0")}:${String(t.getUTCMinutes()).padStart(2,"0")}:${String(t.getUTCSeconds()).padStart(2,"0")} UTC`};#c=(t,e)=>{try{const r=[];let a=0;for(;a<t.size;){const n=Math.min(a+e,t.size);r.push(t.slice(a,n)),a=n}return r}catch(t){throw new Error(`Partitioning blob failed: ${t.message||t}`)}};#l=(t,e)=>{if(e<=0)throw new Error("Chunk size must be greater than 0");const r=[];for(let a=0;a<t.length;a+=e){const n=t.slice(a,a+e);r.push(n)}return r};#h=async(t,e)=>{try{const r=e-t.length%e,a=new Uint8Array(t.length+r);return a.set(t),a}catch(t){throw new Error(`AES padding failed : ${t.message||t}`)}};#d=async(t,e,r,a)=>{let n;if("string"==r&&"string"==typeof t)n=(new TextEncoder).encode(t);else if("JSON"==r){const e=JSON.stringify(t);n=(new TextEncoder).encode(e)}else{if(!("Uint8Array"==r&&t instanceof Uint8Array))throw new Error("Invalid plaintext format!");n=t}try{const t=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),r=await this.#h(n,16),s=crypto.getRandomValues(new Uint8Array(16)),i=await crypto.subtle.importKey("raw",t,{name:"AES-CTR"},!1,["encrypt"]),o=await crypto.subtle.encrypt({name:"AES-CTR",counter:s,length:128},i,r),c=new Uint8Array(s.length+o.byteLength);if(c.set(s),c.set(new Uint8Array(o),s.length),"string"===a)return btoa(String.fromCharCode.apply(null,c));if("bytes"===a)return c;throw new Error("Invalid output format")}catch(t){throw new Error(`AES encrption failed: ${t.message||t}`)}};#p=async(t,e,r)=>{try{const a=new Uint8Array(atob(e).split("").map((t=>t.charCodeAt(0)))),n=new Uint8Array(atob(t).split("").map((t=>t.charCodeAt(0)))),s=n.slice(0,16),i=n.slice(16),o=await crypto.subtle.importKey("raw",a,{name:"AES-CTR"},!1,["decrypt"]),c=await crypto.subtle.decrypt({name:"AES-CTR",counter:s,length:128},o,i);let l=(new TextDecoder).decode(c);if("JSON"===r)return l=l.trim(),JSON.parse(l);if("string"===r)return l;throw new Error("Invalid output format")}catch(t){throw new Error(`AES decryption failed: ${t.message||t}`)}};#w=async(t,e,r)=>{try{const a=`${this.serverUrl}/api/multipartUploadRequest/`,n=await this.#d(r,this.aesKey,"string","string"),s={datasetId:t,zipIndex:e},i=await this.#d(s,this.aesKey,"JSON","string"),o={"Content-Type":"text/plain","Connection-Id":this.connectionId,"Order-Id":n,Client:this.client},c=await fetch(a,{method:"POST",body:i,headers:o});if(!c.ok){throw{neuropacsError:`${JSON.parse(await c.text()).error}`}}const l=await c.text();return(await this.#p(l,this.aesKey,"JSON")).uploadId}catch(t){throw new Error(`Multipart upload initialization failed: ${t.message||t}`)}};#y=async(t,e,r,a,n)=>{try{const s=`${this.serverUrl}/api/completeMultipartUpload/`,i={"Content-Type":"text/plain","Order-Id":await this.#d(t,this.aesKey,"string","string"),"Connection-Id":this.connectionId,Client:this.client},o={datasetId:e,uploadId:a,uploadParts:n,zipIndex:r},c=await this.#d(o,this.aesKey,"JSON","string"),l=await fetch(s,{method:"POST",headers:i,body:c});if(!l.ok)throw new Error(JSON.parse(await l.text()).error);return 200}catch(t){throw new Error(`Multipart upload completion failed: ${t.message||t}`)}};#u=async(t,e,r,a,n,s)=>{try{const i=await this.#d(a,this.aesKey,"string","string"),o={"Content-Type":"text/plain","connection-id":this.connectionId,"Order-Id":i,client:this.client},c={datasetId:e,uploadId:t,partNumber:n,zipIndex:r},l=await this.#d(c,this.aesKey,"JSON","string"),h=await fetch(`${this.serverUrl}/api/multipartPresignedUrl/`,{method:"POST",headers:o,body:l});if(!h.ok)throw new Error(JSON.parse(await h.text()).error);const d=await h.text(),p=(await this.#p(d,this.aesKey,"JSON")).presignedURL;let w=!1,y="";for(let t=0;t<3;t++){const t=await fetch(p,{method:"PUT",body:s});if(t.ok){return t.headers.get("ETag")}w=!0,y=await t.text()}if(w)throw new Error("Upload failed after 3 attempts")}catch(t){throw new Error(`Upload part failed: ${error.message||error}`)}};#g=async(t,e=null,r=null,a=null)=>{try{if(!t instanceof FileList)throw new Error("Dataset must be an array of files");null==e&&(e=this.orderId),null==r&&(r=this.#e()),await this.#r("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");const n={},s=25e7;let i=0,o=0,c=0;for(let e=0;e<t.length;e++){if(!t[e]instanceof File)throw new Error("Not a file");if(o+=t[e].size,n[c]||(n[c]=[],i++),n[c].push(t[e]),o>=s&&(c++,o=0),a){const n=parseFloat(((e+1)/t.length*100).toFixed(2));a({datasetId:r,progress:100==n?100:n,status:"Preprocessing"})}}let l=[];for(const[s,o]of Object.entries(n)){let n=new JSZip;const c=await this.#w(r,s,e);for(let t=0;t<o.length;t++)if(l.push(o[t].name),n.file(o[t].name,o[t],{binary:!0}),await new Promise((t=>setTimeout(t,0))),a){const e=parseFloat(((t+1)/o.length*100).toFixed(2));a({datasetId:r,progress:100==e?100:e,status:`Compressing part ${parseInt(s)+1}/${i}`})}const h=await n.generateAsync({type:"blob"}),d=5242880,p=this.#c(h,d),w=[];for(let t=0;t<p.length;t++){const n=await this.#u(c,r,s,e,t+1,p[t]);if(w.push({PartNumber:t+1,ETag:n}),a){const e=parseFloat(((t+1)/p.length*100).toFixed(2));a({datasetId:r,progress:100==e?100:e,status:`Uploading part ${parseInt(s)+1}/${i}`})}}if(await this.#y(e,r,s,c,w),a){const e=parseFloat((o.length/t.length*100).toFixed(2));a({datasetId:r,progress:100==e?100:e,status:`Uploading part ${parseInt(s)+1}/${i}`})}}return 201}catch(t){throw new Error(`Dataset upload attempt failed: ${t.message||t}`)}};async connect(){try{const t={"Content-Type":"text/plain",Client:this.client},e={aes_key:this.aesKey,api_key:this.apiKey},r=await this.#a(e),a=await fetch(`${this.serverUrl}/api/connect/`,{method:"POST",headers:t,body:r});if(!a.ok)throw new Error(JSON.parse(await a.text()).error);const n=(await a.json()).connectionID;return this.connectionId=n,{timestamp:this.#o(),connectionId:n,aesKey:this.aesKey}}catch(t){throw new Error(`Connection creation failed: ${t.message||t}`)}}async newJob(){try{const t=`${this.serverUrl}/api/newJob/`,e={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client},r=await fetch(t,{method:"POST",headers:e});if(!r.ok)throw new Error(JSON.parse(await r.text()).error);const a=await r.text(),n=await this.#p(a,this.aesKey,"string");return this.orderId=n,n}catch(t){throw new Error(`Job creation failed: ${t.message||t}`)}}async uploadDataset(t,e=null,r=null,a=null){try{return await this.#g(t,e,r,a),{datasetId:r,state:"success"}}catch(t){throw new Error(`Dataset upload failed: ${t.message||t}`)}}async validateUpload(t,e,r=null,a=null,n){try{null==r&&(r=this.orderId),null==a&&(a=this.connectionId);const s=[];for(let e=0;e<t.length;e++)s.push({name:t[e].name,size:t[e].size});const i=await this.#d(r,this.aesKey,"string","string"),o=this.#l(s,100);if(n){const r=parseFloat((0/t.length*100).toFixed(2));n({datasetId:e,progress:100==r?100:r,status:"Validating"})}const c=`${this.serverUrl}/api/verifyUpload/`,l={"Content-Type":"text/plain","Dataset-Id":e,"Order-Id":i,"Connection-Id":this.connectionId,Client:this.client};let h=0,d=[];for(let r=0;r<o.length;r++){const a={fileMetadata:o[r]},s=await this.#d(a,this.aesKey,"JSON","string"),i=await fetch(c,{method:"POST",headers:l,body:s});if(!i.ok)throw new Error(JSON.parse(await i.text()).error);const p=await i.text(),w=await this.#p(p,this.aesKey,"JSON");if(d=d.concat(w.missingFiles),h+=o[r].length,n){const r=parseFloat((h/t.length*100).toFixed(2));n({datasetId:e,progress:100==r?100:r,status:"Validating"})}}return{missingFiles:d}}catch(t){throw new Error(`Upload validation failed: ${t.message||t}`)}}async runJob(t,e=null,r=null){null==e&&(e=this.orderId);try{const a=`${this.serverUrl}/api/runJob/`,n={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client},s={orderID:e,productID:t,datasetID:r},i=await this.#d(s,this.aesKey,"JSON","string"),o=await fetch(a,{method:"POST",headers:n,body:i});if(!o.ok)throw new Error(JSON.parse(await o.text()).error);return o.status}catch(t){throw new Error(`Job run failed: ${t.message||t}`)}}async checkStatus(t=null,e=null){try{null==t&&(t=this.orderId);const r=`${this.serverUrl}/api/checkStatus/`,a={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client},n={orderID:t,datasetID:e},s=await this.#d(n,this.aesKey,"JSON","string"),i=await fetch(r,{method:"POST",headers:a,body:s});if(!i.ok)throw new Error(JSON.parse(await i.text()).error);const o=await i.text();return await this.#p(o,this.aesKey,"JSON")}catch(t){throw new Error(`Check job status failed: ${t.message||t}`)}}async getResults(t,e=null,r=null){try{null==e&&(e=this.orderId);const a=`${this.serverUrl}/api/getResults/`,n={"Content-Type":"text/plain","Connection-Id":this.connectionId,Client:this.client};if(!["TXT","XML","JSON"].includes(t))throw{neuropacsError:'Invalid format! Valid formats include: "TXT", "JSON", "XML"'};const s={orderID:e,format:t,datasetID:r},i=await this.#d(s,this.aesKey,"JSON","string"),o=await fetch(a,{method:"POST",headers:n,body:i});if(!o.ok)throw new Error(JSON.parse(await o.text()).error);const c=await o.text();return await this.#p(c,this.aesKey,"string")}catch(t){throw new Error(`Check job status failed: ${t.message||t}`)}}}
module.exports = Neuropacs;