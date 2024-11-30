// Arching Kaos Zchain Data Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function zchainDataSection()
{
    var zchainDataSection = {
        element: "div",
        id:"zchain-data-section",
        innerHTML: `
                    <div class="where-am-i">
                        <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
                        <span>&gt;</span>
                        <h2>Explore</h2>
                        <span>&gt;</span>
                        <h2>zchains</h2>
                    </div>
                    <em id="zchain-data-sec-not-found">No data found (yet?)!</em>
                    `
    };

    makeElement(zchainDataSection, document.querySelector('.main'));
}
// @license-end
