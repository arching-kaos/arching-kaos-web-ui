// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024 - 2026
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";
import { homeGrid } from "../components/homeGrid/index.js";
import { scanMethodsArea } from "../components/scanButtons/index.js";
import { akfsGetForm } from "../components/akfsGet/index.js";
import { renderForm } from "../components/renderForm/index.js";
import { manualPeerForm } from "../components/manualPeer/index.js";
import { previewArea } from "../components/previewArea/index.js";
import { resultsArea } from "../components/resultsArea/index.js";

const whereAmI = {
    element: "div",
    className: "where-am-i",
    innerHTML: [
        { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
        { element: "span", innerText:">"},
        { element: "h2", innerText:"Home"}
    ]
};

const groupA = {
    element: "div",
    style: "width: 20vw; flex-shrink: 0; overflow-y: auto;",
    innerHTML: [
        homeGrid,
        renderForm,
        akfsGetForm,
        manualPeerForm,
        scanMethodsArea
    ]
}

const groupB = {
    element: "div",
    style: "overflow-y: auto; height: 100vh; width: 100%;",
    innerHTML: [
        resultsArea,
        previewArea
    ]
}

const containerA = {
    element: "div",
    style: "display: flex; gap: 10px;",
    innerHTML: [
        groupA,
        groupB
    ]
}

const content = {
    element : "div",
    className: "content",
    innerHTML: [
        containerA,
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
