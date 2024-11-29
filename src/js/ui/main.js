import { makeElement } from "../arching-kaos-generator.js";

var scripts = [
    {
        element:"script",
        type:"module",
        src:"./js/ui/sections/welcomeSection.js"
    },
    {
        element:"script",
        type:"module",
        src:"./js/ui/sections/chatSection.js"
    },
    {
        element:"script",
        type:"module",
        src:"./js/ui/sections/notFoundSection.js"
    },
    {
        element:"script",
        type:"module",
        src:"./js/ui/sections/settingsSection.js"
    },
    {
        element:"script",
        type:"module",
        src:"./js/ui/sections/radioSection.js"
    }
];

for ( var i = 0; i < scripts.length; i++ )
{
    makeElement(scripts[i], document.querySelector('body'));
}
