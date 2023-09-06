/*
 * Menu bar management
 *
 * We change the visible floor according to menu selection.
 *
 */
var upperFloor = document.querySelector('.upper-floor');
var lowerFloor = document.querySelector('.lower-floor');
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

//var doubleFloorMenuDisplay = doubleFloorMenu.style.display;
function toggleMenu(m){
    mainContainer.style.display = 'none';
    doubleFloorMenu.style.display = 'flex';
}
