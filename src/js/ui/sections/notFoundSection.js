import { makeElement } from "../../arching-kaos-generator.js";

export function notFoundSection()
{
    var notFoundSection = {
        element: 'div',
        id: 'not-found-section',
        hidden: true,
        innerHTML: [
            {
                element: 'h2',
                innerText: 'Not found'
            },
            {
                element: 'p',
                innerText: 'Soft 404'
            },
            {
                element: 'p',
                innerText: 'Please select an entry from the menu'
            }
        ]
    };

    makeElement(notFoundSection, document.querySelector('.main'));
}
