/* Arching Kaos Module Comments
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
function akModuleComments(zblockIPFSHash, blockObject, json){
    if (!document.querySelector('#comment-'+zblockIPFSHash)){
        var divs = document.querySelector('#comments-section');
        var art = document.createElement("article");
        art.id = 'comment-'+zblockIPFSHash;
        if(json.datetime){
            var small = document.createElement("p");
            small.innerText="Published: " + new Date(json.datetime*1000);
            art.appendChild(small);
        }
        var small = document.createElement("p");
        small.innerText="Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg);
        art.appendChild(small);
        if(json.ipfs){
            getipfstext(json.ipfs,art.id);
        }
        if (document.querySelector("#comments-sec-not-found")) document.querySelector("#comments-sec-not-found").hidden=true;
        divs.appendChild(art);
        divs.appendChild(document.createElement("hr"));
    }
}
// @license-end
