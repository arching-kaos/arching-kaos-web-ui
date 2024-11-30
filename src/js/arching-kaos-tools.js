/* Arching Kaos Tools
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
import { archingKaosLog } from "./arching-kaos-log.js";
import { makeElement } from "./arching-kaos-generator.js";
import { progressPlaceholder, resultsArea, aknet } from "./app.js";
import { archingKaosFetchJSON } from "./arching-kaos-fetch.js";
import { getIPFSURL, getIPNSURL } from "./url-generators.js";
import {
    stellarParticipantInfo,
    getStellarParticipantsScanned,
    getStellarNetworkConfiguredAddresses,
    setFullZblock,
    setZblock,
    setData,
    getParticipants,
    setZchainLoadingStatus,
    getZchainLoadingStatuses,
    setSortedMixtapes,
    getMixtapes,
    increaseZchainsFound,
    setZchain
} from "./environment-setup.js";
import { akModuleComments } from "./arching-kaos-modules-comments.js";
import { akModuleFiles } from "./arching-kaos-modules-files.js";
import { akModuleMixtapes } from "./arching-kaos-modules-mixtapes.js";
import { akModuleNews } from "./arching-kaos-modules-news.js";
import { storeReference, resolveReferences } from "./arching-kaos-modules-references.js";
import { getSettings } from "./arching-kaos-web-ui-settings.js";

var settings = getSettings();

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
    const title = {
        element:'h3',
        innerText : "Result"
    };
    makeElement(title, overlay);
    var closeButton = {
        element:'button',
        innerHTML: 'x',
        id:"buttonCloseResult"
    };
    makeElement(closeButton, overlay);
    makeElement(found, overlay);
    makeElement(overlay, resultsArea());
    closeButton = document.querySelector('#buttonCloseResult');
    closeButton.addEventListener("click", ()=>{
        document.querySelector('#unique-overlay').remove();
    });
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
    console.log(json);
    const keys = Object.keys(json);
    for( var i = 0; i < keys.length; i++ )
    {
        if ( typeof(json[keys[i]]) === "string" ) {
            if(!document.querySelector('#'+keys[i]+'-'+stellarAddress)){
                var p = {
                    element:"p",
                    id: `${keys[i]}-${stellarAddress}`,
                    innerText: `${keys[i]}: ${json[keys[i]]}`
                };
                makeElement(p, divs);
            }
        }
        else if ( typeof(json[keys[i]]) === "Object"||"Array" ) {
            nodeInfoRender(json[keys[i]], stellarAddress);
        }
    }
}

function nodeInfoRenderAndProceed(json, stellarAddress){
    nodeInfoRender(json, stellarAddress);
    stellarParticipantInfo(stellarAddress, json);
    if ( getStellarParticipantsScanned() === 0 ) {
        archingKaosLog('Scanned all Stellar participants');
    }
    progressPlaceholder().value++;
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
        var p = {
            element:"p",
            innerText:"Block: " +json.block,
            id:zblockIPFSHash
        };
        makeElement(p, zblockElement);
    }
    if(json.block_signature){
        var p = {
            element:"p",
            innerText:"Signature: " +json.block_signature
        };
        makeElement(p, zblockElement);
    }
    progressPlaceholder().max++;
    progressPlaceholder().value++;
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
    var detailsPlace = document.querySelector('#zb-'+zblockIPFSHash);
    if(json.action){
        var p = {
            element:"p",
            innerText:"Action: " +json.action
        };
        if(detailsPlace!== null) makeElement(p, detailsPlace);
    }
    if(json.detach){
        var p = {
            element:"p",
            innerText:"Detach: " +json.detach
        };
        if(detailsPlace!== null) makeElement(p, detailsPlace);
    }
    if(json.gpg){
        var p = {
            element:"p",
            innerText:"GPG: " +json.gpg
        };
        if(detailsPlace!== null) makeElement(p, detailsPlace);
    }
    if(json.data){
        var p = {
            element:"p",
            innerText:"Data: ",
            innerHTML:[
                { element:"a", href: getIPFSURL(json.data), innerText: json.data }
            ]
        };
        if(detailsPlace!== null) makeElement(p, detailsPlace);
    }
    if(json.timestamp){
        var p = {
            element:"p",
            innerText:"Timestamp: " +json.timestamp + " [" + new Date(json.timestamp*1000) + "]"
        };
        if(detailsPlace!== null) makeElement(p, detailsPlace);
    }
    if(json.previous){
        var p = {
            element:"p",
            innerText:"Previous: " +json.previous
        };
        if(detailsPlace!== null) makeElement(p, detailsPlace);
    }
    progressPlaceholder().value++;
    exe(json.action,json.data,json,zblockIPFSHash,group,zblockObject,recursive);
    if ( checkIfGenesis(json.previous) ){
        archingKaosLog("Done loading " + group + " zchain!")
        progressPlaceholder().value++;
        setZchainLoadingStatus(group, {loading: "completed"});
        if ( getZchainLoadingStatuses().length === getStellarNetworkConfiguredAddresses()){
            var x=0;
            for ( var element = 0; element < getZchainLoadingStatuses().length; element++ ) {
                if ( getZchainLoadingStatuses()[element].loading === "completed" ){
                    x++;
                }
            }
            if ( x === getZchainLoadingStatuses().length ){
                archingKaosLog("Everything is completed!");
                setSortedMixtapes(getMixtapes().sort(mixtapeSorting));
            }
        }
        resolveReferences();
        //radioLoad();
    } else {
        console.log("deep in :" +group);
        if (recursive) seekZblock(json.previous, [group]);
    }
}

export function getConfiguration(nodeInfoIPNSLink,stellarAddress){
    progressPlaceholder().max++;
    archingKaosLog("Parsing the configuration...")
    archingKaosFetchJSON(getIPNSURL(nodeInfoIPNSLink), nodeInfoRenderAndProceed, stellarAddress)
}

function seekZchain(zchainIPNSLink,stellarAddress,json){
    var divs = document.querySelector('#zchain-data-section');
    var details = 0;
    if ( document.querySelector('#zd-' + zchainIPNSLink) === null ){
        details = {
            element:"details",
            id : 'zd-' + zchainIPNSLink,
            className : 'zchain-details'
        };
        makeElement(details, divs);
    }
    details = document.querySelector('#zd-' + zchainIPNSLink);

    if(zchainIPNSLink){
        var p = {
            element:"summary",
            innerText:"zchain: " + zchainIPNSLink
        };
        makeElement(p, details);
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
    // detailsPlace = document.querySelector('#zb-'+zblockIPFSHash);
    progressPlaceholder().max++;
    archingKaosFetchJSON(
        getIPFSURL(blockIPFSHash),
        blockRenderAndProceed,
        [group, zblockIPFSHash, blockIPFSHash, zblockObject, recursive]
    );
}

export function getNicknameAssossiatedWithGPG(gpgIPFSHash){
    const participants = getParticipants();
    for (var i = 0; i < participants.length; i++)
    {
        if ( participants[i].gpg === gpgIPFSHash )
        {
            if (participants[i].profile.nickname !== 'undefined')
            {
                return participants[i].profile.nickname;
            }
            else
            {
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
        var details = {
            element:"details",
            id : 'zd-' + group,
            className : 'zchain-details',
            innerHTML:[
                { element:'summary', innerText: group }
            ]
        };
        makeElement(details, divs);
    } else {
        //console.log('Else got hit in seekZchain');
        return 0;
    }
}

function renderZblockUnderGroup(zblock, group){
    const divs = document.querySelector('#zd-' + group);
    var zblockElement = {
        element:"article",
        id: "zb-"+zblock,
        innerHTML:[
            { element:"p", innerText:"zblock: "+zblock }
        ]
    };
    makeElement(zblockElement, divs);
}

export function seekZblock(zblockIPFSHash, params){
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
        resultsArea().appendChild(button);
    }
}

function saveDataAndFullZblocks(json,params){
    const [action, group, zblockIPFSHash, zblockObject, blockObject, references, recursive] = params;
    setFullZblock(zblockIPFSHash, {
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
    });
    setZblock(group, zblockIPFSHash);
    setData(blockObject.data, json);
    progressPlaceholder().max++;
    progressPlaceholder().value++;
}

function doStuffWithFetchedDataBlock(json, params){
    saveDataAndFullZblocks(json, params);
    renderZblockAsModule(json, params);
}

function exe(action,dataIPFSHash,blockObject,zblockIPFSHash,group,zblockObject,recursive){
    archingKaosLog(`Render ZBLOCK ${zblockIPFSHash} as ${action}  ...`);
    archingKaosFetchJSON(
        getIPFSURL(dataIPFSHash),
        doStuffWithFetchedDataBlock,
        [action, group, zblockIPFSHash, zblockObject, blockObject, null, recursive]
    );
}

export function getPreviewText(text, params)
{
    var [ articleid ] = params;
    var divs = document.querySelector(articleid);
    if(text){
        var newtext = text.substring(0, 500);
        var pre = {
            element:"div",
            className:"news-text",
            innerHTML:DOMPurify.sanitize(marked.parse(newtext))
        };
        makeElement(pre, divs);
    }
}

export function getFullText(text, params)
{
    var [ articleid ] = params;
    var divs = document.querySelector(articleid);
    if(text){
        var pre = {
            element:"div",
            className:"news-text",
            innerHTML:DOMPurify.sanitize(marked.parse(text))
        };
        makeElement(pre, divs);
    }
}

function checkIfZchainAndProceed(json, params){
    const [group] = params;
    if (json.zlatest) {
        if (!aknet().querySelector('#ak-zchain-'+json.zchain)){
            var pre = {
                element:"pre",
                innerText:json.zchain,
                id:'ak-zchain-'+json.zchain
            };
            makeElement(pre, aknet());
        }
    }
    seekZblock(json.zlatest, [group, true]);
}

function sblockExpanding(json, args){
    const [sblockHash] = args;
    if (json.zblocks){
        for ( var zblock = 0; zblock < json.zblocks.length; zblock++ ){
            seekZblock(json.zblocks[zblock],sblockHash,false);
            archingKaosLog("Found "+json.zblocks[zblock]+" of "+sblockHash);
        }
    }
    if (json.zpairs){
        for ( var pair = 0; pair < json.zpairs.length; pair++ ){
            seekZchain(json.zpairs[pair].latest,json.zpairs[pair].zchain,true);
            archingKaosLog("Found "+json.zblocks[zblock]+" of "+json.zpairs[pair].zchain);
        }
    }
    if (json.previous) {
        crawlSchain(json.previous);
    }
}

function crawlSchain(sblockHash){
    var shatest = /0{128}/
    if ( shatest.test(sblockHash) ){
        console.log('genesis!!!');
    } else {
        setZchainLoadingStatus(sblockHash, {loading : "started"});
        increaseZchainsFound();
        setZchain(sblockHash, [])
        var url=settings.ak.connect.list[settings.ak.connect.active]+'/v0/sblock/'+sblockHash;
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
    for ( var peer = 0; peer < json; peer++){
        archingKaosLog("Checking peer: "+json[peer].cjdns.ip)
        checkIfZchainAndProceed(json[peer].node_info, [json[peer].node_info.gpg]);
    }
}

export function checkLocalPeers(){
    archingKaosLog("🔎 Querying for peers...");
    var url=settings.ak.connect.list[settings.ak.connect.active]+'/v0/peers';
    archingKaosFetchJSON(url, checkPeers);
    archingKaosLog("Querying for peers... Done!");
}

export function checkLocalNodeInfo(){
    archingKaosLog("Ringing local bell...");
    var url=settings.ak.connect.list[settings.ak.connect.active]+'/v0/node_info';
    archingKaosFetchJSON(url, checkIfZchainAndProceed, ["localnode"]);
    archingKaosLog("Ringing local bell... Done!");
}

export function checkLocalSchain(){
    archingKaosLog("Querying for schain...");
    console.log(settings);
    var url=settings.ak.connect.list[settings.ak.connect.active]+'/v0/slatest';
    console.log(url);
    archingKaosFetchJSON(url, initCrawlSchain);
    archingKaosLog("Querying for schain... Done!");
}

async function ringlocalbell(){
      checkLocalNodeInfo();
//    checkLocalPeers();
//    checkLocalSchain();
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
// @license-end
