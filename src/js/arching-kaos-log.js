/* Arching Kaos Log
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */

function archingKaosLog(message){
    var sta = document.createElement("div");
    var lts = new Date(Date.now());
    var fmsg = lts.toISOString() + " " + message;
    sta.innerText = fmsg
    currentLogMessageElement.innerHTML = fmsg;
    logsAreaElement.appendChild(sta);
}
// @license-end
