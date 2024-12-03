// Arching Kaos Files Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function filesSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Modules"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Files"}
        ]
    };
    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            { element: "em", id:"files-sec-not-found", innerText: "No data found (yet?)!"}
        ]
    };
    var filesSection = {
        element: 'div',
        id: "files-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };

    makeElement(filesSection, document.querySelector('.main'));
}
// @license-end
