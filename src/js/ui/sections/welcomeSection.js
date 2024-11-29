import { makeElement } from "../../arching-kaos-generator.js";

var welcomeSection = {
    element: "div",
    id: "welcome-section",
    innerHTML: [
        {
            element : "div",
            className:"where-am-i",
            innerHTML: `

            <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
            <span>&gt;</span>
            <h2>Home</h2>
        `
        },
        {
            element: "p",
            innerText: "Welcome to Arching Kaos project."
        },
        {
            element: "div",
            id: "home-grid",
            innerHTML: `
                <button class="menu-clickable" id="#/mixtapes-section" onclick="menusel(this)" style="background-image: url(img/mixtapes-logo.png); background-repeat: round;"></button>
                <button class="menu-clickable" id="#/news-section" onclick="menusel(this)" style="background-image: url(img/news-logo.png); background-repeat: round;"></button>
                <button class="menu-clickable" id="#/chat-section" onclick="menusel(this)" style="background-image: url(img/chat-logo.png); background-repeat: round;"></button>
                <button class="menu-clickable" id="#/radio-section" onclick="menusel(this)" style="background-image: url(img/radio-logo.png); background-repeat: round; background-size: cover;"></button>
                <button class="menu-clickable" id="#/stats-section" onclick="menusel(this)">Stats</button>
            `
        },
        {
            element : "h3",
            innerText: "Render explicit zblock"
        },
        {
            element: "div",
            style:"padding: 1vh 1vw; display: flex; flex-direction: row; align-items: center; gap: 10px;",
            innerHTML: `
            <input id="search-field" type="text" name="search" placeholder="Enter a zblock hash"/>
            <button onclick="seekZblock(this.parentElement.querySelector('#search-field').value, ['search', false])">Render</button>
            `
        },
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

makeElement(welcomeSection, document.querySelector('.main'));
