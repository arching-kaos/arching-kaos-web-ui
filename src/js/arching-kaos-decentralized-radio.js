// var radio = document.querySelector("#radio-player");
// var radioButton = document.querySelector("#radio-button-controller");

radio.addEventListener("play", ()=>{
    radioButton.innerHTML = '<svg    width="32px"    height="32px"    viewBox="0 0 33.866666 33.866666"    version="1.1"    id="svg1"    inkscape:version="1.3.2 (091e20ef0f, 2023-11-25)"    sodipodi:docname="stop-button.svg"    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"    xmlns="http://www.w3.org/2000/svg"    xmlns:svg="http://www.w3.org/2000/svg">   <sodipodi:namedview      id="namedview1"      pagecolor="#ffffff"      bordercolor="#666666"      borderopacity="1.0"      inkscape:showpageshadow="2"      inkscape:pageopacity="0.0"      inkscape:pagecheckerboard="0"      inkscape:deskcolor="#d1d1d1"      inkscape:document-units="px"      inkscape:zoom="2.56"      inkscape:cx="34.960938"      inkscape:cy="49.609375"      inkscape:window-width="1364"      inkscape:window-height="722"      inkscape:window-x="1366"      inkscape:window-y="22"      inkscape:window-maximized="1"      inkscape:current-layer="layer1" />   <defs      id="defs1" />   <g      inkscape:label="Layer 1"      inkscape:groupmode="layer"      id="layer1">     <rect        style="fill:#fe3f00;fill-opacity:1;stroke:#000000;stroke-width:4.18075;stroke-dasharray:25.08449936,25.08449936;stroke-opacity:1;stroke-dashoffset:0"        id="rect1"        width="29.685917"        height="29.685913"        x="2.0903761"        y="2.0903745" />   </g> </svg>';
})
radio.addEventListener("pause", ()=>{
    radioButton.innerHTML = '<svg    width="32px"    height="32px"    viewBox="0 0 33.866666 33.866666"    version="1.1"    id="svg1"    inkscape:version="1.3.2 (091e20ef0f, 2023-11-25)"    sodipodi:docname="play-button.svg"    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"    xmlns="http://www.w3.org/2000/svg"    xmlns:svg="http://www.w3.org/2000/svg">   <sodipodi:namedview      id="namedview1"      pagecolor="#ffffff"      bordercolor="#666666"      borderopacity="1.0"      inkscape:showpageshadow="2"      inkscape:pageopacity="0.0"      inkscape:pagecheckerboard="0"      inkscape:deskcolor="#d1d1d1"      inkscape:document-units="px"      inkscape:zoom="2.56"      inkscape:cx="34.960938"      inkscape:cy="49.609375"      inkscape:window-width="1364"      inkscape:window-height="722"      inkscape:window-x="1366"      inkscape:window-y="22"      inkscape:window-maximized="1"      inkscape:current-layer="layer1" />   <defs      id="defs1" />   <g      inkscape:label="Layer 1"      inkscape:groupmode="layer"      id="layer1">     <path        id="rect1"        style="fill:#fe3f00;stroke:#000000;stroke-width:4.18075;stroke-dasharray:25.0845, 25.0845"        d="M 2.0903761,2.0903745 31.383535,16.963796 2.0903761,31.776288 Z"        sodipodi:nodetypes="cccc" />   </g> </svg>';
})

var played = [];
var list = mixtapeIds;
var currentPlaying = 0;


function radioLoad()
{
    var elem = document.querySelector('#'+mixtapeIds[0]).firstChild.cloneNode(true);
    currentPlaying = 0;
    radio.appendChild(elem);
    radio.play();
}

function radioLoadNextAndPlay()
{
    currentPlaying += 1;
    radio.removeChild(radio.firstChild);
    var elem = document.querySelector('#'+mixtapeIds[currentPlaying]).firstChild.cloneNode(true);
    if ( elem !== null )
    {
        radio.appendChild(elem);
        radio.load();
        radio.play();
    }
    else
    {
        radioLoad();
    }
}

radio.addEventListener("ended", radioLoadNextAndPlay);

function radioToggle()
{
    if (radio.paused)
    {
        radio.play();
    }
    else
    {
        radio.pause();
    }
}

// vim: tabstop=4 shiftwidth=4 expandtab softtabstop=4
