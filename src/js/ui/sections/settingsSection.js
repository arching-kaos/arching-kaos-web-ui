// Arching Kaos Settings Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";
import { getSettings, showSettings } from "../../arching-kaos-web-ui-settings.js";
import { debugLog } from "../../utils.js";

var settings = getSettings();
debugLog(settings);

export function settingsSection()
{
    var settingsSection = {
        element: 'div',
        id: "settings-section",
        innerHTML: [
            {element: "div",
                className:"where-am-i",
                innerHTML:[
                    {element: "img", src:"./img/logo.png", onclick: "menusel({id:'#/welcome-section'})"},
                    {element: "span", innerText:">"},
                    {element: "h2", innerText:"🔧 Settings"}
                ]
            }
        ]
    };

    makeElement(settingsSection, document.querySelector('.main'));
    showSettings();
}

export function getSettingsPage()
{
    return document.querySelector('#settings-section');
}

// var server = new StellarSdk.Server(settings.stellar.horizon.list[settings.stellar.horizon.active], {allowHttp:true});

// if ( getSettings().stellar.scan )
// {
//     scanStellarNetworkForPeers();
// }
//
// if ( getSettings().ak.scan )
// {
//     ringlocalbell();
//     setInterval(ringlocalbell, 10*60*1000);
// }
// @license-end
