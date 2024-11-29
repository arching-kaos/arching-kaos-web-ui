/* Arching Kaos Module References
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
import {
    getReferences,
    setReference,
    getReference
} from "./environment-setup.js";

export function resolveReferences(){
    console.log(getReferences());
    const references = getReferences();
    for( var entry = 0; entry < references.length; entry++ ){
        var comment = document.querySelector('#comment-'+references[entry].dataExpansion.reference);
        var article = document.querySelector('#news-'+references[entry].dataExpansion.refer_to);
        article.appendChild(comment);
    }
}

export function storeReference(zblockIPFSHash, zblockObject, blockObject, json, references){
    if ( getReference(zblockIPFSHash) === undefined ){
        setReference(zblockIPFSHash, {
            zblock:zblockIPFSHash,
            block:zblockObject.block,
            block_signature:zblockObject.block_signature,
            action:blockObject.action,
            previous:blockObject.previous,
            data:blockObject.data,
            dataExpansion:json,
            detach:blockObject.detach,
            gpg:blockObject.gpg,
            timestamp:blockObject.timestamp
        });
    }
}
// @license-end
