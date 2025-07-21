// Arching Kaos Stellar Network
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { archingKaosLog } from "./arching-kaos-log.js";
import { archingKaosFetchJSON } from "./arching-kaos-fetch.js";
import {
    getStellarConfigurationVariableURL,
    getTrustlinesURL,
    getHoldersOfActiveAssetURL
} from "./url-generators.js";

import { progressPlaceholder } from "./app.js";

import {
    increaseStellarNetworkConfiguredAddresses,
    addToFoundHolders,
    setStellarParticipants,
    setStellarParticipantsScanned
} from "./environment-setup.js";

import { makeElement } from "./arching-kaos-generator.js";
import { getConfiguration } from "./arching-kaos-tools.js";
import { debugLog } from "./utils.js";

var lastPage = '';

function getNumberOfTrustlinesAndRenderThem(json){
    var number = json._embedded.records[0].accounts.authorized;
    var stats = document.querySelector('.stellar-network').querySelector('summary');

    if(!document.querySelector("#stellar-participants-sum")){
        makeElement({element: "span", id: 'stellar-participants-sum', innerText: `( ${number} )`}, stats);
    }
    archingKaosLog("Loading trustlines... Found "+number+"!");
    progressPlaceholder().value++;
    setStellarParticipants(number);
    setStellarParticipantsScanned(number);
}

function renderStellarAddress(stellarAddress){
    if (!document.querySelector('.stellar-network').querySelector('#'+stellarAddress)){
        var stats = document.querySelector('.stellar-network');
        var d = {
            element:"details",
            className:"stellar-address",
            innerHTML:[
                {element:"summary", innerText:stellarAddress, id:stellarAddress}
            ]
        };
        makeElement(d, stats);
    }
}

function renderStellarAddressesAndProceed(json){
    var records = json._embedded.records;
    for ( var i = 0; i < records.length; i++ ){
        addToFoundHolders(records[i].account_id);
        progressPlaceholder().max++;
        renderStellarAddress(records[i].account_id);
        checkAddressForConfigurationVariable(records[i].account_id);
    }
    if (json._links.next) getHolders(json._links.next.href);
}

function renderConfigurationLinkAndProceed(json, stellarAddress){
    renderStellarAddress(stellarAddress);
    document.querySelector('#'+stellarAddress).style="color: #3dbb3d;"
    increaseStellarNetworkConfiguredAddresses();
    debugLog(atob(json.value));
    debugLog(stellarAddress);
    var key = json.value
    const base64Regex = /^[A-Z0-9+\/=]{28}/i;
    if (base64Regex.test(atob(key)))
    {
        getConfiguration(atob(key), stellarAddress);
    }
    else
    {
        getConfiguration(atob(key),stellarAddress);
    }
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
        archingKaosFetchJSON(url, renderStellarAddressesAndProceed, null);
    }
    archingKaosLog("Searching holders... Done!");
}

function checkAddressForConfigurationVariable(stellarAddress) {
    archingKaosLog("Checking configuration for "+ stellarAddress+ "...");
    archingKaosFetchJSON(getStellarConfigurationVariableURL(stellarAddress), renderConfigurationLinkAndProceed, stellarAddress);
    progressPlaceholder().value++;
}

function steptwo(i){
    var ta=document.querySelector("#stellar-balances-table");
    for (b in i.balances) {
        x = i.balances[b];
        var amount = {
            element:"tr",
            innerHTML:[
                { element:"td", innerText: x.balance },
                { element:"td", innerText: ( x.asset_code && x.asset_code != "undefined" ? x.asset_code : 'XLM')}
            ]
        }
        makeElement(amount, ta);
        progressPlaceholder().max++;
        progressPlaceholder().value++;
        if(document.querySelector("#stellar-balances-not-found")) document.querySelector("#stellar-balances-not-found").hidden = true;
    }
}

function letme(a){
    debugLog("HERE WE GO");
    server.accounts()
    .accountId(a)
    .call()
    .then(
        steptwo(r)
    );
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
                var cnf = {
                    element:"p",
                    innerText:atob(json.value)
                };
                makeElement(cnf, document.querySelector('#stellar-data-config'));
                progressPlaceholder().max++;
                progressPlaceholder().value++;
                key = json.value
                regex= /[a-zA-Z0-9+\/=]{29}/
                const base64Regex = /^[A-Z0-9+\/=]{28}/i;
                if (base64Regex.test(atob(key)))
                {
                    getConfiguration(atob(key), stellarAddress);
                }
                else
                {
                    getConfiguration(atob(key),stellarAddress);
                }
            });
        }
    });
}

function putKeyToField(k){
    const address = k;
    var base = document.querySelector("#stellar-freigher-connect-address-button");
    base.innerText=address;
    base.onclick='';
    stellar_connection_status = 1;
    checkAddressForConfigurationVariable(k);
}

// That's how we get the publicKey
const retrievePublicKey = async () => {
    let publicKey = "";
    let error = "";
    try {
        publicKey = await window.freighterApi.getPublicKey()
        .then((publicKey) => {putKeyToField(publicKey);letme(publicKey)});
    } catch (e) {
        error = e;
    }
    if (error) {
        return error;
    }
    return publicKey;
};

export function connect(){
//    if ( stellar_connection_status === 1 ){
//        showStellar();
//    } else {
        const result = retrievePublicKey();
//        debugLog(result);
//    }
}

export function scanStellarNetworkForPeers(){
    getTrustlines();
    getHolders();
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
// @license-end
