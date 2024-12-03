// Arching Kaos Not Found Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function notFoundSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Not found"}
        ]
    };
    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            {
                element: 'p',
                innerText: 'Soft 404'
            },
            {
                element: 'p',
                innerText: 'Please select an entry from the menu'
            }
        ]
    };
    var notFoundSection = {
        element: 'div',
        id: 'not-found-section',
        hidden: true,
        innerHTML: [
            whereAmI,
            content
        ]
    };

    makeElement(notFoundSection, document.querySelector('.main'));
}
// @license-end
