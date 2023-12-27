function getArrayLength(array){
    var len = 0;
    for ( e in array ) {
        len++;
    }
    return len;
}

function renderStellarAddressPlaceholder(stellarAddress){
    var divs = document.querySelector('#'+stellarAddress);
    if ( divs === null ){
        var d = document.createElement('div');
        d.id = '#'+stellarAddress;
        d.innerText = stellarAddress;
        document.querySelector('.stellar-network').appendChild(d);
    }
    divs = document.querySelector('#'+stellarAddress);
    return divs;
}

function akidRender(json, stellarAddress){
    var divs = renderStellarAddressPlaceholder(stellarAddress);
    for( key in Object.keys(json) ){
        if ( typeof(json[Object.keys(json)[key]]) === "string" ) {
            if(!document.querySelector('#'+Object.keys(json)[key]+'-'+stellarAddress)){
                var p = document.createElement("p");
                p.id = Object.keys(json)[key]+'-'+stellarAddress;
                p.innerText = Object.keys(json)[key] + ": " +json[Object.keys(json)[key]];
                divs.appendChild(p);
            }
        }
        else if ( typeof(json[Object.keys(json)[key]]) === "Object"||"Array" ) {
            akidRender(json[Object.keys(json)[key]], stellarAddress);
        }
    }
}

function akidRenderAndProceed(json, stellarAddress){
    akidRender(json, stellarAddress);
    participants[stellarAddress]=json;
    if ( stellarParticipantsScanned === 0 ) {
        archingKaosLog('END');
    }
    progressPlaceholder.value++;
    zseek(json.zchain,stellarAddress,json);
}

function renderZblockAndProceed(json, params){
    const [zblockIPFSHash, zchainIPNSLink, zblockElement] = params;
    /* Could be json object with
     *  - block
     *  - block_signature
     */
    //            var divs = document.querySelector('#zchain-data-section');
    if(json.block){
        var p = document.createElement("p");
        p.innerText="Block: " +json.block;
        p.id=zblockIPFSHash;
        zblockElement.appendChild(p);
    }
    if(json.block_signature){
        var p = document.createElement("p");
        p.innerText="Signature: " +json.block_signature;
        zblockElement.appendChild(p);
    }
    progressPlaceholder.max++;
    progressPlaceholder.value++;
    seekblock(json.block,zblockIPFSHash,zchainIPNSLink,json);
}

function blockRenderAndProceed(json, params){
    const [zchainIPNSLink, zblockIPFSHash, blockIPFSHash, zblockObject] = params;
    /* Could be json object with
     *  - action
     *  - data
     *  - gpg
     *  - timestamp
     *  - previous
     *  - detach
     */
    // var divs = document.querySelector('#zchain-data-section');
    if(json.action){
        var p = document.createElement("p");
        p.innerText="Action: " +json.action;
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    if(json.detach){
        var p = document.createElement("p");
        p.innerText="Detach: " +json.detach;
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    if(json.gpg){
        var p = document.createElement("p");
        p.innerText="GPG: " +json.gpg;
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    if(json.data){
        var p = document.createElement("p");
        var a = document.createElement("a");
        a.href = getIPFSURL(json.data);
        a.innerText = json.data;
        p.innerText="Data: ";
        p.appendChild(a);
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    if(json.timestamp){
        var p = document.createElement("p");
        p.innerText="Timestamp: " +json.timestamp + " [" + new Date(json.timestamp*1000) + "]";
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    if(json.previous){
        var p = document.createElement("p");
        p.innerText="Previous: " +json.previous;
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    progressPlaceholder.value++;
    exe(json.action,json.data,json,zblockIPFSHash,zchainIPNSLink,zblockObject);
    if ( checkIfGenesis(json.previous) ){
        archingKaosLog("Done loading " + zchainIPNSLink + " zchain!")
        progressPlaceholder.value++;
        zchain[zchainIPNSLink] = {loading: "completed"};
        if ( getArrayLength(zchain) === stellarNetworkConfiguredAddresses){
            var x=0;
            for ( element in zchain ) {
                if ( zchain[element].loading === "completed" ){
                    x++;
                }
            }
            if ( x === getArrayLength(zchain) ){
                archingKaosLog("Everything is completed!");
                sortedMixtapes = mixtapes.sort(function(a,b){return a.timestamp - b.timestamp});
            }
        }
        for( entry in references ){
            var comment = document.querySelector('#comment-'+references[entry].dataExpansion.reference);
            var article = document.querySelector('#news-'+references[entry].dataExpansion.refer_to);
            article.appendChild(comment);
        }
    } else {
        seekzblock(json.previous, zchainIPNSLink);
    }
}

function getNicknameAssossiatedWithGPG(gpgIPFSHash){
    for (let i in participants){
        if ( participants[i].gpg === gpgIPFSHash ){
            if (participants[i].profile.nickname){
                return participants[i].profile.nickname;
            }
        }
    }
}

function getConfiguration(akidIPNSLink,stellarAddress){
    progressPlaceholder.max++;
    archingKaosLog("Parsing the configuration...")
    archingKaosFetchJSON(getIPNSURL(akidIPNSLink), akidRenderAndProceed, stellarAddress)
}

function zseek(zchainIPNSLink,stellarAddress,j){
    var divs = document.querySelector('#zchain-data-section');
    var details = 0;
    if ( document.querySelector('#zd-' + zchainIPNSLink) === null ){
        details = document.createElement("details");
        details.id = 'zd-' + zchainIPNSLink;
        details.className = 'zchain-details';
        divs.appendChild(details);
    }
    details = document.querySelector('#zd-' + zchainIPNSLink);

    if(zchainIPNSLink){
        var p = document.createElement("summary");
        p.innerText="zchain: " + zchainIPNSLink;
        details.appendChild(p);
    }
    archingKaosLog("Seeking zchain " + zchainIPNSLink + "...");
    fetch(getIPNSURL(zchainIPNSLink), {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            var zblock = "";
            if ( response.headers.has('Etag') ){
                zblock = response.headers.get('Etag').replace(/"/g,'');
                zchain[zchainIPNSLink] = {loading : "started"};
                zchainsFound++;
                zchains[zchainIPNSLink] = [];
            }
            response.json().then(json=>{
                /* Could be json object with
                 *  - block
                 *  - block_signature
                 */
                if(zblock === "" ) {
                    var divs = document.querySelector('#zchain-data-section');
                    if(json.block){
                        var p = document.createElement("p");
                        p.innerText="Block: " + json.block;
                        details.appendChild(p);
                    }
                    if(json.block_signature){
                        var p = document.createElement("p");
                        p.innerText="Signature: " + json.block_signature;
                        details.appendChild(p);
                    }
                    divs.appendChild(details);
                } else {
                    progressPlaceholder.max++;
                    progressPlaceholder.value++;
                    seekzblock(zblock, zchainIPNSLink, stellarAddress, j);
                }
            })
        }
    })
}

function seekzblock(zblockIPFSHash,zchainIPNSLink){
    var divs = document.querySelector('#zd-' + zchainIPNSLink);
    var zblockElement = document.createElement("article");
    zblockElement.id = 'zb-' + zblockIPFSHash;
    if (document.querySelector("#zchain-data-sec-not-found")) document.querySelector("#zchain-data-sec-not-found").hidden=true;
    if(zblockIPFSHash){
        var p = document.createElement("p");
        p.innerText="zblock: " + zblockIPFSHash;
        zblockElement.appendChild(p);
    }
    divs.appendChild(zblockElement);
    archingKaosLog("Seeking ZBLOCK " + zblockIPFSHash + "...");
    archingKaosFetchJSON(getIPFSURL(zblockIPFSHash), renderZblockAndProceed, [zblockIPFSHash, zchainIPNSLink, zblockElement]);
}

function checkIfGenesis(zblockIPFSHash){
    if(zblockIPFSHash==="QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"){
        return true;
    } else {
        return false;
    }
}

function seekblock(blockIPFSHash,zblockIPFSHash,zchainIPNSLink,zblockObject){
    detailsPlace = document.querySelector('#zb-'+zblockIPFSHash);
    archingKaosLog("Seeking block "+blockIPFSHash+"...");
    progressPlaceholder.max++;
    archingKaosFetchJSON(getIPFSURL(blockIPFSHash), blockRenderAndProceed, [zchainIPNSLink, zblockIPFSHash, blockIPFSHash, zblockObject]);
}

/*
 * Function that executes a specified block
 *
 * Returns the result of execution on the proper page in DOM
 */

function getNicknameAssossiatedWithGPG(gpgIPFSHash){
    for (let i in participants){
        if ( participants[i].gpg === gpgIPFSHash ){
            if (participants[i].profile.nickname !== 'undefined'){
                return participants[i].profile.nickname;
            } else {
                return gpgIPFSHash;
            }
        }
    }
    return gpgIPFSHash;
}

function getConfiguration(akidIPNSLink,stellarAddress){
    progressPlaceholder.max++;
    archingKaosLog("Parsing the configuration...")
    archingKaosFetchJSON(getIPNSURL(akidIPNSLink), akidRenderAndProceed, stellarAddress)
}

function zseek(zchainIPNSLink,stellarAddress,j){
    var divs = document.querySelector('#zchain-data-section');
    var details = 0;
    if ( document.querySelector('#zd-' + zchainIPNSLink) === null ){
        details = document.createElement("details");
        details.id = 'zd-' + zchainIPNSLink;
        details.className = 'zchain-details';
        divs.appendChild(details);
    }
    details = document.querySelector('#zd-' + zchainIPNSLink);

    if(zchainIPNSLink){
        var p = document.createElement("summary");
        p.innerText="zchain: " + zchainIPNSLink;
        details.appendChild(p);
    }
    archingKaosLog("Seeking zchain " + zchainIPNSLink + "...");
    fetch(getIPNSURL(zchainIPNSLink), {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            var zblock = "";
            if ( response.headers.has('Etag') ){
                zblock = response.headers.get('Etag').replace(/"/g,'');
                zchain[zchainIPNSLink] = {loading : "started"};
                zchainsFound++;
                zchains[zchainIPNSLink] = [];
            }
            response.json().then(json=>{
                /* Could be json object with
                 *  - block
                 *  - block_signature
                 */
                if(zblock === "" ) {
                    var divs = document.querySelector('#zchain-data-section');
                    if(json.block){
                        var p = document.createElement("p");
                        p.innerText="Block: " + json.block;
                        details.appendChild(p);
                    }
                    if(json.block_signature){
                        var p = document.createElement("p");
                        p.innerText="Signature: " + json.block_signature;
                        details.appendChild(p);
                    }
                    divs.appendChild(details);
                } else {
                    progressPlaceholder.max++;
                    progressPlaceholder.value++;
                    seekzblock(zblock, zchainIPNSLink, stellarAddress, j);
                }
            })
        }
    })
}

function seekzblock(zblockIPFSHash,zchainIPNSLink){
    var divs = document.querySelector('#zd-' + zchainIPNSLink);
    var zblockElement = document.createElement("article");
    zblockElement.id = 'zb-' + zblockIPFSHash;
    if (document.querySelector("#zchain-data-sec-not-found")) document.querySelector("#zchain-data-sec-not-found").hidden=true;
    if(zblockIPFSHash){
        var p = document.createElement("p");
        p.innerText="zblock: " + zblockIPFSHash;
        zblockElement.appendChild(p);
    }
    divs.appendChild(zblockElement);
    archingKaosLog("Seeking ZBLOCK " + zblockIPFSHash + "...");
    archingKaosFetchJSON(getIPFSURL(zblockIPFSHash), renderZblockAndProceed, [zblockIPFSHash, zchainIPNSLink, zblockElement]);
}

function checkIfGenesis(zblockIPFSHash){
    if(zblockIPFSHash==="QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"){
        return true;
    } else {
        return false;
    }
}

function seekblock(blockIPFSHash,zblockIPFSHash,zchainIPNSLink,zblockObject){
    detailsPlace = document.querySelector('#zb-'+zblockIPFSHash);
    archingKaosLog("Seeking block "+blockIPFSHash+"...");
    progressPlaceholder.max++;
    archingKaosFetchJSON(getIPFSURL(blockIPFSHash), blockRenderAndProceed, [zchainIPNSLink, zblockIPFSHash, blockIPFSHash, zblockObject]);
}

function exe(action,dataIPFSHash,blockObject,zblockIPFSHash,zchainIPNSLink,zblockObject){
    archingKaosLog("Render ZBLOCK "+zblockIPFSHash+" as " + action + " ...");
    fetch(getIPFSURL(dataIPFSHash), {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                /* Could be json object with
                 *  - block
                 *  - block_signature
                 */
                if (action == "files/add") {
                    akModuleFiles(zblockIPFSHash, blockObject, json);
                }
                else if (action == "news/add") {
                    akModuleNews(zblockIPFSHash, zblockObject, blockObject, json);
                }
                else if (action == "comments/add") {
                    if (!document.querySelector('#comment-'+zblockIPFSHash)){
                        var divs = document.querySelector('#comments-section');
                        var art = document.createElement("article");
                        art.id = 'comment-'+zblockIPFSHash;
                        /*
                        if(json.title){
                            var h3 = document.createElement("h3");
                            h3.innerText = json.title;
                            art.appendChild(h3);
                        }
                        */
                        if(json.datetime){
                            var small = document.createElement("p");
                            small.innerText="Published: " + new Date(json.datetime*1000);
                            art.appendChild(small);
                        }
                        var small = document.createElement("p");
                        small.innerText="Contributor: " + getNicknameAssossiatedWithGPG(blockObject.gpg);
                        art.appendChild(small);
                        if(json.ipfs){
                            getipfstext(json.ipfs,art.id);
                        }
                        if (document.querySelector("#comments-sec-not-found")) document.querySelector("#comments-sec-not-found").hidden=true;
                        divs.appendChild(art);
                        divs.appendChild(document.createElement("hr"));
                    }
                }
                else if (action == "references/add"){
                    if ( references[zblockIPFSHash] === undefined ){
                        references[zblockIPFSHash]={
                            zblock:zblockIPFSHash,
                            block:zblockObject.block,
                            block_signature:zblockObject.block_signature,
                            action:action,
                            previous:blockObject.previous,
                            data:blockObject.data,
                            dataExpansion:json,
                            detach:blockObject.detach,
                            gpg:blockObject.gpg,
                            timestamp:blockObject.timestamp
                        };
                    }
                }
                else if (action == "mixtape/add") {
                    var divs = document.querySelector('#mixtapes-section');
                    var art = document.createElement("article");
                    art.id = dataIPFSHash;
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
                        audio.id = 'mixtape-'+zblockIPFSHash;
                        mixtapeIds.push(audio.id);
                        var source = document.createElement("source");
                        source.src = getIPFSURL(json.ipfs);
                        var rs = source.cloneNode(true);
                        audio.appendChild(source);
                        radio.appendChild(rs);
                        art.appendChild(audio);
                        audio.addEventListener( "loadedmetadata", ()=>{
                            if ( mixtapes[zblockIPFSHash] === undefined ){
                                mixtapes[zblockIPFSHash]={
                                    zblock:zblockIPFSHash,
                                    block:zblockObject.block,
                                    block_signature:zblockObject.block_signature,
                                    action:action,
                                    previous:blockObject.previous,
                                    data:blockObject.data,
                                    dataExpansion:json,
                                    detach:blockObject.detach,
                                    gpg:blockObject.gpg,
                                    timestamp:blockObject.timestamp,
                                    audioDuration:audio.duration
                                };
                            }
                            console.log(
                                zblockIPFSHash+"'s duration is: "+
                                audio.duration +
                                " Ceiled: " + Math.ceil(audio.duration) +
                                " added on " + blockObject.timestamp + " or "
                                + json.timestamp +
                                " DIFF: " + (blockObject.timestamp - json.timestamp)
                            );
                        }, false );
                    }
                    if (document.querySelector("#mixtapes-sec-not-found")) document.querySelector("#mixtapes-sec-not-found").hidden=true;
                    divs.appendChild(art);
                }
                else {
                    archingKaosLog(action + " module not found");
                }
                zchains[zchainIPNSLink].push({
                    zblock:zblockIPFSHash,
                    block:zblockObject.block,
                    block_signature:zblockObject.block_signature,
                    action:action,
                    previous:blockObject.previous,
                    data:blockObject.data,
                    dataExpansion:json,
                    detach:blockObject.detach,
                    gpg:blockObject.gpg,
                    timestamp:blockObject.timestamp
                });
                data[dataIPFSHash]=json;
                progressPlaceholder.max++;
                progressPlaceholder.value++;
            })
        }
    })
}

function getipfstext(ipfsHash, articleid){
    fetch(getIPFSURL(ipfsHash), {
        method:'GET',
        headers:{
            Accept: 'text/plain'
        }
    }).then(response=>{
        if(response.ok){
            response.text().then(text=>{
                var divs = document.querySelector('#'+articleid);
                if(text){
                    var pre = document.createElement("div");
                    var lines = text.split('\n');
                    // remove one line, starting at the first position
                    lines.splice(0,1);
                    // join the array back into a single string
                    var newtext = lines.join('\n');
                    pre.innerHTML = DOMPurify.sanitize(marked.parse(newtext));
                    divs.appendChild(pre);
                }
                progressPlaceholder.max++;
                progressPlaceholder.value++;
            })
        }
    })
}

function checkIfChainAndProceed(json){
    if (json.zchain) {
        var a = document.createElement("pre");
        a.innerText=json.zchain;
        aknet.appendChild(a);
    }
    zseek(json.zchain, "localnode", json);
}

async function ringlocalbell(){
    archingKaosLog("Ringing local bell...");
    var url=localnode;
    archingKaosFetchJSON(url, checkIfChainAndProceed);
    archingKaosLog("Ringing local bell... Done!");
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
