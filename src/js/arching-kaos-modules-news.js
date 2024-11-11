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
            id:'news-'+zblockIPFSHash
        };
        makeElement(articleContainerElement, newsSectionDivElement);
        articleContainerElement = document.querySelector(`#news-${zblockIPFSHash}`);
        if(json.title){
            var ubs = {
                element:"a",
                innerText : json.title,
                href : '#news-'+zblockIPFSHash
            };
            makeElement(ubs, articleContainerElement);
            var ahref = {
                element:"a",
                innerText:'[permalink]',
                target: '_blank',
                href:'https://news.arching-kaos.net/?from_zblock='+zblockIPFSHash
            };
            makeElement(ahref, articleContainerElement);
        }
        if(json.datetime){
            var small = {
                element:"p",
                innerText:"Published: " + new Date(blockObject.timestamp*1000)
            };
            makeElement(small, articleContainerElement);
        }
        var small = {
            element:"p",
            innerText:"Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg)
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
