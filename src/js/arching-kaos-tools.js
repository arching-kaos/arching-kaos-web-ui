function getArrayLength(array){
    var length = 0;
    for ( e in array ) {
        length++;
    }
    return length;
}

function showResult(id){
    const found = document.querySelector(`#${id}`).cloneNode(true);
    const overlay = document.createElement('div');
    overlay.id = 'unique-overlay';
    const title = document.createElement('h3');
    title.innerText = "Result";
    overlay.appendChild(title);
    const closeButton = document.createElement('button');
    closeButton.onclick = ()=>{
        document.querySelector('#unique-overlay').remove();
    };
    closeButton.innerHTML = 'x';
    overlay.appendChild(closeButton);
    overlay.appendChild(found);
    resultsArea.appendChild(overlay);
}

function renderStellarAddressPlaceholder(stellarAddress){
    var divs = document.querySelector('#'+stellarAddress);
    if ( divs === null ){
        var details = document.createElement('details');
        details.id = '#'+stellarAddress;
        var summary = document.createElement('summary');
        summary.innerText = stellarAddress;
        details.appendChild(summary);
        document.querySelector('.stellar-network').appendChild(details);
    }
    divs = document.querySelector('#'+stellarAddress);
    return divs;
}

function nodeInfoRender(json, stellarAddress){
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
            nodeInfoRender(json[Object.keys(json)[key]], stellarAddress);
        }
    }
}

function nodeInfoRenderAndProceed(json, stellarAddress){
    nodeInfoRender(json, stellarAddress);
    participants[stellarAddress]=json;
    if ( stellarParticipantsScanned === 0 ) {
        archingKaosLog('Scanned all Stellar participants');
    }
    progressPlaceholder.value++;
    if (json.zlatest) {
        seekZblock(json.zlatest, [json.gpg, json]);
    }
    //seekZchain(json.zchain,stellarAddress,json);
}

function renderZblockAndProceed(json, params){
    console.log(typeof(params))
    const [zblockIPFSHash, group, recursive] = params;
    console.log(group);
    var zblockElement = document.querySelector('#zb-'+zblockIPFSHash);
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
    //if (recursive) seekBlock(json.block,zblockIPFSHash,group,json);
    seekBlock(json.block,zblockIPFSHash,group,json,recursive);
}

function mixtapeSorting(a,b){
    return a.timestamp - b.timestamp
}

function blockRenderAndProceed(json, params){
    const [group, zblockIPFSHash, blockIPFSHash, zblockObject, recursive] = params;
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
    exe(json.action,json.data,json,zblockIPFSHash,group,zblockObject,recursive);
    if ( checkIfGenesis(json.previous) ){
        archingKaosLog("Done loading " + group + " zchain!")
        progressPlaceholder.value++;
        zchainLoadingStatus[group] = {loading: "completed"};
        if ( getArrayLength(zchainLoadingStatus) === stellarNetworkConfiguredAddresses){
            var x=0;
            for ( element in zchainLoadingStatus ) {
                if ( zchainLoadingStatus[element].loading === "completed" ){
                    x++;
                }
            }
            if ( x === getArrayLength(zchainLoadingStatus) ){
                archingKaosLog("Everything is completed!");
                sortedMixtapes = mixtapes.sort(mixtapeSorting);
            }
        }
        resolveReferences(references);
    } else {
        console.log("deep in :" +group);
        if (recursive) seekZblock(json.previous, [group]);
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

function getConfiguration(nodeInfoIPNSLink,stellarAddress){
    progressPlaceholder.max++;
    archingKaosLog("Parsing the configuration...")
    archingKaosFetchJSON(getIPNSURL(nodeInfoIPNSLink), nodeInfoRenderAndProceed, stellarAddress)
}

function seekZchain(zchainIPNSLink,stellarAddress,json){
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
    console.log(json)
    archingKaosFetchJSON(getIPNSURL(zchainIPNSLink), seekZblock, [zchainIPNSLink, stellarAddress, json]);
}

function checkIfGenesis(zblockIPFSHash){
    if(zblockIPFSHash==="QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH" || zblockIPFSHash === "genesis"){
        return true;
    } else {
        return false;
    }
}

function seekBlock(blockIPFSHash, zblockIPFSHash, group, zblockObject, recursive){
    console.log(blockIPFSHash);
    console.log(zblockIPFSHash);
    console.log(group);
    console.log(zblockObject);
    console.log(recursive);
    archingKaosLog("Seeking block "+blockIPFSHash+"...");
    detailsPlace = document.querySelector('#zb-'+zblockIPFSHash);
    progressPlaceholder.max++;
    archingKaosFetchJSON(
        getIPFSURL(blockIPFSHash),
        blockRenderAndProceed,
        [group, zblockIPFSHash, blockIPFSHash, zblockObject, recursive]
    );
}

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

function renderGroupOnDataSection(group){
    var divs = document.querySelector('#zchain-data-section');
    if (divs.querySelector("#zchain-data-sec-not-found")){
        divs.querySelector("#zchain-data-sec-not-found").remove();
    }
    if ( divs.querySelector('#zd-' + group) === null ){
        details = document.createElement("details");
        details.id = 'zd-' + group;
        details.className = 'zchain-details';
        var summary = document.createElement('summary');
        summary.innerText = group;
        details.appendChild(summary);
        divs.appendChild(details);
    } else {
        //console.log('Else got hit in seekZchain');
        return 0;
    }
}

function renderZblockUnderGroup(zblock, group){
    const divs = document.querySelector('#zd-' + group);
    var zblockElement = document.createElement("article");
    zblockElement.id = 'zb-' + zblock;
    if(zblock){
        var p = document.createElement("p");
        p.innerText="zblock: " + zblock;
        zblockElement.appendChild(p);
    }
    divs.appendChild(zblockElement);
}

function seekZblock(zblockIPFSHash, params){
    var [group, recursive=true] = params;
    console.log(params)
    console.log(group)
//    const [zchainIPNSLink, stellarAddress, recursive] = params;

    renderGroupOnDataSection(group);
    renderZblockUnderGroup(zblockIPFSHash, group);
    archingKaosLog("Seeking ZBLOCK " + zblockIPFSHash + "...");
//    if (recursive !== true || recursive !== false){
//        recursive = true;
//    }
    archingKaosFetchJSON(getIPFSURL(zblockIPFSHash), renderZblockAndProceed, [zblockIPFSHash, group, recursive]);
}

function getConfiguration(nodeInfoIPNSLink,stellarAddress){
    progressPlaceholder.max++;
    archingKaosLog("Parsing the configuration...")
    archingKaosFetchJSON(getIPNSURL(nodeInfoIPNSLink), nodeInfoRenderAndProceed, stellarAddress)
}

function renderZblockAsModule(json, params){
    const [action, group, zblockIPFSHash, zblockObject, blockObject, references, recursive] = params;
    if (action == "files/add") {
        akModuleFiles(zblockIPFSHash, blockObject, json);
    }
    else if (action == "news/add") {
        akModuleNews(zblockIPFSHash, zblockObject, blockObject, json);
    }
    else if (action == "comments/add") {
        akModuleComments(zblockIPFSHash,blockObject, json);
    }
    else if (action == "references/add"){
        storeReference(zblockIPFSHash, zblockObject, blockObject, json, references);
    }
    else if (action == "mixtape/add") {
        akModuleMixtapes(zblockIPFSHash, zblockObject, blockObject, json);
    }
    else {
        archingKaosLog(action + " module not found");
    }
    if (!recursive) {
        var button = document.createElement('button');
        button.innerText =`${action.split('/')[0]}-${zblockIPFSHash} 📖`;
        var params = `${action.split('/')[0]}-${zblockIPFSHash}`
        button.onclick = ()=>{
            showResult(params);
        };
        resultsArea.appendChild(button);
    }
}

function saveDataAndFullZblocks(json,params){
    const [action, group, zblockIPFSHash, zblockObject, blockObject, references, recursive] = params;
    fullZblocks[zblockIPFSHash]={
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
    zblocks[group] = new Array;
    zblocks[group].push(zblockIPFSHash);
    data[blockObject.data]=json;
    progressPlaceholder.max++;
    progressPlaceholder.value++;
}

function doStuffWithFetchedDataBlock(json, params){
    saveDataAndFullZblocks(json,params);
    renderZblockAsModule(json, params);
}

function exe(action,dataIPFSHash,blockObject,zblockIPFSHash,group,zblockObject,recursive){
    archingKaosLog(`Render ZBLOCK ${zblockIPFSHash} as ${action}  ...`);
    archingKaosFetchJSON(
        getIPFSURL(dataIPFSHash),
        doStuffWithFetchedDataBlock,
        [action, group, zblockIPFSHash, zblockObject, blockObject, references, recursive]
    );
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
                    pre.className="news-text";
                    var lines = text.split('\n');
                    // remove one line, starting at the first position
                    // lines.splice(0,1);
                    // join the array back into a single string
                    var newtext = lines.join('\n');
                    pre.innerHTML = DOMPurify.sanitize(marked.parse(newtext));
                    divs.appendChild(pre);
                }
            })
        }
    })
}

function checkIfZchainAndProceed(json, params){
    const [group] = params;
    if (json.zlatest) {
        if (!aknet.querySelector('#ak-zchain-'+json.zchain)){
            var a = document.createElement("pre");
            a.innerText=json.zchain;
            a.id='ak-zchain-'+json.zchain;
            aknet.appendChild(a);
        }
    }
    seekZblock(json.zlatest, [group, true]);
}

function sblockExpanding(json, args){
    const [sblockHash] = args;
    if (json.zblocks){
        for ( zblock in json.zblocks ){
            seekZblock(json.zblocks[zblock],sblockHash,false);
            archingKaosLog("Found "+json.zblocks[zblock]+" of "+sblockHash);
        }
    }
    if (json.zpairs){
        for ( pair in json.zpairs ){
            seekZchain(json.zpairs[pair].latest,json.zpairs[pair].zchain,true);
            archingKaosLog("Found "+json.zblocks[zblock]+" of "+json.zpairs[pair].zchain);
        }
    }
    if (json.previous) {
        crawlSchain(json.previous);
    }
}

function crawlSchain(sblockHash){
    shatest = /0{128}/
    if ( shatest.test(sblockHash) ){
        console.log('genesis!!!');
    } else {
        zchainLoadingStatus[sblockHash] = {loading : "started"};
        zchainsFound++;
        zchains[sblockHash] = [];
        var url=activeSettings.localAPI+'/v0/sblock/'+sblockHash;
        archingKaosLog("Fetching "+sblockHash+" sblock...");
        archingKaosFetchJSON(url, sblockExpanding, [sblockHash]);
        archingKaosLog("Fetching "+sblockHash+" sblock... Done!");
    }
}

function initCrawlSchain(json){
    if (json.latest_block){
        crawlSchain(json.latest_block);
        archingKaosLog("Diving in "+json.latest_block+" ...");
    } else {
        archingKaosLog("Can't dive ...");
    }
}

function checkPeers(json){
    for (peer in json){
        archingKaosLog("Checking peer: "+json[peer].cjdns.ip)
        checkIfZchainAndProceed(json[peer].node_info, [json[peer].node_info.gpg]);
    }
}

function checkLocalPeers(){
    archingKaosLog("🔎 Querying for peers...");
    var url=activeSettings.localAPI+'/v0/peers';
    archingKaosFetchJSON(url, checkPeers);
    archingKaosLog("Querying for peers... Done!");
}

function checkLocalNodeInfo(){
    archingKaosLog("Ringing local bell...");
    var url=activeSettings.localAPI+'/v0/node_info';
    archingKaosFetchJSON(url, checkIfZchainAndProceed, ["localnode"]);
    archingKaosLog("Ringing local bell... Done!");
}

function checkLocalSchain(){
    archingKaosLog("Querying for schain...");
    var url=activeSettings.localAPI+'/v0/slatest';
    archingKaosFetchJSON(url, initCrawlSchain);
    archingKaosLog("Querying for schain... Done!");
}

async function ringlocalbell(){
      checkLocalNodeInfo();
//    checkLocalPeers();
//    checkLocalSchain();
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
