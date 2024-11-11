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
        var art = {
            element:"article",
            id : 'file-'+zblockIPFSHash,
            innerHTML: [
                { element:"h3", innerText: (json.filename===null)?'':json.filename },
                { element:"p", innerText:"Published: "+ (json.datetime===null)?'':json.datetime },
                { element:"p", innerText:"Contributor: " + (getNicknameAssossiatedWithGPG(blockObject.gpg))?blockObject.gpg:getNicknameAssossiatedWithGPG(blockObject.gpg)},
                { element:"a", innerText:json.filename, href:"https://ipfs.arching-kaos.com/ipfs/"+json.ipfs+"?filename="+json.filename}
            ]
        };
        makeElement(art, divs);
        if(document.querySelector("#files-sec-not-found")) document.querySelector("#files-sec-not-found").hidden = true;
        makeElement({element:"hr"}, divs);
    }
}
// @license-end
