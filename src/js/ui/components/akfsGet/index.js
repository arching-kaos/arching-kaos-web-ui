// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

const label = {
    element : "h4",
    innerText: "Get a file via AKFS"
};

const input = {
    element: "input",
    id:"hash-field",
    type:"text",
    name:"search",
    placeholder:"Enter a hash"
};

const button = {
    element:"button",
    onclick:"akfsGetMap(this.parentElement.querySelector('#hash-field').value)",
    innerText:"Get!"
}

const container = {
    element: "div",
    style:"padding: 1vh 1vw; display: flex; flex-direction: row; align-items: center; gap: 10px;",
    innerHTML: [
        input,
        button
    ]
};


export const akfsGetForm = {
    element: "div",
    style:"padding: 1vh 1vw; display: flex; flex-direction: column; align-items: center; gap: 10px;",
    innerHTML: [
        label,
        container
    ]
}

// @license-end
