// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

export const scanMethodsArea = {
    element: "div",
    id: "scan-methods-area",
    style:"padding: 1vh 1vw; display: flex; flex-direction: column; align-items: center; gap: 10px;",
    innerHTML: [
        {
            element: "h3",
            innerText: "Retrieve from"
        },
        {
            element: "div",
            id: "manual-scan-section",
            className: "p-6px grid",
            innerHTML: [
                { element:"button", onclick:"checkStellarNetwork()", innerText:"Stellar Network"},
                { element:"button", onclick:"checkLocalNodeInfo()", innerText:"Local Node"},
                { element:"button", onclick:"checkLocalPeers()", innerText:"Local Peers"},
                { element:"button", onclick:"checkLocalSchain()", innerText:"Local Schain"},
                { element:"button", onclick:"checkLocalPeersAndNode()", innerText:"Local Peers + Node"},
                { element:"button", onclick:"checkEverything()", innerText:"Everything"}
            ]
        },
    ]
}

// @license-end
