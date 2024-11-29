import { makeElement } from "../arching-kaos-generator.js";

var scripts = [
    {
        element:"script",
        type: "module",
        src:"./js/ui/header.js"
    },
    {
        element:"script",
        type: "module",
        src:"./js/ui/menu.js"
    },
    {
        element:"script",
        type: "module",
        src:"./js/ui/main.js"
    },
    {
        element:"script",
        type: "module",
        src:"./js/ui/footer.js"
    }
]
for ( var i = 0; i < scripts.length; i++ )
{
    makeElement(scripts[i], document.querySelector('body'));
}
