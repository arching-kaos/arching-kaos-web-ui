// Arching Kaos URL Generators
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

/*
 * URL generators
 *
 * This file contains functions that generate URL
 * based on the settings.
 *
 * Apparently, we need `arching-kaos-web-ui-settings` to be loaded first
 *
 */
import { getSettings } from "./arching-kaos-web-ui-settings.js";

const settings = getSettings();

export function getStellarConfigurationVariableURL(stellarAddress)
{
    return settings.stellar.horizon.list[settings.stellar.horizon.active]+
        'accounts/'+
        stellarAddress+
        '/data/'+
        settings.stellar.variableNames.list[settings.stellar.variableNames.active];
}

export function getIPNSURL(ipnsKey)
{
    return settings.ipfs.gateway.list[settings.ipfs.gateway.active]+'ipns/'+ipnsKey;
}

export function getIPFSURL(ipfsHash)
{
    return settings.ipfs.gateway.list[settings.ipfs.gateway.active]+'ipfs/'+ipfsHash;
}

export function getHoldersOfActiveAssetURL()
{
    return settings.stellar.horizon.list[settings.stellar.horizon.active]+
        'accounts?asset='+
        settings.stellar.asset.list[settings.stellar.asset.active].code+
        ':'+
        settings.stellar.asset.list[settings.stellar.asset.active].issuer+
        '&limit=200';
}

export function getTrustlinesURL(code=null, issuer=null)
{
    var code = (code === null)? settings.stellar.asset.list[settings.stellar.asset.active].code : code;
    var issuer = (issuer === null) ? settings.stellar.asset.list[settings.stellar.asset.active].issuer : issuer;
    return settings.stellar.horizon.list[settings.stellar.horizon.active]+
        'assets?asset_code='+code+
        '&asset_issuer='+issuer;
}

export function akfsGetMapURL(hash=null)
{
    return settings.ak.connect.list[settings.ak.connect.active]+'/v0/map/'+hash;
}

export function akfsGetLeafURL(hash=null)
{
    return settings.ak.connect.list[settings.ak.connect.active]+'/v0/leaf/'+hash;
}

export function akfsGetChunkURL(hash=null)
{
    return settings.ak.connect.list[settings.ak.connect.active]+'/v0/chunk/'+hash;
}

export function aknsGetURL(hash=null)
{
    return settings.ak.connect.list[settings.ak.connect.active]+'/v0/ns_get/'+hash;
}

export function aknsGetFromBaseURL(hash=null)
{
    return settings.ak.connect.list[settings.ak.connect.active]+'/v0/ns_get_base/'+hash;
}
// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
// @license-end
