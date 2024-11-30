// Arching Kaos Stellar Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function stellarSection()
{
    var stellarSection = {
        element: 'div',
        id: "stellar-section",
        innerHTML: [
            {
                element: "h2",
                innerText: "Stellar dashboard"
            },
            {
                element: "button",
                className: "sub-input",
                id:"stellar-freigher-connect-address-button",
                onclick:"connect()",
                innerText:"Connect with Stellar address"
            }
        ]
    };

    makeElement(stellarSection, document.querySelector('.main'));
}
// @license-end
