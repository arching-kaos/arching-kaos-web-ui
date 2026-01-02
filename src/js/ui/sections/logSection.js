// Arching Kaos About Section
//
//  Kaotisk Hund - 2024 - 2026
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";
import { logsArea } from "../components/logsArea/index.js";
import { progressArea } from "../components/progressArea/index.js";

export function logSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Logs"}
        ]
    };

    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            progressArea,
            logsArea
        ]
    }


    var aboutSection = {
        element: "div",
        hidden: true,
        id:"logs-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };

    makeElement(aboutSection, document.querySelector('.main'));
}
// @license-end
