
function akModuleNews(zblockIPFSHash, zblockObject, blockObject, json){
    if (!document.querySelector('#news-'+zblockIPFSHash)){
        var newsSectionDivElement = document.querySelector('#news-section');
        var articleContainerElement = document.createElement("article");
        articleContainerElement.id = 'news-'+zblockIPFSHash;
        if(json.title){
            var ahref = document.createElement("a");
            ahref.innerText = json.title +' [permalink]';
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
