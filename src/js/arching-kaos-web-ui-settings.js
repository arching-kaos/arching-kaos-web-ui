/*
 * We will be using browser's localStorage for the clients to configure their
 * desired way to visit the web-ui.
 *
 * Proposed setting values:
 *   - Scan Stellar Asset or not
 *   - Stellar Asset to scan for addresses
 *   - ipfs gateway to use for retrieving ipfs parts (can change targeted swarm)
 *   - ring to local node (must running API locally see ../arching-kaos-tools
 *     repo)
 *   - have a follow akid/zchain list and load these
 *   - depth of retrieving at once (per zchain) (ak-enter -l X -n <zchain>)
 *
 * TODO: Make up a configuration item as well but there we could store locally
 * kays or other more personal stuff. Need to encrypt these with a password too!
 *
 */
var default_settings = {
    ipfsGatewayAddress: [
        'https://ipfs.arching-kaos.com/',
        'http://gw.ipfs.z.kaotisk-hund.com/',
        'http://localhost:8080/'
    ],
    ipfsSelectedGatewayAddress: 1,
    ringLocalBell: false,
    scanStellar: false,
    stellarAssetsForScanning: [
        {
            code: 'ARCHINGKAOS',
            issuer: 'GB4QVKD6NW3CSNO5TNPARAWNPPXOPSSTKB35XCWB7PUNBIQTK3DVELB2'
        },
        {
            code: 'KAOTISKHUND',
            issuer: 'GDLJKMETTIXAVTZ2XXR2LHUITT7GZBNWEKQDN7V7SP4MURVY6266BIMO'
        }
    ],
    stellarConfigVars: [
        'config',
        'ak-config',
        'kh-config'
    ],
    horizonAddresses: [
        'https://horizon.stellar.org/'
    ],
    horizonSelectedAddress: 0,
    stellarDefaultAsset: 0,
    stellarDefaultConfig: 0,
    zchainBasedDepthSeek: 10,
    zblockBasedDepthSeek: 10,
}

// We are overriding the settings each time to test our changes
// with the settings above.
//
// if ( window.localStorage.getItem("ak-settings") === null ) {
    window.localStorage.setItem("ak-settings", JSON.stringify(default_settings))
// }
var activeSettings = JSON.parse(window.localStorage.getItem("ak-settings"));

if (( location.origin === "http://z.kaotisk-hund.com") ||
    ( location.origin === "http://gw.ipfs.z.kaotisk-hund.com") ||
    ( location.origin === "http://[fc59:6076:6299:6776:c13d:fbb2:1226:ead0]")) {
    activeSettings.ipfsSelectedGatewayAddress = 1;
} else if ( location.origin === "http://localhost" ) {
    activeSettings.ipfsSelectedGatewayAddress = 2;
} else {
    activeSettings.ipfsSelectedGatewayAddress = 0;
}

var settingsPage = document.querySelector('#settings-section');

var settingsKeys = Object.keys(activeSettings);

function settingPlaceToDOM(key, value){
    var container = document.createElement("div");
    var label = document.createElement("label");
    label.innerText=key;
    container.appendChild(label);
    var paragraph = document.createElement("p");
    container.appendChild(paragraph);
    if ( Array.isArray(value) ){
        paragraph.innerText = "You will need to map this!";
    } else {
        paragraph.innerText = value;
    }
    settingsPage.appendChild(container);
}

settingsKeys.forEach(
    (value) => {
        settingPlaceToDOM(value, activeSettings[value]);
    }
);

// console.log(activeSettings.ipfsGatewayAddress[activeSettings.ipfsSelectedGatewayAddress]);

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
