import { makeElement } from "../../arching-kaos-generator.js";
import { getSettings } from "../../arching-kaos-web-ui-settings.js";

var settings = getSettings();
console.log(settings);

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
}

export function getSettingsPage()
{
    return document.querySelector('#settings-section');
}

// var scripts = [
//     {
//         element:"script",
//         type: "module",
//         src:"./js/arching-kaos-web-ui-settings.js"
//     }
// ];
//
// for ( var i = 0; i < scripts.length; i++ )
// {
//     makeElement(scripts[i], document.querySelector('body'));
// }

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
