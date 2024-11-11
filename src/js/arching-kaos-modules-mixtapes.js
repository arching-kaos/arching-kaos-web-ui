/* Arching Kaos Model Mixtapes
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */

function akModuleMixtapes(zblockIPFSHash, zblockObject, blockObject, json){
    if(!document.querySelector('#mixtape-'+zblockIPFSHash)){
        var divs = document.querySelector('#mixtapes-section');
        var art = document.createElement("article");
        art.id = 'mixtape-'+zblockIPFSHash;
        if(json.title){
            var h3 = document.createElement("h3");
            h3.innerText = json.title;
            art.appendChild(h3);
        }
        if(json.artist){
            var h4 = document.createElement("h4");
            h4.innerText = json.artist;
            art.appendChild(h4);
        }
        if(json.timestamp){
            var small = document.createElement("h5");
            small.innerText="Published: " + new Date(json.timestamp*1000);
            art.appendChild(small);
        }
        if(json.ipfs){
            var audio = document.createElement("audio");
            audio.setAttribute('controls','');
            audio.id = 'mixtape-player-'+zblockIPFSHash;
            mixtapeIds.push(audio.id);
            var source = document.createElement("source");
            source.src = getIPFSURL(json.ipfs);
            var rs = source.cloneNode(true);
            audio.appendChild(source);
            //radio.appendChild(rs);
            art.appendChild(audio);
            audio.addEventListener( "loadedmetadata", ()=>{
                if ( mixtapes[zblockIPFSHash] === undefined ){
                    mixtapes[zblockIPFSHash]={
                        zblock:zblockIPFSHash,
                        block:zblockObject.block,
                        block_signature:zblockObject.block_signature,
                        action:blockObject.action,
                        previous:blockObject.previous,
                        data:blockObject.data,
                        dataExpansion:json,
                        detach:blockObject.detach,
                        gpg:blockObject.gpg,
                        timestamp:blockObject.timestamp,
                        audioDuration:audio.duration
                    };
                }
                /* console.log(
                                    zblockIPFSHash+"'s duration is: "+
                                    audio.duration +
                                    " Ceiled: " + Math.ceil(audio.duration) +
                                    " added on " + blockObject.timestamp + " or "
                                    + json.timestamp +
                                    " DIFF: " + (blockObject.timestamp - json.timestamp)
                                ); */
            }, false );
        }
        if (document.querySelector("#mixtapes-sec-not-found")) document.querySelector("#mixtapes-sec-not-found").hidden=true;
        divs.appendChild(art);
    }
}
// @license-end
