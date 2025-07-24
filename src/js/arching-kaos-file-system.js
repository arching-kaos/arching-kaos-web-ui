// Arching Kaos File System
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { akfsGetChunkURL, akfsGetLeafURL, akfsGetMapURL } from "./url-generators.js";
import { archingKaosFetchBlob } from "./arching-kaos-fetch.js";
import { offerDownloadableData } from "./utils.js";
import {archingKaosLog} from "./arching-kaos-log.js";
import { makeElement } from "./arching-kaos-generator.js";

var thingy = {};
var leafs_counter = 0;
var leafs_head_counter = 0;
var first_chunk_spotted = 0;
var first_chunk_size = 0;
var final_array_seq = [];
var status = [];
var workspace = [];
var output = "";
var downloaded = false;
var ready = false;

function drawWorkSpace()
{
    var ele = {
        element:"svg",
        className: "akfsmap",
        viewBox: "0 0 900 50",
        version: "1.1",
        style:"background-color:#333;width: 100%;height:100%;",
        xmlns: "http://www.w3.org/2000/svg",
        innerHTML:[
        ]
    };
    if ( document.querySelector('svg') === null ) makeElement(ele, document.querySelector('.results-area'));
}

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
    status = [];
    workspace = [];
    downloaded = false;
    output = "";
    if ( document.querySelector('svg') !== null ) document.querySelector('svg').remove();
}

export function akfsGetMap(hash)
{
    akfsReset();
    drawWorkSpace();
    archingKaosFetchBlob(akfsGetMapURL(hash), akfsFromMapGetLevelOneMapHash, [hash])
    setInterval(pollStatus, 5000);
    return hash;
}

function pollStatus()
{
    if ( downloaded ) return;
    for ( let x in status ) {
        if ( status[x] === "working" ) {
            console.log("Not ready!");
            return
        }
    }
    console.log("Ready!");
    akfsWorkOnChunks();
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
    const [ data, toDownload ] = params;
    if(typeof(reply) === "string")
    {
        // console.log(reply.split('\n')[0].split('  ')[1]);
        var first_line = reply.split('\n')[0].split('  ');
        var filename = "";
        for ( let i = 1; i < first_line.length; i++ )
        {
            filename += first_line[i];
            if ( i < first_line.length - 1 )
            {
                filename += " ";
            }
        }
        if ( toDownload ) offerDownloadableData(data, filename);
    }
}

function akfsFromMapGetLevelOneMapHash(reply, params)
{
    const [ hash ] = params;
    var hashregexp = /^[0-9a-f]{128}$/;
    const level_1_map = reply.split('\n')[1].split('  ')[0];
    if(typeof(reply) === "string" && hashregexp.test(level_1_map))
    {
        archingKaosFetchBlob(akfsGetLeafURL(level_1_map), akfsChunkOrLeaf, [level_1_map, hash, 0]);
        thingy = {
            leafs: [],
            chunks: [],
            root_hash: level_1_map,
            map_hash: hash
        };
        thingy[`${level_1_map}`] = [];
        status[`${level_1_map}`] = 'working';
    }
}

function akfsSerializeChunks(hash)
{
    if ( status[hash] === 'ready' )
    {
        if ( thingy.chunks[hash] !== undefined )
        {
            final_array_seq.push(hash);
        }
        else if ( thingy.leafs[hash] !== undefined )
        {
            if ( thingy.leafs[hash].head !== undefined )
            {
                akfsSerializeChunks(thingy.leafs[hash].head);
            }
            if ( thingy.leafs[hash].head !== thingy.leafs[hash].tail )
            {
                akfsSerializeChunks(thingy.leafs[hash].tail);
            }
        }
        else
        {
            console.log(`The following hash is failing: ${hash}`)
        }
    }
    else
    {
        // console.log(status);
        console.log('next call');
    }
}

function makeUpData()
{
    let response = "";
    for ( var i = 0; i < final_array_seq.length; i++ )
    {
        response += thingy.chunks[final_array_seq[i]].data;
    }
    return Uint8Array.fromBase64(response.replaceAll('\n', '')); // incompatible atm for Chromium afaik
}

export function akfsWorkOnChunks()
{
    akfsSerializeChunks(thingy.root_hash);
    var data = makeUpData();
    archingKaosFetchBlob(akfsGetMapURL(thingy.map_hash), akfsFromMapGetOriginalFilename, [data, true]);
    downloaded = true;
    // console.log(workspace);
}

function akfsChunkOrLeaf(reply, params)
{
    var [ hash, previous, wsn ] = params;
    if ( workspace[wsn] === undefined ) workspace[wsn] = [];
    if ( hash === thingy.root_hash ) workspace[wsn].push(hash);
    wsn++;
    if ( workspace[wsn] === undefined ) workspace[wsn] = [];
    var hashregexp = /^[0-9a-f]{128}$/;
    var base64regexp = /^[-A-Za-z0-9+/]*={0,3}$/;
    if(typeof(reply) === "string")
    {
        if ( hashregexp.test(reply.split('\n')[0]) && hashregexp.test(reply.split('\n')[1]) && ( thingy.leafs[hash] === undefined ) )
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
                makeElement({
                    element:"circle",
                    id:`c-${hash}`,
                    fill:"red",
                    cx:1+(workspace[wsn].length+1)*3,
                    cy:2+((wsn-1)*3),
                    r:"1"
                }, document.querySelector('svg'));
            }
            // if ( thingy[hash] !== undefined )
            // {
            //     thingy[hash][reply.split('\n')[0]] = [];
            //     thingy[hash][reply.split('\n')[1]] = [];
            // }
            archingKaosLog(`${hash} is a leaf`);
            var leaf = {
                hash: hash,
                head: reply.split('\n')[0],
                tail: reply.split('\n')[1]
            };
            thingy.leafs[leaf.hash] = leaf;
            document.querySelector(`#c-${leaf.hash}`).setAttribute("fill", "lightgreen");
            status[leaf.hash] = 'ready';
            status[leaf.head] = 'working';
            archingKaosFetchBlob(akfsGetLeafURL(leaf.head), akfsChunkOrLeaf, [leaf.head, hash, wsn]);
            archingKaosFetchBlob(akfsGetChunkURL(leaf.head), akfsChunkOrLeaf, [leaf.head, hash, wsn]);
            workspace[wsn].push(leaf.head);
            makeElement({
                element:"circle",
                id:`c-${leaf.head}`,
                fill:"red",
                cx:1+(workspace[wsn].length*3),
                cy:2+((wsn)*3),
                r:"1"
            }, document.querySelector('svg'));
            if ( leaf.head !== leaf.tail )
            {
                status[leaf.tail] = 'working';
                archingKaosFetchBlob(akfsGetLeafURL(leaf.tail), akfsChunkOrLeaf, [leaf.tail, hash, wsn]);
                archingKaosFetchBlob(akfsGetChunkURL(leaf.tail), akfsChunkOrLeaf, [leaf.tail, hash, wsn]);
                workspace[wsn].push(leaf.tail);
                makeElement({
                    element:"circle",
                    id:`c-${leaf.tail}`,
                    fill:"red",
                    cx:1+(workspace[wsn].length*3),
                    cy:2+((wsn)*3),
                    r:"1"
                }, document.querySelector('svg'));
            }
        }
        else if ( base64regexp.test(reply.replaceAll('\n', '')) && ( thingy.chunks[hash] === undefined ) )
        {
            if ( first_chunk_spotted === 0 )
            {
                first_chunk_spotted = leafs_head_counter;
                // console.log(`first_chunk_spotted : ${first_chunk_spotted}`);
                first_chunk_size = reply.length;
            }
            var chunk = {
                hash: hash,
                data: reply
            };
            document.querySelector(`#c-${chunk.hash}`).setAttribute("fill", "lightgreen");
            archingKaosLog(`${hash} is a chunk`);
            status[chunk.hash] = 'ready';
            thingy.chunks[chunk.hash] = chunk;
            if ( first_chunk_size > chunk.data.length || chunk.data.length < 1024 || ( chunk.data.length < 4096 && first_chunk_size >= 4096 ) )
            {
                // akfsWorkOnChunks();
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
