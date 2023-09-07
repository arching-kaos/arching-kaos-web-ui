/*
 * A new feature for a new future:
 *
 * We will get `location.search` values to figure out where the visitor wants
 * to go.
 *
 * We should then replace the menu links with these ones.
 *
 * We should also modify the existing menu mechanism to show/hide depending on
 * the "route" we got from `location.search`.
 *
 */

// Irrelevant for now
if (DEBUG) console.log(window.location);


/*
 * Array of all the menu-panes IDs
var menuids = [
    '#welcome-section',
    '#about-section',
    '#zchain-data-section',
    '#news-section',
    '#stats-section',
    '#mixtapes-section',
    '#chat-section',
    '#mypage-section',
    '#stellar-balances',
    '#stellar-data-config',
    '#arching-kaos-id',
    '#files-section'
];
*/

function akidRenderAndProceed(json, stellarAddress){
    /* Could be json object with
     *  - genesis
     *  - gpg
     *  - profile {
     *     - nickname
     *    }
     *  - zchain
     */
    var divs = document.querySelector('#'+stellarAddress)
    if(json.genesis){
        var p = document.createElement("p")
        p.innerText="Genesis: " +json.genesis
        divs.appendChild(p)
    }
    if(json.gpg){
        var p = document.createElement("p")
        p.innerText="GPG: " +json.gpg
        divs.appendChild(p)
    }
    if(json.profile.nickname){
        var p = document.createElement("p")
        p.innerText="Nickname: " +json.profile.nickname
        divs.appendChild(p)
    }
    if(json.zchain){
        var p = document.createElement("p")
        p.innerText="zchain: " +json.zchain
        divs.appendChild(p)
    }
    participants[stellarAddress]=json;
    progressPlaceholder.value++;
//    zseek(json.zchain);
    zseek(json.zchain,stellarAddress,json);
}

/*
 * Function that gets nickname and parses the config variable.
 *
 * Returns the key:value pairs of the configuration and proceeds
 * to get the zchain
 */
function getConfiguration(akidIPNSLink,stellarAddress){
    progressPlaceholder.max++;
    archingKaosLog("Parsing the configuration...")
    archingKaosFetchJSON(getIPNSURL(akidIPNSLink), akidRenderAndProceed, stellarAddress)
}

function getIPNSURL(ipnsKey){
    return activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipns/'+ipnsKey;
}

function getIPFSURL(ipfsHash){
    return activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/'+ipfsHash;
}

/*
 * Function to seek Zblocks
 *
 * Returns Block and Signature for each ZBLOCK found.
 *
 * Proceeds to the blocks found.
 */
function zseek(zchainIPNSLink,stellarAddress,j){
    var divs = document.querySelector('#zchain-data-section');
    var details = document.createElement("details");
    details.id = 'zd-' + zchainIPNSLink;
    details.className = 'zchain-details';
    divs.appendChild(details);

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
            if ( DEBUG ) console.log(response);
            if ( response.headers.has('Etag') ){
                zblock = response.headers.get('Etag').replace(/"/g,'');
                zchain[zchainIPNSLink] = {loading : "started"};
                // console.log(zchain);
                // callHereToSetUpListenerFor(zchain[zchainIPNSLink]);
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

// seeks a zblock obviously. another double function
// TODO: figure out why the second one exists

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
    seekblock(json.block,zblockIPFSHash,zchainIPNSLink);
}
/*
 * Function gets ZBLOCK and parses it
 *
 * Returns Block and Signature elements on DOM as p
 *
 * Proceeds to seek the block found
 */
function seekzblock(zblockIPFSHash,zchainIPNSLink){
    if (DEBUG) console.log("Zblock::  "+zblockIPFSHash);
    if (DEBUG) console.log("Zchain::  "+zchainIPNSLink);
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

function blockRenderAndProceed(json, params){
    const [zchainIPNSLink, zblockIPFSHash, blockIPFSHash, j] = params;
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
        p.innerText="Timestamp: " +json.timestamp;
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    if(json.previous){
        var p = document.createElement("p");
        p.innerText="Previous: " +json.previous;
        if(detailsPlace!== null) detailsPlace.appendChild(p);
    }
    progressPlaceholder.value++;
    exe(json.action,json.data,json,zblockIPFSHash,zchainIPNSLink,j);
    if(json.previous!="QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"){
        if (DEBUG) console.log(json.previous, zchainIPNSLink);
        seekzblock(json.previous, zchainIPNSLink);
    } else {
        archingKaosLog("Done loading " + zchainIPNSLink + " zchain!")
        progressPlaceholder.value++;
        zchain[zchainIPNSLink] = {loading: "completed"};

    }
}
/*
 * Seeks a block and parses it.
 *
 * Returns each element found in #zchain-data-section pane.
 *
 * Proceeds to execute the block.
 */
function seekblock(blockIPFSHash,zblockIPFSHash,zchainIPNSLink,j){
    if (DEBUG) console.log("THE CHAIN: " + zchainIPNSLink);
    if (DEBUG) console.log("THE ZBLOCK: " + zblockIPFSHash);
    detailsPlace = document.querySelector('#zb-'+zblockIPFSHash);
    archingKaosLog("Seeking block "+blockIPFSHash+"...");
    progressPlaceholder.max++;
    archingKaosFetchJSON(getIPFSURL(blockIPFSHash), blockRenderAndProceed, [zchainIPNSLink, zblockIPFSHash, blockIPFSHash, j]);
}

/*
 * Function that executes a specified block
 *
 * Returns the result of execution on the proper page in DOM
 */
function exe(action,dataIPFSHash,blockObject,zblockIPFSHash,zchainIPNSLink,z){
    if (DEBUG) console.log("Executing...",action,dataIPFSHash,blockObject,zblockIPFSHash,zchainIPNSLink,z)
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
                    var divs = document.querySelector('#files-section');
                    var art = document.createElement("article");
                    art.id = dataIPFSHash;
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
                    for (let i in participants){
                        if ( participants[i].gpg === blockObject.gpg ){
                            if (participants[i].profile.nickname){
                                var small = document.createElement("p");
                                small.innerText="Author: " +participants[i].profile.nickname;
                                art.appendChild(small);
                            }
                        }
                    }
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
                else if (action == "news/add") {
                    var divs = document.querySelector('#news-section');
                    var art = document.createElement("article");
                    art.id = dataIPFSHash;
                    if(json.title){
                        var h3 = document.createElement("h3");
                        h3.innerText = json.title;
                        art.appendChild(h3);
                    }
                    if(json.datetime){
                        var small = document.createElement("p");
                        small.innerText="Published: " +json.datetime;
                        art.appendChild(small);
                    }
                    for (let i  in participants){
                        if ( participants[i].gpg === blockObject.gpg ){
                            if (participants[i].profile.nickname){
                                var small = document.createElement("p");
                                small.innerText="Author: " +participants[i].profile.nickname;
                                art.appendChild(small);
                            }
                        }
                    }
                    if(json.ipfs){
                        getipfstext(json.ipfs,art.id);
                    }
                    if (document.querySelector("#news-sec-not-found")) document.querySelector("#news-sec-not-found").hidden=true;
                    divs.appendChild(art);
                    divs.appendChild(document.createElement("hr"));
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
                        var small = document.createElement("small");
                        small.innerText="Published: " +json.timestamp;
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
                            console.log(zblockIPFSHash+"'s duration is: "+ audio.duration + " Ceiled: " + Math.ceil(audio.duration) + " added on " +  blockObject.timestamp + " or " + json.timestamp + " DIFF: " + (blockObject.timestamp - json.timestamp));
                        }, false );
                    }
                    if (document.querySelector("#mixtapes-sec-not-found")) document.querySelector("#mixtapes-sec-not-found").hidden=true;
                    divs.appendChild(art);
                }
                else {
                    if (DEBUG) console.log("Found unknown module/action: "+action);
                    archingKaosLog(action + " module not found");
                }
                //    seekblock(json.block)
                progressPlaceholder.max++;
                progressPlaceholder.value++;
            })
        }
    })
}

/*
 * Function gets an IPFS text file and parses it
 * so it can be...
 * Return(ed) in a pre DOM element
 */
function getipfstext(ipfsHash, articleid){
    fetch( getIPFSURL(ipfsHash), {
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
                //    seekblock(json.block)
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

/*
 * Get latest block from localnode
 * If any, adds its contents to the page
 */
async function ringlocalbell(){
    archingKaosLog("Ringing local bell...");
    var url=localnode;
    archingKaosFetchJSON(url, checkIfChainAndProceed);
    archingKaosLog("Ringing local bell... Done!");
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
