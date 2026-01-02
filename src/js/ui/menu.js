// Arching Kaos Menu
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../arching-kaos-generator.js";
import { locationHashSetter } from "../arching-kaos-spa-router.js";
import { mainContainer } from "../app.js";
import { debugLog } from "../utils.js";

export function doubleFloorMenu()
{
    return document.querySelector('#double-floor');
}
export function upperFloor()
{
    return document.querySelector('.upper-floor');
}

export function lowerFloor()
{
    return document.querySelector('.lower-floor');
}

export function modulesSubmenu()
{
    return document.querySelector('#modules-submenu');
}

export function exploreSubmenu()
{
    return document.querySelector('#explore-submenu');
}

export function stellarSubmenu()
{
    return document.querySelector('#stellar-submenu');
}


export function menuSpawn()
{
    var menuButton = {
        element: "button",
        id:"mobile-menu",
        innerText:"Show menu"
    };

    makeElement(menuButton, document.querySelector('#menu-placeholder'));

    document.querySelector('#mobile-menu').addEventListener("click", toggleMenu);

    var menuLayout = {
        element: 'nav', id:"double-floor", innerHTML:[
            { element: "div", id:"menu", className:"upper-floor", innerHTML: [
                { element: "button", onclick:'menusel({id:"#/welcome-section"})', innerText:"Home"},
                { element: "button", onclick:'modulesSubToggle()', innerText:"Modules"},
                { element: "button", onclick:'exploreSubToggle()', innerText:"Explore"},
                { element: "button", onclick:'menusel({id:"#/chat-section"})', innerText:"Chat"},
                { element: "button", onclick:'menusel({id:"#/radio-section"})', innerText:"Radio"},
                { element: "button", onclick:'menusel({id:"#/settings-section"})', innerText:"Settings"},
                { element: "button", onclick:'stellarSubToggle()', innerText:"Stellar"},
                { element: "button", onclick:'menusel({id:"#/logs-section"})', innerText:"Logs"},
                { element: "button", onclick:'menusel({id:"#/about-section"})', innerText:"About"}
            ]
            },
            { element: "div", id:"menu", className:"lower-floor"}
        ]
    };

    makeElement(menuLayout, document.querySelector('#menu-placeholder'));

    var modulesSubmenuTemplate = {
        element: 'div',
        className:"dropdown",
        id:"modules-submenu",
        innerHTML: [
            { element:'button', onclick:"modulesSubToggle()", innerText:".."},
            { element:'button', onclick:'menusel({id:"#/mixtapes-section"})', innerText:"Mixtapes"},
            { element:'button', onclick:'menusel({id:"#/news-section"})', innerText:"News"},
            { element:'button', onclick:'menusel({id:"#/markdown-section"})', innerText:"Markdown"},
            { element:'button', onclick:'menusel({id:"#/comments-section"})', innerText:"Comments"},
            { element:'button', onclick:'menusel({id:"#/files-section"})', innerText:"Files"},
            { element:'button', onclick:'menusel({id:"#/generic-section"})', innerText:"Generic"}
        ]
    };

    makeElement(modulesSubmenuTemplate, lowerFloor());

    var exploreSubmenuTemplate = {
        element: 'div',
        className:"dropdown",
        id:"explore-submenu",
        innerHTML: [
            { element:'button', onclick:"exploreSubToggle()", innerText:".."},
            { element:'button', onclick:'menusel({id:"#/zchain-data-section"})', innerText:"zchain"},
            { element:'button', onclick:'menusel({id:"#/stats-section"})', innerText:"Stats"}
        ]
    };
    makeElement(exploreSubmenuTemplate, lowerFloor());

    var stellarSubmenuTemplate = {
        element: 'div',
        className:"dropdown",
        id:"stellar-submenu",
        innerHTML: [
            { element:'button', onclick:"stellarSubToggle()", innerText:".."},
            { element:'button', onclick:'menusel({id:"#/mypage-section"})', innerText:"My page"},
            { element:'button', onclick:'menusel({id:"#/stellar-balances"})', innerText:"Balances"},
            { element:'button', onclick:'menusel({id:"#/stellar-data-config"})', innerText:"Data"},
            { element:'button', onclick:'menusel({id:"#/arching-kaos-node-info"})', innerText:"Node Info"}
        ]
    };

    makeElement(stellarSubmenuTemplate, lowerFloor());

    upperFloor().style.display = 'flex';
    lowerFloor().style.display = 'none';
    modulesSubmenu().style.display = 'none';
    exploreSubmenu().style.display = 'none';
    stellarSubmenu().style.display = 'none';
}

/*
 * Menu bar management
 *
 * We change the visible floor according to menu selection.
 *
 */

export function modulesSubToggle(){
    modulesSubmenu().style.display = modulesSubmenu().style.display === 'none' ? 'flex' : 'none';
    upperFloor().style.display = upperFloor().style.display === 'none' ? 'flex' : 'none';
    lowerFloor().style.display = lowerFloor().style.display === 'none' ? 'flex' : 'none';
}

export function exploreSubToggle(){
    exploreSubmenu().style.display = exploreSubmenu().style.display === 'none' ? 'flex' : 'none';
    upperFloor().style.display = upperFloor().style.display === 'none' ? 'flex' : 'none';
    lowerFloor().style.display = lowerFloor().style.display === 'none' ? 'flex' : 'none';
}

export function stellarSubToggle(){
    stellarSubmenu().style.display = stellarSubmenu().style.display === 'none' ? 'flex' : 'none';
    upperFloor().style.display = upperFloor().style.display === 'none' ? 'flex' : 'none';
    lowerFloor().style.display = lowerFloor().style.display === 'none' ? 'flex' : 'none';
}
/*
 * Array of all the menu-panes IDs
 */
export function menuids()
{
    return [
        '#welcome-section',
        '#about-section',
        '#donation-section',
        '#zchain-data-section',
        '#news-section',
        '#comments-section',
        '#stats-section',
        '#markdown-section',
        '#mixtapes-section',
        '#chat-section',
        '#radio-section',
        '#mypage-section',
        '#stellar-balances',
        '#stellar-data-config',
        '#arching-kaos-node-info',
        '#files-section',
        '#settings-section',
        '#stellar-section',
        '#generic-section',
        '#logs-section',
        '#not-found-section'
    ]
};

// Function to hide all the panes
export function menuinit(){
    for ( var i = 0; i < menuids().length; i++ ){
        var sec = document.querySelector(menuids()[i]);
        if ( sec !== null )
        {
            sec.hidden = true;
        }
        else
        {
            debugLog(`menuinit: ${menuids()[i]} was not found`);
        }
    }
}

/*
 * Function called on clicks on the menu bar
 * Unhides the pane connected to the clicked menu entry
 */
export function menusel(m){
    menuinit();
    // document.querySelector(m.id.replace('/','')).hidden=false;
    locationHashSetter(m.id);

    mainContainer().style.display = 'block';
    if ( window.isMobile ) {
        doubleFloorMenu().style.display = 'none';
    }
}

export function toggleMenu(){
    mainContainer().style.display = 'none';
    doubleFloorMenu().style.display = 'flex';
}

// @license-end
