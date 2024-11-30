// Arching Kaos Module Comments
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "./arching-kaos-generator.js";
import {
    getFullText,
    getNicknameAssossiatedWithGPG
} from "./arching-kaos-tools.js";
import { archingKaosFetchText } from "./arching-kaos-fetch.js";
import { getIPFSURL } from "./url-generators.js";

export function akModuleComments(zblockIPFSHash, blockObject, json){
    if (!document.querySelector('#comment-'+zblockIPFSHash)){
        var divs = document.querySelector('#comments-section');
        var art = {
            element:"article",
            id: `comment-${zblockIPFSHash}`,
            innerHTML: [
                {
                    element:"p",
                    innerText:"Published: " + new Date(json.datetime*1000)
                },
                {
                    element:"p",
                    innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg)
                }
            ]
        };
        makeElement(art, divs);
        if(json.ipfs){
            archingKaosFetchText(getIPFSURL(json.ipfs), getFullText, [`#comment-${zblockIPFSHash}`]);
        }
        if (document.querySelector("#comments-sec-not-found")) document.querySelector("#comments-sec-not-found").hidden=true;
        makeElement({element:"hr"}, divs);
    }
}
// @license-end
