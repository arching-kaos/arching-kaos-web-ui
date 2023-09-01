
function archingKaosLog(message){
    var sta = document.createElement("pre");
    var lts = new Date(Date.now());
    var fmsg = lts.toISOString() + " " + message;
    sta.innerText = fmsg
    currentLogMessageElement.innerText = fmsg;
    logsAreaElement.appendChild(sta);
}
