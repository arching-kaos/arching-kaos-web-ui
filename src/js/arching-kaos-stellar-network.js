
function getNumberOfTrustlinesAndRenderThem(json){
    var number = json._embedded.records[0].accounts.authorized;
    var stats = document.querySelector('.stellar-network').querySelector('summary');

    if(!document.querySelector("#stellar-participants-sum")){
        var small = document.createElement("span");
        small.id = 'stellar-participants-sum';
        stats.appendChild(small);
    }
    document.querySelector("#stellar-participants-sum").innerText = ' (' + number + ')';
    archingKaosLog("Loading trustlines... Found "+number+"!");
    progressPlaceholder.value++;
    stellarParticipants=number;
    stellarParticipantsScanned=number;
}

function renderStellarAddress(stellarAddress){
    if (!document.querySelector('.stellar-network').querySelector('#'+stellarAddress)){
        var stats = document.querySelector('.stellar-network');
        var d = document.createElement("details");
        d.className = "stellar-address";
        var s = document.createElement("summary");
        s.innerText = stellarAddress;
        d.id = stellarAddress;
        d.appendChild(s);
        stats.appendChild(d);
    }
}

function renderStellarAddressesAndProceed(json){
    var records = json._embedded.records;
    for ( index in records ){
        holders.push(records[index].account_id);
        progressPlaceholder.max++;
        renderStellarAddress(records[index].account_id);
        checkAddressForConfigurationVariable(records[index].account_id);
    }
    if (json._links.next) getHolders(json._links.next.href);
}

function renderConfigurationIPNSLinkAndProceed(json, stellarAddress){
    renderStellarAddress(stellarAddress);
    document.querySelector('#'+stellarAddress).style="color: #3dbb3d;"
    stellarNetworkConfiguredAddresses += 1;
    console.log(atob(json.value));
    console.log(stellarAddress);
    getConfiguration(atob(json.value),stellarAddress);
}

function getTrustlines(){
    archingKaosLog("Loading trustlines...");
    archingKaosFetchJSON(getTrustlinesURL(), getNumberOfTrustlinesAndRenderThem);
}

function getHolders(a=0){
    var doIt = true
    archingKaosLog("Searching holders...");
    var url = '';
    if ( a === 0 ) {
        url=getHoldersOfActiveAssetURL();
    } else {
        if ( lastPage === '' ) {
            url = a;
        } else {
            if ( a !== lastPage ) {
                url = a;
            } else {
                doIt = false;
            }
        }
    }
    lastPage=url;
    if (doIt) {
        archingKaosFetchJSON(url, renderStellarAddressesAndProceed);
    }
    archingKaosLog("Searching holders... Done!");
}

function getStellarConfigurationVariableURL(stellarAddress){
    return activeSettings.horizonAddresses[activeSettings.horizonSelectedAddress]+
        'accounts/'+
        stellarAddress+
        '/data/'+
        activeSettings.stellarConfigVars[activeSettings.stellarDefaultConfig];
}

function checkAddressForConfigurationVariable(stellarAddress) {
    archingKaosLog("Checking configuration for "+ stellarAddress+ "...");
    archingKaosFetchJSON(getStellarConfigurationVariableURL(stellarAddress), renderConfigurationIPNSLinkAndProceed, stellarAddress);
    progressPlaceholder.value++;
}

var server = new StellarSdk.Server(activeSettings.horizonAddresses[activeSettings.horizonSelectedAddress], {allowHttp:true});
function steptwo(r){
    const L = r;
    putit(L);
}
function letme(a){
    server.accounts()
    .accountId(a)
    .call()
    .then(
        steptwo(r)
    );
}

function putit(i){
    var ta=document.querySelector("#stellar-balances-table");
    for (b in i.balances) {
        var row = document.createElement("tr");
        x = i.balances[b];
        var amount = document.createElement("td");
        var assetCode = document.createElement("td");
        amount.innerText = x.balance;
        assetCode.innerText = ( x.asset_code && x.asset_code != "undefined" ? x.asset_code : 'XLM');
        row.appendChild(assetCode);
        row.appendChild(amount);
        ta.appendChild(row);
        progressPlaceholder.max++;
        progressPlaceholder.value++;
        if(document.querySelector("#stellar-balances-not-found")) document.querySelector("#stellar-balances-not-found").hidden = true;
    }
}

async function fetchNodeInfoFromClientWallet(stellarAddress){
    archingKaosLog("Loading your profile...");
    fetch(getStellarConfigurationVariableURL(stellarAddress), {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                var cnf = document.createElement("p");
                cnf.innerText = atob(json.value);
                document.querySelector('#stellar-data-config').appendChild(cnf);
                progressPlaceholder.max++;
                progressPlaceholder.value++;
                getConfiguration(atob(json.value),stellarAddress);
            })
        }
    })
}

function putKeyToField(k){
    let base = document.querySelector("#stellar-freigher-connect-address-button");
    stellar_connection_status = 1;
    checkAddressForConfigurationVariable(k);
    base.innerText=k;
    base.onclick='';
}

// TODO: Clarify which parts of here will be needed
//function showStellar(){
//    if (stellar_connection_status === 1 ){
//        document.querySelector("#stellar-balances-link").hidden=false;
//        document.querySelector("#stellar-data-config-link").hidden=false;
//        document.querySelector("#arching-kaos-node-info-link").hidden=false;
//        document.querySelector("#mypage-section-link").hidden=false;
//    }
//}
// TODO: (follow up) eg below
// Hide stellar stuff if no freighter
//if (!window.freighterApi.isConnected()) {
//    document.querySelector("#stellar-freigher-connect-address-button").hidden=true;
//}
//
//function hideStellar(){
//    document.querySelector("#stellar-balances-link").hidden=true;
//    document.querySelector("#stellar-data-config-link").hidden=true;
//    document.querySelector("#arching-kaos-node-info-link").hidden=true;
//    document.querySelector("#mypage-section-link").hidden=true;
//}
//
//hideStellar();

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

function connect(){
//    if ( stellar_connection_status === 1 ){
//        showStellar();
//    } else {
        const result = retrievePublicKey();
//        console.log(result);
//    }
}

function scanStellarNetworkForPeers(){
    getTrustlines();
    getHolders();
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
