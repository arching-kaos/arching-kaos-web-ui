import { makeElement } from "../../arching-kaos-generator.js";

var statsSection = {
    element: 'div',
    id: "stats-section",
    innerHTML: [
        { element: "div", className: "where-am-i", innerHTML: `
            <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
            <span>&gt;</span>
            <h2>Explore</h2>
            <span>&gt;</span>
            <h2>Stats</h2>
        `},
        { element: "div", className: "available-networks", innerHTML: `
            <h3>Networks</h3>
            <details class="stellar-network">
                <summary>Stellar</summary>
            </details>
            <details class="aknet-network">
                <summary>Arching Kaos Experimental Instance</summary>
            </details>
            <details class="aknet-sblocks">
                <summary>Arching Kaos SBlocks</summary>
            </details>
        `}
    ]
};

makeElement(statsSection, document.querySelector('.main'));
