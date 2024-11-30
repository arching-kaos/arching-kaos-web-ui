// Arching Kaos Radio Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function radioSection()
{
    var radioSection = {
        element: "div",
        id: 'radio-section',
        hidden: true,
        style: 'height: 100%;',
        innerHTML: [
            {
                element: 'button',
                style:"position: fixed;",
                onclick:"refreshRadio()",
                innerText:'Refresh'
            },
            {
                element: 'iframe',
                id:"radio-iframe",
                src:"https://radio.arching-kaos.com",
                style:"width: 100%; height: 100%;"
            }
        ]
    };

    makeElement(radioSection, document.querySelector('.main'));
}
// @license-end
