// Arching Kaos About Section
//
//  Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function aboutSection()
{
    var aboutSection = {
        element: "div",
        hidden: true,
        id:"about-section",
        innerHTML: `
            <div class="where-am-i">
                <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
                <span>&gt;</span>
                <h2>About</h2>
            </div>
            <p>Arching Kaos is a project about radio, music, communications and decentralization.</p>
            <p>On site, you can listen to the latest mixes of music (menu entry "Mixtapes"), read latest news ("News") of the network and chat (you guessed it, "Chat" menu entry).</p>
            <p>You can see the zchains appearing in "zchain" and logs of the process on "Logs"</p>
            <p>Note that to participate you will need to set up your Arching Kaos set, which is not so convinient yet but possible.</p>
            <p>Furthermore, if you are using Freighter extension you can additionally see:</p>
            <ol>
                <li>Your balances on your wallet</li>
                <li>Your configuration IPNS address (if any)</li>
                <li>Your Arching Kaos configuration (if any)</li>
                <li>Your zchain (...)</li>
                <li>Your posted newsfeed (...)</li>
            </ol>
            <p>Finally, on the stats page you can find people that are participating over the Stellar Network, using the ARCHINGKAOS token/asset/coin.</p>
                    `
    };

    makeElement(aboutSection, document.querySelector('.main'));
}
// @license-end
