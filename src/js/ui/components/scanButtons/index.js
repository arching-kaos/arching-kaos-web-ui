// Arching Kaos Welcome Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

export const scanMethodsArea = {
    element: "div",
    id: "scan-methods-area",
    innerHTML: [
        {
            element: "h3",
            innerText: "Manual scan"
        },
        {
            element: "div",
            id: "manual-scan-section",
            innerHTML: [
                {
                    element: "div",
                    className: "manual-scan",
                    innerHTML: [
                        { element:"button", onclick:"scanStellarNetworkForPeers()", innerText:"Check Stellar Network"},
                        { element:"button", onclick:"checkLocalNodeInfo()", innerText:"Check local Node"},
                        { element:"button", onclick:"checkLocalPeers()", innerText:"Check local Peers"},
                        { element:"button", onclick:"checkLocalSchain()", innerText:"Check Local Schain"}
                    ]
                }
            ]
        },
    ]
}

// @license-end
