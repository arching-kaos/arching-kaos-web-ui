// Arching Kaos About Section
//
//  Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function aboutSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"About"}
        ]
    };

    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            { element: "p", innerText:"Arching Kaos is a project about radio, music, communications and decentralization."},
            { element: "p", innerText:'On site, you can listen to the latest mixes of music (menu entry "Mixtapes"), read latest news ("News") of the network and chat (you guessed it, "Chat" menu entry).'},
            { element: "p", innerText:'You can see the zchains appearing in "zchain" and logs of the process on "Logs"'},
            { element: "p", innerText:"Note that to participate you will need to set up your Arching Kaos set, which is not so convinient yet but possible."},
            { element: "p", innerText:"Furthermore, if you are using Freighter extension you can additionally see:"},
            { element: "ol", innerHTML: [
                { element:"li", innerText:"Your balances on your wallet"},
                { element:"li", innerText:"Your configuration IPNS address (if any)"},
                { element:"li", innerText:"Your Arching Kaos configuration (if any)"},
                { element:"li", innerText:"Your zchain (...)"},
                { element:"li", innerText:"Your posted newsfeed (...)"}
            ]},
            { element:"p", innerText:"Also, on the stats page you can find people that are participating over the Stellar Network, using the ARCHINGKAOS token/asset/coin."},
            { element:"p", innerText:"If you like what you see or you think the project has potential, you can use the button below to donate."},
            { element: "button", onclick:'menusel({id:"#/donation-section"})', innerText:"Donation"}
        ]
    };

    var aboutSection = {
        element: "div",
        hidden: true,
        id:"about-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };

    makeElement(aboutSection, document.querySelector('.main'));
}
// @license-end
