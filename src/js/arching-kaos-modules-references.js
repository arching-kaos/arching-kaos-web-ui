function resolveReferences(references){
    for( entry in references ){
        var comment = document.querySelector('#comment-'+references[entry].dataExpansion.reference);
        var article = document.querySelector('#news-'+references[entry].dataExpansion.refer_to);
        article.appendChild(comment);
    }
}

function storeReference(zblockIPFSHash, zblockObject, blockObject, json, references){
    if ( references[zblockIPFSHash] === undefined ){
        references[zblockIPFSHash]={
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
        };
    }
}
