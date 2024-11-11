/* Arching Kaos Module News
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */

function akModuleNews(zblockIPFSHash, zblockObject, blockObject, json){
    if (!document.querySelector('#news-'+zblockIPFSHash)){
        var newsSectionDivElement = document.querySelector('#news-section');
        var articleContainerElement = document.createElement("article");
        articleContainerElement.id = 'news-'+zblockIPFSHash;
        if(json.title){
            var ubs = document.createElement("a");
            ubs.innerText = json.title;
            ubs.href = '#news-'+zblockIPFSHash;
            articleContainerElement.appendChild(ubs);
            var ahref = document.createElement("a");
            ahref.innerText = '[permalink]';
            ahref.target = '_blank';
            ahref.href = 'https://news.arching-kaos.net/?from_zblock='+zblockIPFSHash;
            articleContainerElement.appendChild(ahref);
        }
        if(json.datetime){
            var small = document.createElement("p");
            small.innerText="Published: " + new Date(blockObject.timestamp*1000);
            articleContainerElement.appendChild(small);
        }
        var small = document.createElement("p");
        small.innerText="Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg);
        articleContainerElement.appendChild(small);
        articleContainerElement.appendChild(document.createElement("hr"));
        if(json.ipfs){
            getipfstext(json.ipfs,articleContainerElement.id);
        }
        if (document.querySelector("#news-sec-not-found")) document.querySelector("#news-sec-not-found").hidden=true;
        newsSectionDivElement.appendChild(articleContainerElement);
        newsSectionDivElement.appendChild(document.createElement("hr"));
    }
}
// @license-end
