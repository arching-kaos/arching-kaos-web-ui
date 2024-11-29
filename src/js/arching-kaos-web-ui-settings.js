/* Arching Kaos Settings
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
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
 *   - have a follow nodeInfo/zchain list and load these
 *   - depth of retrieving at once (per zchain) (ak-enter -l X -n <zchain>)
 *
 * TODO: Make up a configuration item as well but there we could store locally
 * kays or other more personal stuff. Need to encrypt these with a password too!
 *
 */
import { makeElement } from "./arching-kaos-generator.js";
import { getSettingsPage } from "./ui/sections/settingsSection.js";

var default_settings = {
    ipfs: {
        gateway: {
            list: [
                'https://ipfs.arching-kaos.com/',
                'http://gw.ipfs.z.kaotisk-hund.com/',
                'http://localhost:8080/'
            ],
            active: 0
        }
    },
    stellar: {
        asset: {
            list: [
                {
                    code: 'ARCHINGKAOS',
                    issuer: 'GB4QVKD6NW3CSNO5TNPARAWNPPXOPSSTKB35XCWB7PUNBIQTK3DVELB2'
                },
                {
                    code: 'KAOTISKHUND',
                    issuer: 'GDLJKMETTIXAVTZ2XXR2LHUITT7GZBNWEKQDN7V7SP4MURVY6266BIMO'
                }
            ],
            active: 0
        },
        variableNames: {
            list: [
                'config',
                'ak-config',
                'kh-config'
            ],
            active: 0
        },
        horizon: {
            list: [
                'https://horizon.stellar.org/',
                'http://horizon.stellar.z.kaotisk-hund.com/'
            ],
            active: 0
        },
        scan: false
    },
    ak: {
        settings : {
            seekDepth: 10,
        },
        connect: {
            list: [
                'http://127.0.0.1:8610',
                'http://[fc59:6076:6299:6776:c13d:fbb2:1226:ead0]:8610',
                'http://api.aknet.z.kaotisk-hund.com/'
            ],
            active: 1
        },
        scan: false
    }
};

// TODO: Make up a settings configuration page to set this up initially rather
// than forcing visitors to just save them into their local storage.
//
// We are overriding the settings each time to test our changes
// with the settings above.
//
// if ( window.localStorage.getItem("ak-settings") === null ) {
//    window.localStorage.setItem("ak-settings", JSON.stringify(default_settings));
// }
// var settings = JSON.parse(window.localStorage.getItem("ak-settings"));
//
// All comments above are replaced by temporary initializing without saving
// anything in the localStorage

var settings = default_settings;

// Also, remove any settings stored from previous runs
window.localStorage.removeItem("ak-settings");

// Full functionality for Stellar intergration, requires clearnet connection
// However, we have other ways of running the WEB-UI, eg locally or via a
// cjdns-based ipfs gateway.
if (( location.origin === "http://z.kaotisk-hund.com") ||
    ( location.origin === "http://gw.ipfs.z.kaotisk-hund.com") ||
    ( location.origin === "http://[fc59:6076:6299:6776:c13d:fbb2:1226:ead0]")) {
    settings.ipfs.gateway.active = 1;
    settings.stellar.horizon.active = 1;
} else if ( location.origin === "http://localhost:3000" ) {
    settings.ipfs.gateway.active = 2;
} else {
    settings.ipfs.gateway.active = 0;
}

var settingsKeys = Object.keys(settings);

function renderCheck(container, value){
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (value === true){
        checkbox.checked = true;
    }
    container.appendChild(checkbox);
}

function renderList(container, value){
    var selectOptions = document.createElement('select');
    for ( var i = 0 ; i < value.list.length; i++ ){
        var option = document.createElement("option");
        if ( i === value.active ) {
            option.selected = true;
        };
        option.innerText = value.list[i];
        option.value = i;
        selectOptions.appendChild(option);
    }
    container.appendChild(selectOptions);
}

function renderAssets(container, value){
    var selectOptions = document.createElement('select');
    for ( var i = 0 ; i < value.list.length; i++ ){
        var option = document.createElement("option");
        if ( i === value.active ) {
            option.selected = true;
        };
        option.innerText = value.list[i].code + "-" + value.list[i].issuer;
        option.value = i;
        selectOptions.appendChild(option);
    }
    container.appendChild(selectOptions);
}

function settingPlaceToDOM(key, value){
    var container = document.createElement("details");
    container.innerText=key;
    if ( Array.isArray(value) ){
        var ul = document.createElement("select");
        value.map((v)=>{
            if (v.constructor.name === "Object"){
                Object.keys(v).forEach((value)=>{
                    makeElement({element:"option", innerText:value + ': ' + v[value], value: value}, ul);
                });
            } else {
                makeElement({element:"option", innerText:v, value: v}, ul);
            }
        });
        container.appendChild(ul);
    } else if (value.constructor.name === "Object" ) {
        console.log("KEY: "+key);
        switch (key){
            case 'ipfs':
                makeElement({ element:"summary",innerText:"IPFS" }, container);
                renderList(container, value.gateway);

                break;
            case 'stellar':
                makeElement({ element:"summary",innerText:"Asset" }, container);
                renderAssets(container, value.asset);

                makeElement({ element:"summary",innerText:"Variable Names" }, container);
                renderList(container, value.variableNames);

                makeElement({ element:"summary",innerText:"Horizon" }, container);
                renderList(container, value.horizon);

                makeElement({ element:"summary",innerText:"Scan" }, container);
                renderCheck(container, value.scan);
                break;
            case 'ak':
                makeElement({ element:"summary",innerText:"Connect" }, container);
                renderList(container, value.connect);
                break;
            default:
                container.innerText += " unknonwn lol";
        }
    } else {
        console.log(`Settings value: ${value}, type: ${typeof(value)}`);
//        container.innerText = value;
    }
    getSettingsPage().appendChild(container);
}

// settingsKeys.forEach(
//     (value) => {
//         settingPlaceToDOM(value, settings[value]);
//     }
// );

/* Small dump as pre text */
// var predump = document.createElement('pre');
// predump.innerText = JSON.stringify(settings, null, 2);
// getSettingsPage().appendChild(predump);
/* END of: Small dump as pre text */

export function getSettings()
{
    return default_settings;
}

// console.log(settings.ipfsGatewayAddress[settings.ipfsSelectedGatewayAddress]);

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
// @license-end
