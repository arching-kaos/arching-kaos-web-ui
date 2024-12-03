// Arching Kaos My Page Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export function myPageSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Stellar"},
            { element: "span", innerText:">"},
            { element: "h2", innerText: "My Page" }
        ]
    };
    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            { element: "h2", innerText: "My page" },
            { element: "button", id: "stellar-freigher-connect-address-button", onclick:"connect()", innerText:"Connect with Freighter wallet" },
            { element: "div", id:"my-news", innerHTML:[
                { element: "h3", innerText:"My news"},
                { element: "em", id:"my-news-sec-not-found", innerText:"No data found (yet?)!" }
            ]},
            { element: "div", id:"my-mixtapes", innerHTML:[
                { element: "h3", innerText:"My mixtapes"},
                { element: "em", id:"my-mixtapes-sec-not-found", innerText:"No data found (yet?)!" }
            ]},
            { element: "div", id:"my-zchain", innerHTML:[
                { element: "h3", innerText:"My zchain"},
                { element: "em", id:"my-zchain-sec-not-found", innerText:"No data found (yet?)!" }
            ]}
        ]
    };
    var myPageSection = {
        element: "div",
        id: "mypage-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };

    makeElement(myPageSection, document.querySelector('.main'));
}
// @license-end
