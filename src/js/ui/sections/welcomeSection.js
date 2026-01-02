// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";
import { homeGrid } from "../components/homeGrid/index.js";
import { scanMethodsArea } from "../components/scanButtons/index.js";
import { akfsGetForm } from "../components/akfsGet/index.js";
import { renderForm } from "../components/renderForm/index.js";
import { manualPeerForm } from "../components/manualPeer/index.js";
import { progressArea } from "../components/progressArea/index.js";
import { logsArea } from "../components/logsArea/index.js";
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

const greeting = {
    element: "div",
    innerHTML: [
        {
            element: "p",
            innerText: "Welcome to Arching Kaos project."
        }
    ]
};

const groupA = {
    element: "div",
    style: "width: 20vw; flex-shrink: 0; overflow-y: scroll;",
    innerHTML: [
        greeting,
        homeGrid,
        renderForm,
        akfsGetForm,
        manualPeerForm,
        scanMethodsArea
    ]
}

const groupB = {
    element: "div",
    style: "overflow-y: scroll; height: 100vh;",
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

const containerB = {
    element: "div",
    innerHTML: [
        progressArea,
        logsArea
    ]
}

const content = {
    element : "div",
    className: "content",
    innerHTML: [
        containerA,
        containerB,
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
