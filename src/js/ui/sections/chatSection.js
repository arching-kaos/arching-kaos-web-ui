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
