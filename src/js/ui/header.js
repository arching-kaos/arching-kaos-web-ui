var header = {
    element: "div",
    id: 'header',
    className: 'header',
    innerHTML: [
        { element: "a", id:"logo-button", innerHTML:[
            {element: "img", src:"./img/header-logo.png" }
        ]},
        { element: "h1", style:"text-align: center;", innerText: "Arching Kaos"}
    ]
}

function goHomeAction()
{
    menusel({id:"#/welcome-section"});
}
makeElement(header, document.querySelector('#logo-title-placeholder'));

document.querySelector('#logo-button').addEventListener("click", goHomeAction);
