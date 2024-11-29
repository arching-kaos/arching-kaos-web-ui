import { makeElement } from "../../arching-kaos-generator.js";

var radioSection = {
    element: 'radio-section',
    hidden: true,
    style: 'height: 100%;',
    innerHTML: [
        {
            element: 'button',
            style:"position: fixed;",
            onclick:"refreshRadio()",
            innerText:'Refresh'
        },
        {
            element: 'iframe',
            id:"radio-iframe",
            src:"https://radio.arching-kaos.com",
            style:"width: 100%; height: 100%;"
        }
    ]
};

makeElement(radioSection, document.querySelector('.main'));
