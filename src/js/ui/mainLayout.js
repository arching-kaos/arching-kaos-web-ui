var scripts = [
    {
        element:"script",
        src:"./js/ui/header.js"
    },
    {
        element:"script",
        src:"./js/ui/footer.js"
    }
]
for ( var i = 0; i < scripts.length; i++ )
{
    makeElement(scripts[i], root.body);
}
