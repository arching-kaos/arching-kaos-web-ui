import { makeElement } from "../../arching-kaos-generator.js";

var akNodeInfoSection = {
    element: "div",
    id: "arching-kaos-node-info",
    innerHTML: `
        <h2>Node Info</h2>
        <em id="node-info-not-found">No data found (yet?)!</em>
    `
};

makeElement(akNodeInfoSection, document.querySelector('.main'));
