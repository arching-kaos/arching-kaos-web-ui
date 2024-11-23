/* Arching Kaos Menu
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */

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
        { element:'button', onclick:'menusel({id:"#/comments-section"})', innerText:"Comments"},
        { element:'button', onclick:'menusel({id:"#/files-section"})', innerText:"Files"}
    ]
};

makeElement(modulesSubmenuTemplate, document.querySelector('.lower-floor'));

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
makeElement(exploreSubmenuTemplate, document.querySelector('.lower-floor'));

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

makeElement(stellarSubmenuTemplate, document.querySelector('.lower-floor'));


/*
 * Menu bar management
 *
 * We change the visible floor according to menu selection.
 *
 */
var upperFloor = document.querySelector('.upper-floor');
var lowerFloor = document.querySelector('.lower-floor');
var doubleFloorMenu = document.querySelector('#double-floor'); 

upperFloor.style.display = 'flex';
lowerFloor.style.display = 'none';

var modulesSubmenu = document.querySelector('#modules-submenu');
modulesSubmenu.style.display = 'none';
function modulesSubToggle(){
    modulesSubmenu.style.display = modulesSubmenu.style.display === 'none' ? 'flex' : 'none';
    upperFloor.style.display = upperFloor.style.display === 'none' ? 'flex' : 'none';
    lowerFloor.style.display = lowerFloor.style.display === 'none' ? 'flex' : 'none';
}

var exploreSubmenu = document.querySelector('#explore-submenu');
exploreSubmenu.style.display = 'none';
function exploreSubToggle(){
    exploreSubmenu.style.display = exploreSubmenu.style.display === 'none' ? 'flex' : 'none';
    upperFloor.style.display = upperFloor.style.display === 'none' ? 'flex' : 'none';
    lowerFloor.style.display = lowerFloor.style.display === 'none' ? 'flex' : 'none';
}

var stellarSubmenu = document.querySelector('#stellar-submenu');
stellarSubmenu.style.display = 'none';
function stellarSubToggle(){
    stellarSubmenu.style.display = stellarSubmenu.style.display === 'none' ? 'flex' : 'none';
    upperFloor.style.display = upperFloor.style.display === 'none' ? 'flex' : 'none';
    lowerFloor.style.display = lowerFloor.style.display === 'none' ? 'flex' : 'none';
}

// Function to hide all the panes
function menuinit(){
    menuids.forEach(m=>document.querySelector(m).hidden=true);
}

/*
 * Function called on clicks on the menu bar
 * Unhides the pane connected to the clicked menu entry
 */
function menusel(m){
    menuinit();
    // document.querySelector(m.id.replace('/','')).hidden=false;
    locationHashSetter(m.id);
    
    mainContainer.style.display = 'block';
    if ( isMobile ) {
        doubleFloorMenu.style.display = 'none';
    }
}

function toggleMenu(){
    mainContainer.style.display = 'none';
    doubleFloorMenu.style.display = 'flex';
}

// And call
menuinit();
locationHashOnChange();

isMobile ? doubleFloorMenu.style.display = 'none':doubleFloorMenu.style.display = 'flex';
// @license-end
