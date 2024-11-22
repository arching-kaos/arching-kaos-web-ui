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
        var articleContainerElement = {
            element:"article",
            id:`news-${zblockIPFSHash}`,
            innerHTML: [
                { element:"a", innerText : json.title, href : '#news-'+zblockIPFSHash },
                { element:"a", innerText:'[permalink]', target: '_blank', href:'https://news.arching-kaos.net/?from_zblock='+zblockIPFSHash },
                { element:"p", innerText:"Published: " + new Date(blockObject.timestamp*1000) },
                { element:"p", innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg) },
                { element:"hr" }
            ]
        };
        makeElement(articleContainerElement, newsSectionDivElement);
        if(json.ipfs){
            archingKaosFetchText(getIPFSURL(json.ipfs), getFullText,[`#news-${zblockIPFSHash}`]);
        }
        };
        makeElement(small, articleContainerElement);
        var hr = { element:"hr" };
        makeElement(hr, articleContainerElement);
        if(json.ipfs){
            getipfstext(json.ipfs,articleContainerElement.id);
        }
        if (document.querySelector("#news-sec-not-found")) document.querySelector("#news-sec-not-found").hidden=true;
        makeElement(hr, newsSectionDivElement);
    }
}
// @license-end
