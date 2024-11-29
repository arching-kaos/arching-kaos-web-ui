import { makeElement } from "../../arching-kaos-generator.js";

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
