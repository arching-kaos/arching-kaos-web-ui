import { makeElement } from "../../arching-kaos-generator.js";

var myPageSection = {
    element: "div",
    id: "mypage-section",
    innerHTML: `
        <h2>My page</h2>
        <button id="stellar-freigher-connect-address-button" onclick="connect()">Connect with Freighter wallet</button>
        <div id="my-news">
            <h3>My news</h3>
            <em id="my-news-sec-not-found">No data found (yet?)!</em>
        </div>
        <div id="my-mixtapes">
            <h3>My mixtapes</h3>
            <em id="my-mixtapes-sec-not-found">No data found (yet?)!</em>
        </div>
        <div id="my-zchain">
            <h3>My zchain</h3>
            <em id="my-zchain-sec-not-found">No data found (yet?)!</em>
        </div>
    `
};

makeElement(myPageSection, document.querySelector('.main'));
