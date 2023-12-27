
function akModuleNews(zblockIPFSHash, zblockObject, blockObject, json){
    if (!document.querySelector('#news-'+zblockIPFSHash)){
        var divs = document.querySelector('#news-section');
        var art = document.createElement("article");
        art.id = 'news-'+zblockIPFSHash;
        if(json.title){
            var ahref = document.createElement("a");
            ahref.innerText = json.title +' [permalink]';
            ahref.href = 'https://news.arching-kaos.net/?from_block='+zblockObject.block;
            art.appendChild(ahref);
        }
        if(json.datetime){
            var small = document.createElement("p");
            small.innerText="Published: " + new Date(blockObject.timestamp*1000);
            art.appendChild(small);
        }
        var small = document.createElement("p");
        small.innerText="Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg);
        art.appendChild(small);
        art.appendChild(document.createElement("hr"));
        if(json.ipfs){
            getipfstext(json.ipfs,art.id);
        }
        if (document.querySelector("#news-sec-not-found")) document.querySelector("#news-sec-not-found").hidden=true;
        divs.appendChild(art);
        divs.appendChild(document.createElement("hr"));
    }
}
