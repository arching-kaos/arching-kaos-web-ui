// Arching Kaos Model Generic
//
// Kaotisk Hund - 2026
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "./arching-kaos-generator.js";

function printObject(obj, parent) {
    var keys = Object.keys(obj)
    for (var i = 0; i < keys.length; i++ ) {
        parent.innerHTML.push({
            element: "p",
            innerText:`${keys[i]}: ${obj[keys[i]]}`,
        })
    }
}

export function akModuleGeneric(zblockIPFSHash, zblockObject, blockObject, json){
    if(!document.querySelector('#generic-'+zblockIPFSHash)){
        var divs = document.querySelector('#generic-section');
        console.log(blockObject.action);
        console.log(json);
        var art = {
            element:"article",
            id:'generic-'+zblockIPFSHash,
            innerHTML:[
                {
                    element:"h3",
                    innerText:zblockIPFSHash
                },
                {
                    element:"h4",
                    innerText:"Action: " + (blockObject.action)?blockObject.action:''
                },
            ]
        };
        printObject(json, art)
        makeElement(art, divs);
        if (document.querySelector("#generic-sec-not-found")) document.querySelector("#generic-sec-not-found").hidden=true;
    }
}
// @license-end
