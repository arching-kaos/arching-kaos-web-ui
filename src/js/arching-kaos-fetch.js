// Arching Kaos Fetch
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { archingKaosLog } from "./arching-kaos-log.js";
import { httpProgressPlaceholder, progressPlaceholder } from "./app.js";
import { debugLog } from "./utils.js";

export function archingKaosFetchJSON( url, callback, params ){
    const request = new XMLHttpRequest();
    request.addEventListener("load", ()=>{
        var json = JSON.parse(request.response);
        if(request.status !== 404){
            callback(json, params);
        } else {
            archingKaosLog(`ERROR ${request.status} while loading ${url}`);
        }
    });
    request.addEventListener("error", ()=>{
        debugLog("An error occured.");
    });
    request.addEventListener("progress", (event)=>{
        if (event.lengthComputable && progressPlaceholder()){
            httpProgressPlaceholder().value = (event.loaded / event.total) * 100;
        } else {
            httpProgressPlaceholder().value = 0;
            debugLog("Supposingly zeroed progressPlaceholder");
        }
    });
    request.addEventListener("abort", ()=>{
        debugLog("Request aborted.");
    });
    request.open("GET", url);
    request.send();

}

export async function archingKaosFetchText( url, callback, params ){
    const request = new XMLHttpRequest();
    request.addEventListener("load", ()=>{
        var text = request.response;
        if(request.status !== 404){
            callback(text, params);
        } else {
            archingKaosLog(`ERROR ${request.status} while loading ${url}`);
        }
    });
    request.addEventListener("error", ()=>{
        debugLog("An error occured.");
    });
    request.addEventListener("progress", (event)=>{
        if (event.lengthComputable && progressPlaceholder()){
            httpProgressPlaceholder().value = (event.loaded / event.total) * 100;
        } else {
            httpProgressPlaceholder.value = 0;
            debugLog("Supposingly zeroed progressPlaceholder");
        }
    });
    request.addEventListener("abort", ()=>{
        debugLog("Request aborted.");
    });
    request.open("GET", url);
    request.send();
}
// @license-end
