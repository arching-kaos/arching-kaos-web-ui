// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

const label = {
    element : "h4",
    innerText: "Render explicit zblock"
};

const input = {
    element: "input",
    id:"search-field",
    type:"text",
    name:"search",
    placeholder:"Enter a zblock hash"
};

const button = {
    element:"button",
    onclick:"seekZblock(this.parentElement.querySelector('#search-field').value, ['search', false])",
    innerText:"Render"
}

const container = {
    element: "div",
    style:"padding: 1vh 1vw; display: flex; flex-direction: row; align-items: center; gap: 10px;",
    innerHTML: [
        input,
        button
    ]
};

export const renderForm = {
    element: "div",
    style:"padding: 1vh 1vw; display: flex; flex-direction: column; align-items: center; gap: 10px;",
    innerHTML: [
        label,
        container
    ]
};

// @license-end
