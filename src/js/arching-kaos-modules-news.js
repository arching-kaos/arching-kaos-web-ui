/* Arching Kaos Module News
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
import { makeElement } from "./arching-kaos-generator.js";
import { archingKaosFetchText } from "./arching-kaos-fetch.js";
import {
    getNicknameAssossiatedWithGPG,
    getFullText,
    getPreviewText
} from "./arching-kaos-tools.js";
import { getIPFSURL } from "./url-generators.js";

export function akModuleNews(zblockIPFSHash, zblockObject, blockObject, json){
    if (!document.querySelector('#news-'+zblockIPFSHash)){
        var newsSectionDivElement = document.querySelector('#news-section');
        var articleContainerElement = {
            element:"article",
            id:`news-${zblockIPFSHash}`,
            innerHTML: [
                { element:"a", innerText : json.title, href : '#news-'+zblockIPFSHash },
                { element:"span", innerText : ' '},
                { element:"a", innerText:'[permalink]', target: '_blank', href:'https://news.arching-kaos.net/?from_zblock='+zblockIPFSHash },
                { element:"p", innerText:`zblock: ${zblockIPFSHash}` },
                { element:"p", innerText:"Published: " + new Date(blockObject.timestamp*1000) },
                { element:"p", innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg) },
                { element:"hr" }
            ]
        };
        makeElement(articleContainerElement, newsSectionDivElement);
        if(json.ipfs){
            archingKaosFetchText(getIPFSURL(json.ipfs), getFullText,[`#news-${zblockIPFSHash}`]);
        }
        if (document.querySelector("#news-sec-not-found")) document.querySelector("#news-sec-not-found").hidden=true;
        makeElement({ element:"hr"}, newsSectionDivElement);
    }
    if (!document.querySelector('#news-preview-'+zblockIPFSHash)){
        var newsSectionDivElement = document.querySelector('.preview');
        var articleContainerElement = {
            element:"article",
            id:`news-preview-${zblockIPFSHash}`,
            innerHTML: [
                { element:"a", innerText : json.title, href : '#news-'+zblockIPFSHash },
                { element:"span", innerText : ' '},
                { element:"a", innerText:'[permalink]', target: '_blank', href:'https://news.arching-kaos.net/?from_zblock='+zblockIPFSHash },
                { element:"p", innerText:"Published: " + new Date(blockObject.timestamp*1000) },
                { element:"p", innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg) },
                { element:"hr" }
            ]
        };
        makeElement(articleContainerElement, newsSectionDivElement);
        if(json.ipfs){
            archingKaosFetchText(getIPFSURL(json.ipfs), getPreviewText, [`#news-preview-${zblockIPFSHash}`]);
        }
        makeElement({ element:"hr"}, newsSectionDivElement);
    }
}
// @license-end
