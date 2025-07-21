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

export function offerDownloadableData(data)
{
    var link = document.createElement('a');
    link.download = 'data';
    var blob = new Blob([data]); // , {type: 'text/plain'}
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

export function decodeBase64ToHex(base64String) {
    const binaryString = atob(base64String);
    // Convert the binary string to a byte array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    // Convert the byte array to a hex string representation
    return Array.from(byteArray)
        .map(byte => byte.toString(16).padStart(2, '0')) // Convert to hex and pad with zeros
        .join(''); // Join with spaces for readability
}
// @license-end
