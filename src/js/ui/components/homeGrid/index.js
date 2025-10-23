// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

export const homeGrid = {
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
            // innerText:"Stats",
            style:"background-image: url(img/stats-logo.png); background-repeat: round; background-size: cover;"
        }
    ]
};

// @license-end
