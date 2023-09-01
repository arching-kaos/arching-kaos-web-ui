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


/*
 * Function that gets nickname and parses the config variable.
 *
 * Returns the key:value pairs of the configuration and proceeds
 * to get the zchain
 */
function getConfiguration(a,eid){
    progressPlaceholder.max++;
//    var sta = document.createElement("pre");
//    sta.innerText = "Parsing the configuration..."
//    currentLogMessageElement.innerText = sta.innerText;
//    logsAreaElement.appendChild(sta);
    archingKaosLog("Parsing the configuration...")
    url=activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipns/'+a
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                /* Could be json object with
                 *  - genesis
                 *  - gpg
                 *  - profile {
                 *     - nickname
                 *    }
                 *  - zchain
                 */
                var divs = document.querySelector('#'+eid)
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
                participants[eid]=json;
                progressPlaceholder.value++;
                zseek(json.zchain);
            })
        }
    })
}

// Although we implemented something similar already,
// it seems like I was not happy so JRM ( Just Repeat Myself )
// #TODO : Revisit this: akiseek(i)

/*
 * Function to seek configuration for any IPNS address i
 * it's used to seek specifically the Freighter user's address.
 *
 * Returns p DOM elements on #arching-kaos-id pane
 */
function getArchingKaosIdentityFromIPNSKey(ipnsKey){
    archingKaosLog("Parsing AKID...");
    url=activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipns/'+ipnsKey;
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                /* Could be json object with
                 *  - genesis
                 *  - gpg
                 *  - profile {
                 *     - nickname
                 *    }
                 *  - zchain
                 */
                var divs = document.querySelector('#arching-kaos-id');
                if(json.genesis){
                    var p = document.createElement("p");
                    p.innerText="Genesis: " +json.genesis;
                    divs.appendChild(p);
                }
                if(json.gpg){
                    var p = document.createElement("p");
                    p.innerText="GPG: " +json.gpg;
                    divs.appendChild(p);
                }
                if(json.profile.nickname){
                    var p = document.createElement("p");
                    p.innerText="Nickname: " +json.profile.nickname;
                    divs.appendChild(p);
                }
                if(json.zchain){
                    var p = document.createElement("p");
                    p.innerText="zchain: " +json.zchain;
                    divs.appendChild(p);
                }
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                zseek(json.zchain,eid,json);
            })
        }
    })
}
/*
 * Function to seek Zblocks
 *
 * Returns Block and Signature for each ZBLOCK found.
 *
 * Proceeds to the blocks found.
 */
function zseek(i,d,j){
    var divs = document.querySelector('#zchain-data-section');
    var details = document.createElement("details");
    details.id = 'zd-' + i;
    divs.appendChild(details);

    if(i){
        var p = document.createElement("summary");
        p.innerText="zchain: " +i;
        details.appendChild(p);
    }
    archingKaosLog("Seeking zchain "+i+"...");
    url = activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipns/'+i;
    fetch(url, {
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
                zchain[i] = {loading : "started"};
                console.log(zchain);
                // callHereToSetUpListenerFor(zchain[i]);
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
                        p.innerText="Block: " +json.block;
                        details.appendChild(p);
                    }
                    if(json.block_signature){
                        var p = document.createElement("p");
                        p.innerText="Signature: " +json.block_signature;
                        details.appendChild(p);
                    }
                } else {
                    progressPlaceholder.max++;
                    progressPlaceholder.value++;
                    seekzblock(zblock,i,d,j);
                }
            })
        }
    })
}

// seeks a zblock obviously. another double function
// TODO: figure out why the second one exists

/*
 * Function gets ZBLOCK and parses it
 *
 * Returns Block and Signature elements on DOM as p
 *
 * Proceeds to seek the block found
 */
function seekzblock(i,l){
    if (DEBUG) console.log("Zblock::  "+i);
    if (DEBUG) console.log("Zchain::  "+l);
    var divs = document.querySelector('#zd-' + l);
    var zblockElement = document.createElement("article");
    zblockElement.id = 'zb-'+i;
    if (document.querySelector("#zchain-data-sec-not-found")) document.querySelector("#zchain-data-sec-not-found").hidden=true;
    if(i){
        var p = document.createElement("p");
        p.innerText="zblock: " +i;
        zblockElement.appendChild(p);
    }
    divs.appendChild(zblockElement);
    archingKaosLog("Seeking ZBLOCK "+i+"...");
    url = activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/'+i;
    fetch(url, {
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
    //            var divs = document.querySelector('#zchain-data-section');
                if(json.block){
                    var p = document.createElement("p");
                    p.innerText="Block: " +json.block;
                    p.id=i;
                    zblockElement.appendChild(p);
                }
                if(json.block_signature){
                    var p = document.createElement("p");
                    p.innerText="Signature: " +json.block_signature;
                    zblockElement.appendChild(p);
                }
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                seekblock(json.block,i,l);
            })
        }
    })
}

/*
 * Seeks a block and parses it.
 *
 * Returns each element found in #zchain-data-section pane.
 *
 * Proceeds to execute the block.
 */
function seekblock(i,l,d,j){
    if (DEBUG) console.log("THE CHAIN: " + d);
    if (DEBUG) console.log("THE ZBLOCK: " + l);
    detailsPlace = document.querySelector('#zb-'+l);
    archingKaosLog("Seeking block "+i+"...");
    progressPlaceholder.max++;
    url = activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/'+i;
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
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
                    a.href = activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/'+json.data;
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
                exe(json.action,json.data,json,l,d,j);
                if(json.previous!="QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"){
                    if (DEBUG) console.log(json.previous, d);
                    seekzblock(json.previous, d);
                } else {
                    archingKaosLog("Done loading " + d + " zchain!")
                    progressPlaceholder.value++;
                    zchain[d] = {loading: "completed"};

                }
            })
        }
    })
}

/*
 * Function that executes a specified block
 *
 * Returns the result of execution on the proper page in DOM
 */
function exe(a,d,j,x,y,z){
    if (DEBUG) console.log("Executing...",a,d,j,x,y,z)
    archingKaosLog("Render ZBLOCK "+x+" as " + a + " ...");
    gurl = activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/'
    fetch(gurl+d, {
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
                if (a == "files/add") {
                    var divs = document.querySelector('#files-section');
                    var art = document.createElement("article");
                    art.id = d;
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
                        if ( participants[i].gpg === j.gpg ){
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
                else if (a == "news/add") {
                    var divs = document.querySelector('#news-section');
                    var art = document.createElement("article");
                    art.id = d;
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
                        if ( participants[i].gpg === j.gpg ){
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
                else if (a == "mixtape/add") {
                    var divs = document.querySelector('#mixtapes-section');
                    var art = document.createElement("article");
                    art.id = d;
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
                        audio.id = 'mixtape-'+x;
                        mixtapeIds.push(audio.id);
                        var source = document.createElement("source");
                        source.src = activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/' + json.ipfs;
                        var rs = source.cloneNode(true);
                        audio.appendChild(source);
                        radio.appendChild(rs);
                        art.appendChild(audio);
                        audio.addEventListener( "loadedmetadata", ()=>{
                            console.log(x+"'s duration is: "+ audio.duration + " Ceiled: " + Math.ceil(audio.duration) + " added on " +  j.timestamp + " or " + json.timestamp + " DIFF: " + (j.timestamp - json.timestamp));
                        }, false );
                    }
                    if (document.querySelector("#mixtapes-sec-not-found")) document.querySelector("#mixtapes-sec-not-found").hidden=true;
                    divs.appendChild(art);
                }
                else {
                    if (DEBUG) console.log("Found unknown module/action: "+a);
                    archingKaosLog(a + " module not found");
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
function getipfstext(ipfs,articleid){
    url = activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/'+ipfs;
    fetch(url, {
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
    zseek(json.zchain);
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
