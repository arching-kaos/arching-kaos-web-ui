// Arching Kaos Generic Section
//
// Kaotisk Hund - 2026
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function genericSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Generic"}
        ]
    };
    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            { element: "em", id:"generic-sec-not-found", innerText:"No data found (yet?)!"}
        ]
    };
    var genericSection = {
        element: "div",
        id: "generic-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };
    makeElement(genericSection, document.querySelector('.main'));
}
// @license-end
