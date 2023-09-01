// var radio = document.querySelector("#radio-player");
// var radioButton = document.querySelector("#radio-button-controller");

radio.addEventListener("play", ()=>{
    radioButton.innerText = "turn off";
})
radio.addEventListener("pause", ()=>{
    radioButton.innerText = "turn on";
})

function radioToggle(){
    if (radio.paused) {
        radio.play();
    } else {
        radio.pause();
    }
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
