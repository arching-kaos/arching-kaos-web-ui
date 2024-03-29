/*
 * Body and pageLayout resizer to device's resolution.
 *
 * TODO: Figure out why it doesn't work in fullscreen App mode (android)
 *
 */
body.width = window.innerWidth;
body.height = window.innerHeight;
pageLayout.width = window.innerWidth;
pageLayout.height = window.innerHeight;
mainContainer.style.display = 'block';
window.innerWidth <= 770 ? isMobile = true : isMobile = false;
isMobile ? doubleFloorMenu.style.display = 'none':doubleFloorMenu.style.display = 'flex';
function onWindowResize(){
    body.width = window.innerWidth;
    body.height = window.innerHeight;
    pageLayout.width = window.innerWidth;
    pageLayout.height = window.innerHeight;
    window.innerWidth <= 770 ? isMobile = true : isMobile = false;
    isMobile ? doubleFloorMenu.style.display = 'none':doubleFloorMenu.style.display = 'flex';
}
window.addEventListener('resize', onWindowResize, false);

// And call
menuinit();
locationHashOnChange();

progressPlaceholder.value = '0';

progressPlaceholder.max++;

if ( activeSettings.scanStellar ) {
    scanStellarNetworkForPeers();
}

if ( activeSettings.ringLocalBell )  ringlocalbell();

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
