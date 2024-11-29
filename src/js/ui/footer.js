import { makeElement } from "../arching-kaos-generator.js";

var footer = {
    element:"div",
    id:"footer",
    innerHTML:[
        {
            element:"div",
            innerHTML:[
                {element:"p", innerText:"Arching Kaos 2019-2024"},
                {element:"a", target:"_blank", href:"https://github.com/arching-kaos/arching-kaos-tools", innerText:"Tools"},
                {element:"a", target:"_blank", href:"https://arching-kaos.org", innerText:"Org"},
                {element:"a", target:"_blank", href:"https://arching-kaos.net", innerText:"Net"},
            ]
        },
        {
            element:"span",
            innerText:"::"
        },

        {
            element:"div",
            innerHTML:[
                {element:"a", target:"_blank", href:"https://github.com/arching-kaos/arching-kaos-web-ui/issues/new/choose", innerText:"Report an issue"},
            ]
        },
        {
            element:"span",
            innerText:"::"
        },
        {
            element:"div",
            innerHTML:[
                {
                    element:"p",
                    innerHTML:"Fra <a target=\"_blank\" href=\"https://www.kaotisk-hund.com\">Kaotisk Hund</a> med kjærlighet. <a href=\"bitcoin:BC1QYL9K5KDLSLJAED9PZCJJX0CPGZVY9LWY427SD4\">Donate</a>"
                }
            ]
        }
    ]
};

makeElement(footer, document.querySelector('.footer'));
