// Arching Kaos Utils
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

var showDebug = false;

export function setDebug(value)
{
    if ( value === true || value === false ) showDebug = value;
}

export function refreshChat()
{
    document.querySelector('#chat-iframe').src = 'https://irc.arching-kaos.net';
}

export function refreshRadio()
{
    document.querySelector('#radio-iframe').src = 'https://radio.arching-kaos.com';
}

export function debugLog(message)
{
    if (showDebug) console.log(message);
}
// @license-end
