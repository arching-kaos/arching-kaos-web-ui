import { makeElement } from "../../arching-kaos-generator.js";

var stellarDataConfigSection = {
    element: "div",
    id: "stellar-data-config",
    innerHTML: `
        <div class="where-am-i">
            <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
            <span>&gt;</span>
            <h2>Stellar</h2>
            <span>&gt;</span>
            <h2>Data</h2>
        </div>
        <em id="stellar-data-config-not-found">No data found (yet?)!</em>
        `
};

makeElement(stellarDataConfigSection, document.querySelector('.main'));
