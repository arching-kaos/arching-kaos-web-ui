// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

var whereAmI = {
    element: "div",
    className: "where-am-i",
    innerHTML: [
        { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
        { element: "span", innerText:">"},
        { element: "h2", innerText:"Home"}
    ]
};

var greeting = {
    element: "p",
    innerText: "Welcome to Arching Kaos project."
};

var homeGrid = {
    element: "div",
    id: "home-grid",
    innerHTML: [
        {
            element:"button",
            className:"menu-clickable",
            id:"#/mixtapes-section",
            onclick:"menusel(this)",
            style:"background-image: url(img/mixtapes-logo.png); background-repeat: round;"
        },
        {
            element:"button",
            className:"menu-clickable",
            id:"#/news-section",
            onclick:"menusel(this)",
            style:"background-image: url(img/news-logo.png); background-repeat: round;"
        },
        {
            element:"button",
            className:"menu-clickable",
            id:"#/chat-section",
            onclick:"menusel(this)",
            style:"background-image: url(img/chat-logo.png); background-repeat: round;"
        },
        {
            element:"button",
            className:"menu-clickable",
            id:"#/radio-section",
            onclick:"menusel(this)",
            style:"background-image: url(img/radio-logo.png); background-repeat: round; background-size: cover;"
        },
        {
            element:"button",
            className:"menu-clickable",
            id:"#/stats-section",
            onclick:"menusel(this)",
            innerText:"Stats"
        }
    ]
};

var renderTitle = {
    element : "h3",
    innerText: "Render explicit zblock"
};

var renderForm = {
    element: "div",
    style:"padding: 1vh 1vw; display: flex; flex-direction: row; align-items: center; gap: 10px;",
    innerHTML: [
        {
            element: "input",
            id:"search-field",
            type:"text",
            name:"search",
            placeholder:"Enter a zblock hash"
        },
        {
            element:"button",
            onclick:"seekZblock(this.parentElement.querySelector('#search-field').value, ['search', false])",
            innerText:"Render"
        }
    ]
};

var content = {
    element : "div",
    className: "content",
    innerHTML: [
        greeting,
        homeGrid,
        renderTitle,
        renderForm,
        {
            element: "div",
            className: "results-area",
            innerHTML: [
                {
                    elements: "h3",
                    innerText: "Results"
                }
            ]
        },
        {
            element: "h3",
            innerText: "Manual scan"
        },
        {
            element: "div",
            id: "manual-scan-section",
            innerHTML: [
                {
                    element: "div",
                    className: "manual-scan",
                    innerHTML: [
                        { element:"button", onclick:"scanStellarNetworkForPeers()", innerText:"Check Stellar Network"},
                        { element:"button", onclick:"checkLocalNodeInfo()", innerText:"Check local Node"},
                        { element:"button", onclick:"checkLocalPeers()", innerText:"Check local Peers"},
                        { element:"button", onclick:"checkLocalSchain()", innerText:"Check Local Schain"}
                    ]
                }
            ]
        },
        {
            element: "div",
            className: "preview"
        },
        {
            element: "div",
            className: "dialog",
            innerHTML: [
                {
                    element: "h3",
                    innerText: "Progress"
                },
                {
                    element: "progress",
                    id: "total-progress",
                    value: 0
                },
                {
                    element: "progress",
                    id: "http-progress",
                    value: 0
                },
                {
                    element: "pre",
                    id: "current-log-message"
                }
            ]
        },
        {
            element: "details",
            id: "logs-area",
            innerHTML: [
                {
                    element: "summary",
                    innerText: "Logs (click to expand)"
                },
                {
                    element: "div",
                    id: "logs-area-element"
                }
            ]
        }
    ]
};

export function welcomeSection()
{
    var welcomeSection = {
        element: "div",
        id: "welcome-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };

    makeElement(welcomeSection, document.querySelector('.main'));
}
// @license-end
