import { makeElement } from "../../arching-kaos-generator.js";

var stellarSection = {
    element: 'div',
    id: "stellar-section",
    innerHTML: [
        {
            element: "h2",
            innerText: "Stellar dashboard"
        },
        {
            element: "button",
            className: "sub-input",
            id:"stellar-freigher-connect-address-button",
            onclick:"connect()",
            innerText:"Connect with Stellar address"
        }
    ]
};

makeElement(stellarSection, document.querySelector('.main'));
