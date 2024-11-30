// Arching Kaos Header
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../arching-kaos-generator.js";

export function headerSpawn()
{
    var header = {
        element: "div",
        id: 'header',
        className: 'header',
        innerHTML: [
            { element: "a", id:"logo-button", innerHTML:[
                {element: "img", src:"./img/header-logo.png" }
            ]},
            { element: "h1", style:"text-align: center;", innerText: "Arching Kaos"}
        ],
        onclick: 'menusel({id:"#/welcome-section"});'
    }

    makeElement(header, document.querySelector('#logo-title-placeholder'));
}
// @license-end
