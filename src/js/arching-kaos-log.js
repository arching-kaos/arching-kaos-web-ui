
function archingKaosLog(message){
    var sta = document.createElement("div");
    var lts = new Date(Date.now());
    var fmsg = lts.toISOString() + " " + message;
    sta.innerText = fmsg
    currentLogMessageElement.innerHTML = fmsg;
    logsAreaElement.appendChild(sta);
}
