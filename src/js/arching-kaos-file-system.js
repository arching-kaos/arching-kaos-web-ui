// Arching Kaos Fetch
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { akfsGetChunkURL, akfsGetLeafURL, akfsGetMapURL } from "./url-generators.js";
import { archingKaosFetchBlob } from "./arching-kaos-fetch.js";
import { offerDownloadableData } from "./utils.js";

var thingy = {};
var leafs_counter = 0;
var leafs_head_counter = 0;
var first_chunk_spotted = 0;
var first_chunk_size = 0;
var final_array_seq = [];
var output = "";

function akfsReset()
{
    thingy = null;
    thingy = {};
    leafs_counter = 0;
    leafs_head_counter = 0;
    first_chunk_spotted = 0;
    first_chunk_size = 0;
    final_array_seq = null;
    final_array_seq = [];
    output = "";
}

export function akfsGetMap(hash)
{
    akfsReset();
    archingKaosFetchBlob(akfsGetMapURL(hash), akfsFromMapGetLevelOneMapHash, [hash])
    return hash;
}

function akfsFromMapGetOriginalHash(reply, params)
{
    const [ hash ] = params;
    if(typeof(reply) === "string")
    {
        console.log(reply.split('\n')[0].split('  ')[0]);
    }
}

function akfsFromMapGetOriginalFilename(reply, params)
{
    const [ hash ] = params;
    if(typeof(reply) === "string")
    {
        console.log(reply.split('\n')[0].split('  ')[1]);
    }
}

function akfsFromMapGetLevelOneMapHash(reply, params)
{
    const [ hash ] = params;
    var hashregexp = /^[0-9a-f]{128}$/;
    const level_1_map = reply.split('\n')[1].split('  ')[0];
    if(typeof(reply) === "string" && hashregexp.test(level_1_map))
    {
        archingKaosFetchBlob(akfsGetLeafURL(level_1_map), akfsChunkOrLeaf, [level_1_map, hash]);
        thingy = {
            leafs: [],
            chunks: [],
            root_hash: level_1_map,
            map_hash: hash
        };
        thingy[`${level_1_map}`] = [];
    }
}

function akfsSerializeChunks(hash)
{
    if ( thingy.chunks[hash] !== undefined )
    {
        final_array_seq.push(hash);
    }
    else
    {
        if ( thingy.leafs[hash] !== undefined )
        {
            console.log(`The following hash is failing: ${hash}`)
            if ( thingy.leafs[hash].head !== undefined )
            {
                akfsSerializeChunks(thingy.leafs[hash].head);
            }
        }
        if ( thingy.leafs[hash].head !== thingy.leafs[hash].tail )
        {
            akfsSerializeChunks(thingy.leafs[hash].tail);
        }
    }
}

function makeUpData()
{
    let response = "";
    for ( var i = 0; i < final_array_seq.length; i++ )
    {
        // console.log(`${i} ${final_array_seq[i]}`);
        response += thingy.chunks[final_array_seq[i]].data;
    }
    return Uint8Array.fromBase64(response.replaceAll('\n', ''));
}

function akfsWorkOnChunks()
{
    akfsSerializeChunks(thingy.root_hash);
    var data = makeUpData();
    offerDownloadableData(data);
}

function akfsChunkOrLeaf(reply, params)
{
    const [ hash, previous ] = params;
    var hashregexp = /^[0-9a-f]{128}$/;
    var base64regexp = /^[-A-Za-z0-9+/]*={0,3}$/;
    if(typeof(reply) === "string")
    {
        if ( hashregexp.test(reply.split('\n')[0]) && hashregexp.test(reply.split('\n')[1]) )
        {
            if ( leafs_counter === 0 )
            {
                leafs_counter++;
            }
            leafs_head_counter++;
            if ( previous === thingy.map_hash )
            {
                console.log("Previous is a map_hash");
            }
            else if ( previous === thingy.root_hash )
            {
                console.log("Previous is a root_hash");
            }
            if ( hash === thingy.map_hash )
            {
                console.log("Current is a map_hash");
            }
            else if ( hash === thingy.root_hash )
            {
                console.log("Current is a root_hash");
            }
            if ( thingy[hash] !== undefined )
            {
                thingy[hash][reply.split('\n')[0]] = [];
                thingy[hash][reply.split('\n')[1]] = [];
            }
            var leaf = {
                hash: hash,
                head: reply.split('\n')[0],
                tail: reply.split('\n')[1]
            };
            thingy.leafs[leaf.hash] = leaf;
            archingKaosFetchBlob(akfsGetLeafURL(leaf.head), akfsChunkOrLeaf, [leaf.head, hash]);
            archingKaosFetchBlob(akfsGetChunkURL(leaf.head), akfsChunkOrLeaf, [leaf.head, hash]);
            if ( leaf.head !== leaf.tail )
            {
                archingKaosFetchBlob(akfsGetLeafURL(leaf.tail), akfsChunkOrLeaf, [leaf.tail, hash]);
                archingKaosFetchBlob(akfsGetChunkURL(leaf.tail), akfsChunkOrLeaf, [leaf.tail, hash]);
            }
        }
        else if ( base64regexp.test(reply.split('\n')[0]) )
        {
            if ( first_chunk_spotted === 0 )
            {
                first_chunk_spotted = leafs_head_counter;
                console.log("first_chunk_spotted : "+ first_chunk_spotted);
                first_chunk_size = reply.length;
            }
            var chunk = {
                hash: hash,
                data: reply
            };
            thingy.chunks[chunk.hash] = chunk;
            if ( first_chunk_size > chunk.data.length || chunk.data.length < 1024 || ( chunk.data.length < 4096 && first_chunk_size >= 4096 ) )
            {
                akfsWorkOnChunks();
            }
        }
        else
        {
            console.log("Unreachable");
        }
    }
    else if (JSON.parse(reply))
    {
        const obj = JSON.parse(reply);
        if ( obj.error !== undefined ) console.log( obj.error );
    }
    else if (typeof(reply) === "object")
    {
        console.log("Unreachable");
    }
    else 
    {
        console.log("Unreachable");
    }
}

function akfsStoreChunk(chunk, params)
{
    const [ hash, previous ] = params;
    var base64regexp = /^[-A-Za-z0-9+/]*={0,3}$/
    if ( base64regexp.test(chunk) )
    {
        thingy.chunks[hash] = {
            data: chunk
        };
    }
}

function akfsGetChunk(chunk, params)
{
    const [ hash, previous ] = params;
    akfsStoreChunk(chunk, [hash, previous]);
}

function akfsGetLeaf(leaf, params)
{
    const [hash, previous] = params;
    if(typeof(leaf) === "object")
    {
        archingKaosFetchBlob(akfsGetLeafURL(leaf.head), akfsChunkOrLeaf, [hash, previous]);
        archingKaosFetchBlob(akfsGetChunkURL(leaf.head), akfsChunkOrLeaf, [hash, previous]);
        if ( leaf.head !== leaf.tail )
        {
            archingKaosFetchBlob(akfsGetLeafURL(leaf.tail), akfsChunkOrLeaf, [hash, previous]);
            archingKaosFetchBlob(akfsGetChunkURL(leaf.tail), akfsChunkOrLeaf, [hash, previous]);
        }
    }
}

// @license-end
