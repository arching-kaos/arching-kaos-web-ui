// Arching Kaos Module Markdown
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "./arching-kaos-generator.js";
import { archingKaosFetchText } from "./arching-kaos-fetch.js";
import {
    getNicknameAssossiatedWithGPG,
    getFullText,
    getPreviewText
} from "./arching-kaos-tools.js";
import { getIPFSURL } from "./url-generators.js";

export function akModuleMarkdown(zblockIPFSHash, zblockObject, blockObject, json){
    if (!document.querySelector('#markdown-'+zblockIPFSHash)){
        var markdownSectionDivElement = document.querySelector('#markdown-section');
        var articleContainerElement = {
            element:"article",
            id:`markdown-${zblockIPFSHash}`,
            innerHTML: [
                { element:"a", innerText : json.title, href : '#markdown-'+zblockIPFSHash },
                { element:"span", innerText : ' '},
                { element:"a", innerText:'[permalink]', target: '_blank', href:'https://news.arching-kaos.net/?from_zblock='+zblockIPFSHash },
                { element:"p", innerText:`zblock: ${zblockIPFSHash}` },
                { element:"p", innerText:"Published: " + new Date(blockObject.timestamp*1000) },
                { element:"p", innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg) },
                { element:"hr" }
            ]
        };
        makeElement(articleContainerElement, markdownSectionDivElement);
        if(json.ipfs){
            archingKaosFetchText(getIPFSURL(json.ipfs), getFullText,[`#markdown-${zblockIPFSHash}`]);
        }
        if (document.querySelector("#markdown-sec-not-found")) document.querySelector("#markdown-sec-not-found").hidden=true;
        makeElement({ element:"hr"}, markdownSectionDivElement);
    }
    if (!document.querySelector('#markdown-preview-'+zblockIPFSHash)){
        var markdownSectionDivElement = document.querySelector('.preview');
        var button = {
            element:'button',
            className:'read-more-button',
            innerText:`Read more`,
            onclick: `showResult("${blockObject.action.split('/')[0]}-${zblockIPFSHash}")`
        }
        var articleContainerElement = {
            element:"article",
            id:`markdown-preview-${zblockIPFSHash}`,
            innerHTML: [
                { element:"a", innerText : json.title, href : '#markdown-'+zblockIPFSHash },
                { element:"span", innerText : ' '},
                { element:"a", innerText:'[permalink]', target: '_blank', href:'https://news.arching-kaos.net/?from_zblock='+zblockIPFSHash },
                { element:"p", innerText:"Published: " + new Date(blockObject.timestamp*1000) },
                { element:"p", innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg) },
                { element:"hr" }
            ]
        };
        makeElement(articleContainerElement, markdownSectionDivElement);
        if(json.ipfs){
            archingKaosFetchText(getIPFSURL(json.ipfs), getPreviewText, [`#markdown-preview-${zblockIPFSHash}`, button]);
        }
        makeElement({ element:"hr"}, markdownSectionDivElement);
    }
}
// @license-end
