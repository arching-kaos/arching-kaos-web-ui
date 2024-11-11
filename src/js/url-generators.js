/* Arching Kaos URL Generators
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
/*
 * URL generators
 *
 * This file contains functions that generate URL
 * based on the activeSettings.
 *
 * Apparently, we need `arching-kaos-web-ui-settings` to be loaded first
 *
 */

function getIPNSURL(ipnsKey){
    return activeSettings.ipfs.gateway.list[activeSettings.ipfs.gateway.active]+'ipns/'+ipnsKey;
}

function getIPFSURL(ipfsHash){
    return activeSettings.ipfs.gateway.list[activeSettings.ipfs.gateway.active]+'ipfs/'+ipfsHash;
}

function getHoldersOfActiveAssetURL(){
    return activeSettings.stellar.horizon.list[activeSettings.stellar.horizon.active]+
        'accounts?asset='+
        activeSettings.stellar.asset.list[activeSettings.stellar.asset.active].code+
        ':'+
        activeSettings.stellar.asset.list[activeSettings.stellar.asset.active].issuer+
        '&limit=200';
}

function getTrustlinesURL(code=null, issuer=null){
    var code = (code === null)? activeSettings.stellar.asset.list[activeSettings.stellar.asset.active].code : code;
    var issuer = (issuer === null) ? activeSettings.stellar.asset.list[activeSettings.stellar.asset.active].issuer : issuer;
    return activeSettings.stellar.horizon.list[activeSettings.stellar.horizon.active]+
        'assets?asset_code='+code+
        '&asset_issuer='+issuer;
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
// @license-end
