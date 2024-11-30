// Arching Kaos Node Info Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//
//
import { makeElement } from "../../arching-kaos-generator.js";

export function akNodeInfoSection()
{
    var akNodeInfoSection = {
        element: "div",
        id: "arching-kaos-node-info",
        innerHTML: `
        <h2>Node Info</h2>
        <em id="node-info-not-found">No data found (yet?)!</em>
    `
    };

    makeElement(akNodeInfoSection, document.querySelector('.main'));
}
// @license-end
