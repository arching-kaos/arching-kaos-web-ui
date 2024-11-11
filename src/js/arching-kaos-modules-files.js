/* Arching Kaos Module Files
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
function akModuleFiles(zblockIPFSHash, blockObject, json){
    if (!document.querySelector('#file-'+zblockIPFSHash)){
        var divs = document.querySelector('#files-section');
        var art = document.createElement("article");
        art.id = 'file-'+zblockIPFSHash;
        if(json.title){
            var h3 = document.createElement("h3");
            h3.innerText = json.filename;
            art.appendChild(h3);
        }
        if(json.datetime){
            var small = document.createElement("p");
            small.innerText="Published: " +json.datetime;
            art.appendChild(small);
        }
        getNicknameAssossiatedWithGPG(blockObject.gpg);
        var small = document.createElement("p");
        small.innerText="Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg);
        art.appendChild(small);
        if(json.ipfs){
            //    getipfstext(json.ipfs,art.id);
            var small = document.createElement("a");
            small.innerText=json.filename;
            small.href="https://ipfs.arching-kaos.com/ipfs/"+json.ipfs+"?filename="+json.filename;
            art.appendChild(small);
        }
        divs.appendChild(art);
        if(document.querySelector("#files-sec-not-found")) document.querySelector("#files-sec-not-found").hidden = true;
        divs.appendChild(document.createElement("hr"));
    }
}
// @license-end
