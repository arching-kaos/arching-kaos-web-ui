// Arching Kaos Chat Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function chatSection()
{
    var chatSection = {
        element: 'div',
        id:"chat-section",
        style:"height: 100%;",
        innerHTML: [
            {
                element: 'button',
                style:"position: fixed;",
                onclick:"refreshChat()",
                innerText:"Refresh"
            },
            {
                element: 'iframe',
                id: "chat-iframe",
                src: "https://irc.arching-kaos.net",
                style: "width: 100%; height: 100%;"
            }
        ]
    };

    makeElement(chatSection, document.querySelector('.main'));
}
// @license-end
