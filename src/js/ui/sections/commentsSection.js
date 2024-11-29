import { makeElement } from "../../arching-kaos-generator.js";

export function commentsSection()
{
    var commentsSection = {
        element: 'div',
        id: 'comments-section',
        innerHTML: [
            { element: "h2", innerText: "Comments" },
            { element: "em", id:"comments-sec-not-found", innerText: "No data found (yet?)!"}
        ]
    };

    makeElement(commentsSection, document.querySelector('.main'));
}
