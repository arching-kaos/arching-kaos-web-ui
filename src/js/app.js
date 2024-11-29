/* Arching Kaos Web UI App Launcher
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 *
 * Body and pageLayout resizer to device's resolution.
 *
 * TODO: Figure out why it doesn't work in fullscreen App mode (android)
 *
 */
import { makeElement } from "./arching-kaos-generator.js";
import { locationHashOnChange } from "./arching-kaos-spa-router.js";
import { doubleFloorMenu, menuinit, menusel, stellarSubToggle, modulesSubToggle, exploreSubToggle } from './ui/menu.js';
import { mainLayoutSpawn } from "./ui/mainLayout.js";
import { scanStellarNetworkForPeers } from "./arching-kaos-stellar-network.js";

window.menusel = menusel;
window.locationHashOnChange = locationHashOnChange;
window.stellarSubToggle = stellarSubToggle;
window.modulesSubToggle = modulesSubToggle;
window.exploreSubToggle = exploreSubToggle;
window.scanStellarNetworkForPeers = scanStellarNetworkForPeers;

export function body()
{
    return document.querySelector('body');
}

export function pageLayout()
{
    return document.querySelector('.page-layout');
}

export function mainContainer()
{
    return document.querySelector('.main');
}

window.isMobile = false;

export function aknet()
{
    return document.querySelector('.aknet-network')
}

export function resultsArea()
{
    return document.querySelector('.results-area')
}

export function progressPlaceholder()
{
    return document.querySelector('#total-progress');
}

export function httpProgressPlaceholder()
{
    return document.querySelector('#http-progress');
}

export function currentLogMessageElement()
{
    return document.querySelector('#current-log-message');
}

export function logsAreaElement()
{
    return document.querySelector("#logs-area-element");
}

export function radio()
{
    return document.querySelector("#radio-player");
}

export function radioButton()
{
    return document.querySelector("#radio-button-controller");
}


body().width = window.innerWidth;
body().height = window.innerHeight;
pageLayout().width = window.innerWidth;
pageLayout().height = window.innerHeight;
mainContainer().style.display = 'block';
window.innerWidth <= 850 ? window.isMobile = true : window.isMobile = false;

function onWindowResize()
{
    body.width = window.innerWidth;
    body.height = window.innerHeight;
    pageLayout.width = window.innerWidth;
    pageLayout.height = window.innerHeight;
    window.innerWidth <= 850 ? window.isMobile = true : window.isMobile = false;
    window.isMobile ? doubleFloorMenu().style.display = 'none': doubleFloorMenu().style.display = 'flex';
}
window.addEventListener('resize', onWindowResize, false);


//scanStellarNetworkForPeers();
// setInterval(scanStellarNetworkForPeers, 60000);

var root = {
    head: document.querySelector('head'),
    body: document.querySelector('body'),
    html: document.querySelector('html')
};

// var scripts = [
//     {
//         element:"script",
//         type: "module",
//         src:"./js/ui/mainLayout.js"
//     }
// ];
//
// for ( var i = 0; i < scripts.length; i++ )
// {
//     makeElement(scripts[i], root.body);
// }

mainLayoutSpawn();
// And call
menuinit();
locationHashOnChange();

window.isMobile ? doubleFloorMenu().style.display = 'none': doubleFloorMenu().style.display = 'flex';
// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
// @license-end
