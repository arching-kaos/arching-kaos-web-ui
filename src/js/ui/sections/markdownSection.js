// Arching Kaos Markdown Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function markdownSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Modules"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Markdown"}
        ]
    };
    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            { element: "em", id:"markdown-sec-not-found", innerText: "No data found (yet?)!"}
        ]
    };
    var markdownSection = {
        element: 'div',
        id: 'markdown-section',
        innerHTML: [
            whereAmI,
            content
        ]
    };
    makeElement(markdownSection, document.querySelector('.main'));
}
// @license-end
