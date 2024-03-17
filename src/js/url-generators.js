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
    return activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipns/'+ipnsKey;
}

function getIPFSURL(ipfsHash){
    return activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]+'ipfs/'+ipfsHash;
}

function getHoldersOfActiveAssetURL(){
    return activeSettings.horizonAddresses[activeSettings.horizonSelectedAddress]+
        'accounts?asset='+
        activeSettings.stellarAssetsForScanning[activeSettings.stellarDefaultAsset].code+
        ':'+
        activeSettings.stellarAssetsForScanning[activeSettings.stellarDefaultAsset].issuer+
        '&limit=200';
}

function getTrustlinesURL(code=null, issuer=null){
    var code = (code === null)? activeSettings.stellarAssetsForScanning[activeSettings.stellarDefaultAsset].code : code;
    var issuer = (issuer === null) ? activeSettings.stellarAssetsForScanning[activeSettings.stellarDefaultAsset].issuer : issuer;
    return activeSettings.horizonAddresses[activeSettings.horizonSelectedAddress]+
        'assets?asset_code='+code+
        '&asset_issuer='+issuer;
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
