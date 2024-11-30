// Arching Kaos Model Mixtapes
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "./arching-kaos-generator.js";
import { getIPFSURL } from "./url-generators.js";
import { addMixtapeID, setMixtape, getMixtapes } from "./environment-setup.js";

export function akModuleMixtapes(zblockIPFSHash, zblockObject, blockObject, json){
    if(!document.querySelector('#mixtape-'+zblockIPFSHash)){
        var divs = document.querySelector('#mixtapes-section');
        var art = {
            element:"article",
            id:'mixtape-'+zblockIPFSHash,
            innerHTML:[
                {
                    element:"h3",
                    innerText:(json.title)?json.title:''
                },
                {
                    element:"h4",
                    innerText:(json.artist)?json.artist:''
                },
                {
                    element:"h5",
                    innerText:"Published: " + (json.timestamp)?new Date(json.timestamp*1000):''
                },
                {
                    element:"audio",
                    id:'mixtape-player-'+zblockIPFSHash,
                    innerHTML:[
                        { element:"source", src: getIPFSURL(json.ipfs)}
                    ]
                }
            ]
        };
        makeElement(art, divs);
        var audio = document.querySelector('#mixtape-player-'+zblockIPFSHash);
        audio.setAttribute('controls','');
        addMixtapeID(zblockIPFSHash);
        audio.addEventListener( "loadedmetadata", ()=>{
            if ( getMixtapes()[zblockIPFSHash] === undefined ){
                setMixtape(zblockIPFSHash, {
                    zblock:zblockIPFSHash,
                    block:zblockObject.block,
                    block_signature:zblockObject.block_signature,
                    action:blockObject.action,
                    previous:blockObject.previous,
                    data:blockObject.data,
                    dataExpansion:json,
                    detach:blockObject.detach,
                    gpg:blockObject.gpg,
                    timestamp:blockObject.timestamp,
                    audioDuration:audio.duration
                });
            }
            /* debugLog(
                                    zblockIPFSHash+"'s duration is: "+
                                    audio.duration +
                                    " Ceiled: " + Math.ceil(audio.duration) +
                                    " added on " + blockObject.timestamp + " or "
                                    + json.timestamp +
                                    " DIFF: " + (blockObject.timestamp - json.timestamp)
                                ); */
            }, false );
        if (document.querySelector("#mixtapes-sec-not-found")) document.querySelector("#mixtapes-sec-not-found").hidden=true;
    }
}
// @license-end
