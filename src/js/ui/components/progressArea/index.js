// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

export const progressArea = {
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
};

// @license-end
