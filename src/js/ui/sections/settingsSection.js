import { makeElement } from "../../arching-kaos-generator.js";
import { settings } from "../../arching-kaos-web-ui-settings.js";

var settingsSection = {
    element: 'div',
    id: "settings-section",
    innerHTML: `
        <div class="where-am-i">
            <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
            <span>&gt;</span>
            <h2>🔧 Settings</h2>
        </div>
                `
}

makeElement(settingsSection, document.querySelector('.main'));

var settingsPage = document.querySelector('#settings-section');

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

var server = new StellarSdk.Server(settings.stellar.horizon.list[settings.stellar.horizon.active], {allowHttp:true});

if ( settings.stellar.scan )
{
    scanStellarNetworkForPeers();
}

if ( settings.ak.scan )
{
    ringlocalbell();
    setInterval(ringlocalbell, 10*60*1000);
}
