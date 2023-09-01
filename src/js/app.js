// Irrelevant for now
if (DEBUG) console.log(window.location);

body.width = window.innerWidth;
body.height = window.innerHeight;
pageLayout.width = window.innerWidth;
pageLayout.height = window.innerHeight;
mainContainer.style.display = 'block';
window.innerWidth <= 770 ? isMobile = true : isMobile = false;
isMobile ? doubleFloorMenu.style.display = 'none':doubleFloorMenu.style.display = 'flex';
window.addEventListener('resize', () => {
    body.width = window.innerWidth;
    body.height = window.innerHeight;
    pageLayout.width = window.innerWidth;
    pageLayout.height = window.innerHeight;
    window.innerWidth <= 770 ? isMobile = true : isMobile = false;
    isMobile ? doubleFloorMenu.style.display = 'none':doubleFloorMenu.style.display = 'flex';
})

// And call
menuinit();
// We bring up the default pane ( #welcome-section )
document.querySelector('#welcome-section').hidden=false;

progressPlaceholder.value = '0';

progressPlaceholder.max++;

if ( activeSettings.scanStellar ) {
    scanStellarNetworkForPeers();
}

if ( activeSettings.ringLocalBell )  ringlocalbell();

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
