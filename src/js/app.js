var progressPlaceholder = document.querySelector('#total-progress');
var logtextPlaceholder = document.querySelector('#logtext');
progressPlaceholder.value = '0';
/*
 * Show and hide the menu
 */
function hsm(){
    var m = document.querySelector('.sidebar');
    var t = document.querySelector('.hsm');
    var c = document.querySelector('.main');
    if (m.hidden===true){
        m.hidden=false;
        t.innerHTML = "Hide menu";
        c.style.maxWidth = "100vw"
        c.style.left = "27vw";
    } else {
        m.hidden=true;
        t.innerHTML = "Show menu";
        c.style.maxWidth = "100vw";
        c.style.left = "1vw";
    }
}

var profilemenuids = [];
/*
 * Array of all the menu-panes IDs
 */
var menuids = ['#welcome-section','#about-section','#zchain-data-section','#news-section','#stats-section','#mixtapes-section','#chat-section','#mypage-section','#stellar-balances','#stellar-data-config','#arching-kaos-id', '#loading-status', '#files-section'];
// Function to hide all the panes
function menuinit(){
    menuids.forEach(m=>document.querySelector(m).hidden=true);
}
// And call
menuinit();
// We bring up the default pane ( #welcome-section )
document.querySelector('#welcome-section').hidden=false;

/*
 * Function called on clicks on the menu bar
 * Unhides the pane connected to the clicked menu entry
 */
function menusel(m){
    menuinit();
    document.querySelector(m.hash).hidden=false;
}

// Here we store the participants found
var participants = [];

// loading-status element
var lse = document.querySelector("#loading-status");
/*
 * Get Trustlines for ARCHINGKAOS asset
 * Returns DOM element with number of trustlines
 */
function gettrustlines(){
    var sta = document.createElement("pre");
    sta.innerHTML = "Loading trustlines...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    var url='https://horizon.stellar.org/assets?asset_code=ARCHINGKAOS&asset_issuer=GB4QVKD6NW3CSNO5TNPARAWNPPXOPSSTKB35XCWB7PUNBIQTK3DVELB2';
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                var stats = document.querySelector('#stats-section')
                var small = document.createElement("small")
                small.innerHTML = 'Connected trustlines: ' + json._embedded.records[0].accounts.authorized
                stats.appendChild(small)
            })
        }
        sta.innerHTML+=" Done!"
        logtextPlaceholder.innerHTML = sta.innerHTML;
        progressPlaceholder.max++;
        progressPlaceholder.value++;
    })
}
gettrustlines()
/*
 * Get addresses that trust the asset
 * Limit is 200 addresses cause horizon API limitations.
 *
 * TODO: Crawl through the pagination
 *
 * Returns div DOM elements for each found address, embedding
 * the address both in innerHTML and in id of the div.
 */
function getholders(a=0){
    var sta = document.createElement("pre");
    sta.innerHTML = "Searching holders..."
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    var url='https://horizon.stellar.org/accounts?asset=ARCHINGKAOS:GB4QVKD6NW3CSNO5TNPARAWNPPXOPSSTKB35XCWB7PUNBIQTK3DVELB2&limit=200'
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                var stats = document.querySelector('#stats-section')
                json._embedded.records.forEach(r=>{
                    var p = document.createElement("div")
                    p.innerHTML = r.account_id
                    p.id = r.account_id
                    checkforconfig(r.account_id)
                    stats.appendChild(p)
                })
                // if (json._links.next) getholders(json._links.next.href)
            })
        }
    })
    sta.innerHTML+=" Done"
    logtextPlaceholder.innerHTML = sta.innerHTML;
    progressPlaceholder.max++;
    progressPlaceholder.value++;
}
getholders()

/*
 * Function that checks the address' variable 'config' to see
 * if it's set up.
 *
 * Returns the IPNS link in the DOM as p element and proceeds to
 * get nickname from the variables
 */
function checkforconfig(addr) {
    var sta = document.createElement("pre");
    sta.innerHTML = "Checking configuration for "+ addr+ "..."
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    url='https://horizon.stellar.org/accounts/'+addr+'/data/config'
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                var cnf = document.createElement("p")
                if(document.querySelector("#stellar-data-config-not-found")) document.querySelector("#stellar-data-config-not-found").hidden = true;
                cnf.innerHTML = atob(json.value)
                document.querySelector('#'+addr).appendChild(cnf)
                document.querySelector('#'+addr).style="color: #3dbb3d;"
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                getnickname(atob(json.value),addr)
            })
        }
    })
}

/*
 * Function that gets nickname and parses the config variable.
 *
 * Returns the key:value pairs of the configuration and proceeds
 * to get the zchain
 */
function getnickname(a,eid){
    var sta = document.createElement("pre");
    sta.innerHTML = "Parsing the configuration..."
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    url='https://ipfs.arching-kaos.com/ipns/'+a
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
                    p.innerHTML="Genesis: " +json.genesis
                    divs.appendChild(p)
                }
                if(json.gpg){
                    var p = document.createElement("p")
                    p.innerHTML="GPG: " +json.gpg
                    divs.appendChild(p)
                }
                if(json.profile.nickname){
                    var p = document.createElement("p")
                    p.innerHTML="Nickname: " +json.profile.nickname
                    divs.appendChild(p)
                }
                if(json.zchain){
                    var p = document.createElement("p")
                    p.innerHTML="zchain: " +json.zchain
                    divs.appendChild(p)
                }
                participants[eid]=json;
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                zseek(json.zchain);
            })
        }
    })
}

/*
 * We now connect our client to horizon
 */
var server = new StellarSdk.Server('https://horizon.stellar.org');
// We ask for the 'a' stellar address the balances
function letme(a){
    server.accounts()
    .accountId(a)
    .call().then(function(r){ const L = r; putit(r); });
}
// We print them
function putit(i){
    var ta=document.querySelector("#stellar-balances-table");
    readit(i);
    for (b in i.balances) {
        var row = document.createElement("tr");
        x = i.balances[b];
        var amount = document.createElement("td");
        var assetCode = document.createElement("td");
        amount.innerHTML = x.balance;
        assetCode.innerHTML = ( x.asset_code && x.asset_code != "undefined" ? x.asset_code : 'XLM');
        row.appendChild(assetCode);
        row.appendChild(amount);
        ta.appendChild(row);
        progressPlaceholder.max++;
        progressPlaceholder.value++;
        if(document.querySelector("#stellar-balances-not-found")) document.querySelector("#stellar-balances-not-found").hidden = true;
    }
}
// We also search for a config file and display it
async function dataf(i){
    var sta = document.createElement("pre");
    sta.innerHTML = "Loading your profile...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    url='https://horizon.stellar.org/accounts/'+i+'/data/config'
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                var cnf = document.createElement("p");
                cnf.innerHTML = atob(json.value);
                document.querySelector('#stellar-data-config').appendChild(cnf);
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                akiseek(atob(json.value));
            })
        }
    })
}
// Although we implemented something similar already,
// it seems like I was not happy so JRM
// #TODO : Revisit this

/*
 * Function to seek configuration for any address i
 * it's used to seek specifically the Freighter user's address.
 *
 * Returns p DOM elements on #arching-kaos-id pane
 */
function akiseek(i){
    var sta = document.createElement("pre");
    sta.innerHTML = "Parsing AKID...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    url='https://ipfs.arching-kaos.com/ipns/'+i;
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
                    p.innerHTML="Genesis: " +json.genesis;
                    divs.appendChild(p);
                }
                if(json.gpg){
                    var p = document.createElement("p");
                    p.innerHTML="GPG: " +json.gpg;
                    divs.appendChild(p);
                }
                if(json.profile.nickname){
                    var p = document.createElement("p");
                    p.innerHTML="Nickname: " +json.profile.nickname;
                    divs.appendChild(p);
                }
                if(json.zchain){
                    var p = document.createElement("p");
                    p.innerHTML="zchain: " +json.zchain;
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
    var sta = document.createElement("pre");
    sta.innerHTML = "Seeking zchain "+i+"...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    var divs = document.querySelector('#zchain-data-section');
    var details = document.createElement("details");
    details.id = 'zd-' + i;
    divs.appendChild(details);

    if(i){
        var p = document.createElement("summary");
        p.innerHTML="zchain: " +i;
        details.appendChild(p);
    }
    lse.appendChild(sta);
    url = 'https://ipfs.arching-kaos.com/ipns/'+i;
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
                var divs = document.querySelector('#zchain-data-section');
                if(json.block){
                    var p = document.createElement("p");
                    p.innerHTML="Block: " +json.block;
                    details.appendChild(p);
                }
                if(json.block_signature){
                    var p = document.createElement("p");
                    p.innerHTML="Signature: " +json.block_signature;
                    details.appendChild(p);
                }
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                seekblock(json.block,i,d,j);
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
    console.log(i,l,d,j);
    console.log(l);
    detailsPlace = document.querySelector('#zd-'+l);
    var sta = document.createElement("pre");
    sta.innerHTML = "Seeking block "+i+"...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    url = 'https://ipfs.arching-kaos.com/ipfs/'+i;
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
                var divs = document.querySelector('#zchain-data-section');
                if(json.action){
                    var p = document.createElement("p");
                    p.innerHTML="Action: " +json.action;
                    if(detailsPlace!== null) detailsPlace.appendChild(p);
                }
                if(json.detach){
                    var p = document.createElement("p");
                    p.innerHTML="Detach: " +json.detach;
                    if(detailsPlace!== null) detailsPlace.appendChild(p);
                }
                if(json.gpg){
                    var p = document.createElement("p");
                    p.innerHTML="GPG: " +json.gpg;
                    if(detailsPlace!== null) detailsPlace.appendChild(p);
                }
                if(json.data){
                    var p = document.createElement("p");
                    var a = document.createElement("a");
                    a.href = 'https://ipfs.arching-kaos.com/ipfs/'+json.data;
                    a.innerHTML = json.data;
                    p.innerHTML="Data: ";
                    p.appendChild(a);
                    if(detailsPlace!== null) detailsPlace.appendChild(p);
                }
                if(json.timestamp){
                    var p = document.createElement("p");
                    p.innerHTML="Timestamp: " +json.timestamp;
                    if(detailsPlace!== null) detailsPlace.appendChild(p);
                }
                if(json.previous){
                    var p = document.createElement("p");
                    p.innerHTML="Previous: " +json.previous;
                    if(detailsPlace!== null) detailsPlace.appendChild(p);
                }
                if(detailsPlace!== null) detailsPlace.appendChild(document.createElement("hr"));
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                exe(json.action,json.data,json,l,d,j);
                if(json.previous!="QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"){
                    seekzblock(json.previous);
                } else {
                    var sta = document.createElement("pre");
                    sta.innerHTML = "Reached genesis link: "+json.previous+"!";
                    logtextPlaceholder.innerHTML = sta.innerHTML;
                    lse.appendChild(sta);
                    progressPlaceholder.value++;
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
function seekzblock(i){
    var sta = document.createElement("pre");
    sta.innerHTML = "Seeking ZBLOCK "+i+"...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    var divs = document.querySelector('#zchain-data-section');
    if (document.querySelector("#zchain-data-sec-not-found")) document.querySelector("#zchain-data-sec-not-found").hidden=true;
    if(i){
        var p = document.createElement("p");
        p.innerHTML="zblock: " +i;
        divs.appendChild(p);
    }
    lse.appendChild(sta);
    url = 'https://ipfs.arching-kaos.com/ipfs/'+i;
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
                var divs = document.querySelector('#zchain-data-section');
                if(json.block){
                    var p = document.createElement("p");
                    p.innerHTML="Block: " +json.block;
                    p.id=i;
                    divs.appendChild(p);
                }
                if(json.block_signature){
                    var p = document.createElement("p");
                    p.innerHTML="Signature: " +json.block_signature;
                    divs.appendChild(p);
                }
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                seekblock(json.block,i);
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
    console.log("Executing...",a,d,j,x,y,z)
    var sta = document.createElement("pre");
    sta.innerHTML = "Executing block "+d+"...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    gurl = 'https://ipfs.arching-kaos.com/ipfs/'
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
                        h3.innerHTML = json.filename;
                        art.appendChild(h3);
                    }
                    if(json.datetime){
                        var small = document.createElement("p");
                        small.innerHTML="Published: " +json.datetime;
                        art.appendChild(small);
                    }
                    for (let i  in participants){
                        if ( participants[i].gpg === j.gpg ){
                            if (participants[i].profile.nickname){
                                var small = document.createElement("p");
                                small.innerHTML="Author: " +participants[i].profile.nickname;
                                art.appendChild(small);
                            }
                        }
                    }
                    if(json.ipfs){
                    //    getipfstext(json.ipfs,art.id);
                        var small = document.createElement("a");
                        small.innerHTML=json.filename;
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
                        h3.innerHTML = json.title;
                        art.appendChild(h3);
                    }
                    if(json.datetime){
                        var small = document.createElement("p");
                        small.innerHTML="Published: " +json.datetime;
                        art.appendChild(small);
                    }
                    for (let i  in participants){
                        if ( participants[i].gpg === j.gpg ){
                            if (participants[i].profile.nickname){
                                var small = document.createElement("p");
                                small.innerHTML="Author: " +participants[i].profile.nickname;
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
                        h3.innerHTML = json.title;
                        art.appendChild(h3);
                    }
                    if(json.artist){
                        var h4 = document.createElement("h4");
                        h4.innerHTML = json.artist;
                        art.appendChild(h4);
                    }
                    if(json.datetime){
                        var small = document.createElement("small");
                        small.innerHTML="Published: " +json.datetime;
                        art.appendChild(small);
                    }
                    if(json.ipfs){
                        var audio = document.createElement("audio");
                        audio.setAttribute('controls','');
                        var source = document.createElement("source");
                        source.src = 'https://ipfs.arching-kaos.com/ipfs/' + json.ipfs;
                        audio.appendChild(source);
                        art.appendChild(audio);
                    }
                    if (document.querySelector("#mixtapes-sec-not-found")) document.querySelector("#mixtapes-sec-not-found").hidden=true;
                    divs.appendChild(art);
                }
                else {
                    console.log("Found unknown module/action: "+a);
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
    url = 'https://ipfs.arching-kaos.com/ipfs/'+ipfs;
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
                    pre.innerHTML = marked.parse(newtext);
                    divs.appendChild(pre);
                }
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                //    seekblock(json.block)
            })
        }
    })
}
// Whatever function XD
function readit(i){
    console.log(i);
}

var stellar_connection_status = 0;

// Put it there. in the field
function putKeyToField(k){
    let base = document.querySelector("#stellar-freigher-connect-address-button");
    stellar_connection_status = 1;
    dataf(k);
    base.innerHTML=k;
    base.onclick='';
}

function showStellar(){
    if (stellar_connection_status === 1 ){
        document.querySelector("#stellar-balances-link").hidden=false;
        document.querySelector("#stellar-data-config-link").hidden=false;
        document.querySelector("#arching-kaos-id-link").hidden=false;
        document.querySelector("#mypage-section-link").hidden=false;
    }
}

// Hide stellar stuff if no freighter
if (!window.freighterApi.isConnected()) {
    document.querySelector("#stellar-freigher-connect-address-button").hidden=true;
}

function hideStellar(){
    document.querySelector("#stellar-balances-link").hidden=true;
    document.querySelector("#stellar-data-config-link").hidden=true;
    document.querySelector("#arching-kaos-id-link").hidden=true;
    document.querySelector("#mypage-section-link").hidden=true;
}

hideStellar();

// That's how we get the publicKey
const retrievePublicKey = async () => {
    let publicKey = "";
    let error = "";

    try {
        publicKey = await window.freighterApi.getPublicKey()
        .then(publicKey => {putKeyToField(publicKey);letme(publicKey)});
    } catch (e) {
        error = e;
    }
    if (error) {
        return error;
    }
    return publicKey;
};

// Function that initiates the connection with the Wallet ( we just read )
function connect(){
    console.log("When pressed: "+stellar_connection_status);
    if ( stellar_connection_status === 1 ){
        showStellar();
    } else {
        const result = retrievePublicKey();
    }
    console.log("After "+stellar_connection_status);
}

var localnode = "https://aka.arching-kaos.net:8610/v0/zlatest";

/*
 * Get latest block from localnode
 * If any, adds its contents to the page
 */
function ringlocalbell(){
    var sta = document.createElement("pre");
    sta.innerHTML = "Ringing local bell...";
    logtextPlaceholder.innerHTML = sta.innerHTML;
    lse.appendChild(sta);
    var url=localnode;
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                seekzblock(json.zlatest);
            })
        }
        sta.innerHTML+=" Done!";
    })
}

ringlocalbell();
// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
