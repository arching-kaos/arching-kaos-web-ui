
function getNumberOfTrustlinesAndRenderThem(json){
    var number = json._embedded.records[0].accounts.authorized;
    var stats = document.querySelector('.stellar-network').querySelector('summary');
    var small = document.createElement("span");
    small.innerText = ' (' + number + ')';
    stats.appendChild(small);
    archingKaosLog("Loading trustlines... Found "+number+"!");
    progressPlaceholder.value++;
    stellarParticipants=number;
}
function renderStellarAddressesAndProceed(json){
    var stats = document.querySelector('.stellar-network');
    json._embedded.records.forEach(r=>{
        var p = document.createElement("div");
        p.className = "stellar-address";
        p.innerText = r.account_id;
        console.log(r);
        p.id = r.account_id;
        holders.push(r.account_id);
        progressPlaceholder.max++;
        checkAddressForConfigurationVariable(r.account_id);
        stats.appendChild(p);
    })
    if (json._links.next) getHolders(json._links.next.href);
}
function renderConfigurationIPNSLinkAndProceed(json, stellarAddress){
    var cnf = document.createElement("p");
    if(document.querySelector("#stellar-data-config-not-found")){
        document.querySelector("#stellar-data-config-not-found").hidden = true;
    }
    cnf.innerText = atob(json.value)
    document.querySelector('#'+stellarAddress).appendChild(cnf)
    document.querySelector('#'+stellarAddress).style="color: #3dbb3d;"
    stellarNetworkConfiguredAddresses += 1;
    getConfiguration(atob(json.value),stellarAddress)
}

/*
 * Get Trustlines for ARCHINGKAOS asset
 * Returns DOM element with number of trustlines
 */
function getTrustlines(){
    archingKaosLog("Loading trustlines...");
    archingKaosFetchJSON(getTrustlinesURL(), getNumberOfTrustlinesAndRenderThem);
}

/*
 * Get addresses that trust the asset
 * Limit is 200 addresses cause horizon API limitations.
 *
 * Returns div DOM elements for each found address, embedding
 * the address both in innerText and in id of the div.
 */
// var lastPage = '';
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

/*
 * Function that checks the address' variable 'config' to see
 * if it's set up.
 *
 * Returns the IPNS link in the DOM as p element and proceeds to
 * get nickname from the variables
 */
function checkAddressForConfigurationVariable(stellarAddress) {
    archingKaosLog("Checking configuration for "+ stellarAddress+ "...");
    archingKaosFetchJSON(getStellarConfigurationVariableURL(stellarAddress), renderConfigurationIPNSLinkAndProceed, stellarAddress);
    progressPlaceholder.value++;
}

/*
 * We now connect our client to horizon
 */
var server = new StellarSdk.Server(activeSettings.horizonAddresses[activeSettings.horizonSelectedAddress]);
// We ask for the 'a' stellar address the balances
function letme(a){
    server.accounts()
    .accountId(a)
    .call().then(function(r){ const L = r; putit(r); });
}
// We print them
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
// We also search for a config file and display it
/*
 * Seeks to find an IPNS link under the 'config' variable of an i Stellar
 * Address.
 *
 * Outputs found value if any under #stellar-data-config
 * Adds to progressPlaceholder.
 * Moves on to retrieve the found link 
 *
 */
async function fetchAKIDFromClientWallet(stellarAddress){
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

// var stellar_connection_status = 0;

// Put it there. in the field
function putKeyToField(k){
    let base = document.querySelector("#stellar-freigher-connect-address-button");
    stellar_connection_status = 1;
    fetchAKIDFromClientWallet(k);
    base.innerText=k;
    base.onclick='';
}

// TODO: Clarify which parts of here will be needed
//function showStellar(){
//    if (stellar_connection_status === 1 ){
//        document.querySelector("#stellar-balances-link").hidden=false;
//        document.querySelector("#stellar-data-config-link").hidden=false;
//        document.querySelector("#arching-kaos-id-link").hidden=false;
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
//    document.querySelector("#arching-kaos-id-link").hidden=true;
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

// Function that initiates the connection with the Wallet ( we just read )
function connect(){
    if ( stellar_connection_status === 1 ){
        showStellar();
    } else {
        const result = retrievePublicKey();
    }
}

function scanStellarNetworkForPeers(){
    getTrustlines();
    getHolders();
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
