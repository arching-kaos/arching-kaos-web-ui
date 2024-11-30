// Arching Kaos Setup
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

var mixtapeIds = new Array;
export function addMixtapeID(zblockIPFSHash)
{
    mixtapeIds.push('mixtape-player-'+zblockIPFSHash);
}

var mixtapes = new Array;
export function setMixtape(zblockIPFSHash, json)
{
    mixtapes[zblockIPFSHash] = json;
}
export function getMixtapes()
{
    return mixtapes;
}

var sortedMixtapes = new Array;
export function setSortedMixtapes(value)
{
    sortedMixtapes = value;
}
export function getSortedMixtapes()
{
    return sortedMixtapes;
}

var zchainsFound = 0;
export function getZchainsFound()
{
    return zchainsFound;
}
export function increaseZchainsFound()
{
    zchainsFound++;
}

var foundHolders = new Array;
var gpglist = new Array;
var stellarNetworkConfiguredAddresses = 0;
var stellarParticipants = 0;

var participants = new Array;
export function getParticipants()
{
    return participants;
}

export function stellarParticipantInfo(participant, info)
{
    participants[participant] = info;
}

export function getStellarNetworkConfiguredAddresses()
{
    return stellarNetworkConfiguredAddresses;
}

export function increaseStellarNetworkConfiguredAddresses()
{
    stellarNetworkConfiguredAddresses += 1;
}

export function getFoundHolders()
{
    return foundHolders;
}

export function addToFoundHolders(holder)
{
    foundHolders.push(holder);
}

export function getStellarParticipants()
{
    return stellarParticipants;
}

export function setStellarParticipants(i)
{
    stellarParticipants = i;
}

export function increaseStellarParticipants()
{
    stellarParticipants++;
}

var stellarParticipantsScanned = 0;

export function getStellarParticipantsScanned()
{
    return stellarParticipantsScanned;
}
export function setStellarParticipantsScanned(i)
{
    stellarParticipantsScanned = i;
}

var zchainLoadingStatus = new Array;
export function setZchainLoadingStatus(zchain, status)
{
    zchainLoadingStatus[zchain] = status;
}
export function getZchainLoadingStatus(zchain)
{
    return zchainLoadingStatus[zchain];
}
export function getZchainLoadingStatuses()
{
    return zchainLoadingStatus;
}

var zchains = new Array;
export function getZchains()
{
    return zchains;
}
export function setZchain(zchain, value)
{
    zchains[zchain] = value;
}

var references = new Array;
export function getReferences()
{
    return references;
}

export function getReference(zblock)
{
    return references[zblock];
}

export function setReference(zblock, data)
{
    references[zblock] = data;
}

var fullZblocks = new Array;
export function getFullZblock(zblockIPFSHash)
{
    return fullZblocks[zblockIPFSHash];
}

export function getFullZblocks()
{
    return fullZblocks;
}

export function setFullZblock(zblockIPFSHash, data)
{
    fullZblocks[zblockIPFSHash] = data;
}

var zblocks = new Array;
export function getZblocks()
{
    return zblocks;
}

export function getZblock(group)
{
    return zblocks[group];
}

export function setZblock(group, zblockIPFSHash)
{
    if ( zblocks[group] === undefined )
    {
        zblocks[group] = new Array;
    }
    zblocks[group].push(zblockIPFSHash);
}

var blocks = new Array;
var data = new Array;

export function setData(hash, json)
{
    data[hash] = json;
}

var nodeInfo = new Array;




/*
 * We select our basic placeholders.
 *
 * Placeholders are mostly 'div' with specified id and we use them here
 * to append data on specific places in the page.
 *
 */

/*
 * Get addresses that trust the asset
 * Limit is 200 addresses cause horizon API limitations.
 *
 * Returns div DOM elements for each found address, embedding
 * the address both in innerHTML and in id of the div.
 */
var lastPage = '';

var stellar_connection_status = 0;

// @license-end
