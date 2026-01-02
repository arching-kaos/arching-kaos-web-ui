// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

const label = {
    element : "h4",
    innerText: "Connect to peer"
};

const input = {
    element: "input",
    id:"peer-field",
    type:"text",
    name:"search",
    placeholder:"Enter an arching-kaos node address"
};

const button = {
    element:"button",
    onclick:"seekPeer(this.parentElement.querySelector('#peer-field').value, ['search', false])",
    innerText:"Try"
};

const container = {
    element: "div",
    style:"padding: 1vh 1vw; display: flex; flex-direction: row; align-items: center; gap: 10px;",
    innerHTML: [
        input,
        button
    ]
};

export const manualPeerForm = {
    element: "div",
    style:"padding: 1vh 1vw; display: flex; flex-direction: column; align-items: center; gap: 10px;",
    innerHTML: [
        label,
        container
    ]
};

// @license-end
