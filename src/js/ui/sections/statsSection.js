// Arching Kaos Stellar Balances Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function statsSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Explore"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Stats"}
        ]
    };
    var content = {
        element : "div",
        className: "content",
        innerHTML: [
            { element: "div", className: "available-networks", innerHTML: [
                { element: "h3", innerText: "Networks" },
                { element: "details", className: "stellar-network", innerHTML:[
                    { element:"summary", innerText:"Stellar"}
                ]},
                { element: "details", className: "aknet-network", innerHTML:[
                    { element:"summary", innerText:"Arching Kaos Experimental Instance"}
                ]},
                { element: "details", className: "aknet-sblocks", innerHTML:[
                    { element:"summary", innerText:"Arching Kaos SBlocks"}
                ]}
            ]}
        ]
    };
    var statsSection = {
        element: 'div',
        id: "stats-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };
    makeElement(statsSection, document.querySelector('.main'));
}
// @license-end
