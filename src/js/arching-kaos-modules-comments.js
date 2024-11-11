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
        var art = {
            element:"article",
            id: 'comment-'+zblockIPFSHash
        };
        makeElement(art, divs);
        art = document.querySelector('#comment-'+zblockIPFSHash);
        if(json.datetime){
            var small = {
                element:"p",
                innerText:"Published: " + new Date(json.datetime*1000)
            };
            makeElement(small, art);
        }
        var small = {
            element:"p",
            innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg)
        };
        makeElement(small, art);
        if(json.ipfs){
            getipfstext(json.ipfs,art.id);
        }
        if (document.querySelector("#comments-sec-not-found")) document.querySelector("#comments-sec-not-found").hidden=true;
        makeElement(document.createElement("hr"), divs);
    }
}
// @license-end
