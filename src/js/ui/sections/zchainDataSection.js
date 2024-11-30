// Arching Kaos Zchain Data Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function zchainDataSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Explore"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"zchains"}
        ]
    };
    var zchainDataSection = {
        element: "div",
        id:"zchain-data-section",
        innerHTML: [
            whereAmI,
            { element: "em", id:"zchain-data-sec-not-found", innerText:"No data found (yet?)!" }
        ]
    };
    makeElement(zchainDataSection, document.querySelector('.main'));
}
// @license-end
