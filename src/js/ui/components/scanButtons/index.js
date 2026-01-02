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
            className: "p-6px",
            innerHTML: [
                {
                    element: "select",
                    className: "p-6px manual-scan",
                    innerHTML: [
                        { element:"option", onclick:"scanStellarNetworkForPeers()", innerText:"Stellar Network"},
                        { element:"option", onclick:"checkLocalNodeInfo()", innerText:"Local Node"},
                        { element:"option", onclick:"checkLocalPeers()", innerText:"Local Peers"},
                        { element:"option", onclick:"checkLocalSchain()", innerText:"Local Schain"}
                    ]
                }
            ]
        },
    ]
}

// @license-end
