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
body.width = window.innerWidth;
body.height = window.innerHeight;
pageLayout.width = window.innerWidth;
pageLayout.height = window.innerHeight;
mainContainer.style.display = 'block';
window.innerWidth <= 770 ? isMobile = true : isMobile = false;
isMobile ? doubleFloorMenu.style.display = 'none':doubleFloorMenu.style.display = 'flex';
function onWindowResize()
{
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

if ( settings.stellar.scan )
{
    scanStellarNetworkForPeers();
}

if ( settings.ak.scan )
{
    ringlocalbell();
    setInterval(ringlocalbell, 10*60*1000);
}

//scanStellarNetworkForPeers();
// setInterval(scanStellarNetworkForPeers, 60000);

var root = {
    head: document.querySelector('head'),
    body: document.querySelector('body'),
    html: document.querySelector('html')
};

var scripts = [
    {
        element:"script",
        src:"./js/ui/mainLayout.js"
    },
    {
        element:"script",
        src:"./js/page-navigation.js"
    },
    {
        element:"script",
        src:"./js/page-projects.js"
    },
    {
        element:"script",
        src:"./js/menu.js"
    }
];

for ( var i = 0; i < scripts.length; i++ )
{
    makeElement(scripts[i], root.body);
}
// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
// @license-end
