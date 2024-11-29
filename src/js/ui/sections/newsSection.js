import { makeElement } from "../../arching-kaos-generator.js";

var newsSection = {
    element: 'div',
    id: 'news-section',
    innerHTML: [
        { element: "div", className: "where-am-i", innerHTML: `
            <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
            <span>&gt;</span>
            <h2>Modules</h2>
            <span>&gt;</span>
            <h2>News</h2>
            ` },
        { element: "em", id:"news-sec-not-found", innerText: "No data found (yet?)!"}
    ]
};

makeElement(newsSection, document.querySelector('.main'));
