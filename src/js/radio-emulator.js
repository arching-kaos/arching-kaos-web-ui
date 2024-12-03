// Radio Station Emulator
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//
// A simple co-mechanism to pretend playing a live radio as it would happen for
// a radio station that mostly plays prerecoded shows.
//
// Client side implementation
// Let's remind here the structures we are waiting for:
// 1. Hash
// 2. 0
// 3. audio/ogg file
// 4. application/json file
//
// 1. Hash
// Can be an SHA512sum or SHA256sum, we don't do checks, we only ask the hash
// accompanied by what do we think it is.
//
// 2. 0
// When nothing exists on the radio station we are visiting.
//
// 3. audio/ogg file
// An audio file to play.
//
// 4. application/json file
// Could be one of the following:
//   - list
//   - show_info
//
import { makeElement } from "./arching-kaos-generator.js";
import { getSettings } from "./arching-kaos-web-ui-settings.js";
import { generateImage } from "./image-generator.js";

var debugMode = false;
const settings = getSettings();
const apiURL = settings.ak.radio.list[settings.ak.radio.active];
const version = "v0";
const listRequest = `${apiURL}/${version}/list`
const jsonRequest = `${apiURL}/${version}/application/json/`
const audioRequest = `${apiURL}/${version}/audio/ogg/`

const documentTitle = "Radio Station Emulator";
const separator = " :: ";

export function getAudioElement()
{
    return document.querySelector('#radio-player');
}

export function getCurrentTime()
{
    return document.querySelector('.current-time');
}

export function getListStarted()
{
    return document.querySelector('.started-on');
}

export function getCurrentShowHash ()
{
    return document.querySelector('.current-show-hash');
}

export function getListHash ()
{
    return document.querySelector('.list-hash');
}

export function getArtist()
{
    return document.querySelector('.artist');
}

export function getTitle()
{
    return document.querySelector('.title');
}

export function getRadioPlayer()
{
    return document.querySelector('.radio-player');
}

export function getYouAreHere ()
{
    return document.querySelector('.you-are-here');
}

export function getPlayProgress()
{
    return document.querySelector('.play-progress');
}

export function getStartsOn()
{
    return document.querySelector('.starts-on');
}

export function getShowDuration()
{
    return document.querySelectorAll('.show-duration');
}

export function getRelativeTime()
{
    return document.querySelector('.relative-time');
}

export function getListeningAt()
{
    return document.querySelector('.listening-at');
}

export function getDlProgress()
{
    return document.querySelector('.dl-progress');
}

export function getMinTimesPlayed()
{
    return document.querySelector('.min-played');
}

export function getMaxTimesPlayed()
{
    return document.querySelector('.max-played');
}

export function getListDuration()
{
    return document.querySelector('.list-duration');
}

export function getPreviouslyPlayed()
{
    return document.querySelector('.previously-played');
}

export function getShowInfo()
{
    return document.querySelector('.show-info');
}

export function getListInfo()
{
    return document.querySelector('.list-info');
}

export function getDt()
{
    return document.querySelector('.d-t');
}

export function getDeltaTime()
{
    return document.querySelector('.delta-time');
}

export function getTimeOfVisit()
{
    return document.querySelector('.time-of-visit');
}

var values = {
    delta_time: 0,
    min_times_played: 0,
    maxTimesPlayed: 0,
    Dt: 0,
    now_on_sequence: 0,
    seconds_here: 0,
    current_time: 0
}

function debugLog(message)
{
    if ( debugMode ) console.log(message);
}

function setTitleSyncing(){
    document.title = "🔃Syncing" + separator + documentTitle;
}

function setTitleMessage(message){
    document.title = message + separator + documentTitle;
}

function updateComponentsAfterIncreaseSeconds()
{
    getYouAreHere().innerText = values.seconds_here;
    getPlayProgress().value = values.current_time + values.seconds_here;
    getRelativeTime().innerText = values.current_time + values.seconds_here;
    getListeningAt().innerText = Math.floor(getAudioElement().currentTime);
}

function increaseSeconds()
{
    values.seconds_here = values.seconds_here + 1;
    updateComponentsAfterIncreaseSeconds();
    return values.seconds_here;
}
function getSecondsHere()
{
    return values.seconds_here;
}

setInterval(increaseSeconds, 1000);


function FetchJSON( url, callback, params )
{
    setTitleSyncing();
    const request = new XMLHttpRequest();
    request.addEventListener("load", ()=>{
        var json = JSON.parse(request.response);
        if(request.status !== 404){
            callback(json, params);
        } else {
            debugLog(`ERROR ${request.status} while loading ${url}`);
        }
    });
    request.addEventListener("error", ()=>{
        debugLog("An error occured. While loading: "+url+" for "+callback+".");
    });
    request.addEventListener("abort", ()=>{
        debugLog("Request aborted: "+url+" for "+callback+".");
    });
    request.open("GET", url);
    request.send();
}

function FetchAudio(url, callback)
{
    const request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.addEventListener("load", ()=>{
        if(request.status === 200){
            debugLog("Got it... trying!")
            getDlProgress().value = 100;
            getAudioElement().src = URL.createObjectURL(request.response);
            callback();
            //getAudioElement().play();
            debugLog("Tried... did it work?");
        } else {
            debugLog(`ERROR ${request.status} while loading ${url}`);
        }
    });
    request.addEventListener("progress", (event)=>{
        if (event.lengthComputable)
        {
            debugLog(`Fetching: ${event.total}`);
            getDlProgress().value = (event.loaded/event.total)*100;
        }
    });
    request.addEventListener("error", ()=>{
        debugLog("An error occured. While loading: "+url);
    });
    request.addEventListener("abort", ()=>{
        debugLog("Request aborted: "+url);
    });
    request.open("GET", url);
    request.send();
}

function genericCallback(json, params)
{
    debugLog('genericCallback');
    debugLog(json);
    debugLog(params);
}

var calledLoadShowCallback = 0;

function stopHereAndReflect()
{
    return 0;
}

function updateComponentsAfterLoadShowCallback(json, listItem)
{
    setTitleMessage ( "▶️ " + json.artist + " - " + json.title );
    getCurrentShowHash().innerText = listItem.hash;
    getArtist().innerText = json.artist;
    getTitle().innerText = json.title;
    getShowDuration().forEach((element)=>{element.innerText = Math.floor(listItem.duration/1000)});
    getStartsOn().innerText = listItem.starts_on;
    getPlayProgress().max = Math.floor(listItem.duration/1000);
    getShowInfo().innerText = JSON.stringify(json, null, 2);
    getCurrentTime().innerText = values.current_time;
}

function loadShowCallback(json, params)
{
    const [ list, now_on_sequence, listItem, hash_of_list ] = params;
    debugLog('loadShowCallback');
    debugLog(json);
    debugLog(listItem);
    //debugLog(params);
    getAudioElement().load();
    FetchAudio(`${audioRequest}${json.hash}`, sync_radio);
    getAudioElement().type = json.mimetype;
    values.current_time = Math.floor((values.now_on_sequence/1000)); // - listItem.starts_on)/1000);
    updateComponentsAfterLoadShowCallback(json, listItem);
    getAudioElement().addEventListener('ended', function(){
        values.current_time = 0;
        values.seconds_here = 0;
        getCurrentTime().value = 0;
        FetchJSON(`${listRequest}`, hashCallback, [ new Date().getTime() ]);
    });
}

function preciseIncreaseVolume(value)
{
    if ( value <= 1 ) getAudioElement().volume = value;
}

function fadeInAudio()
{
    var timeSpan = 1000;
    var timeStep = 100;
    for ( var i = 0; i <= 90; i++ )
    {
        timeSpan = timeSpan + timeStep;
        var newVolume = Math.sin(i*(Math.PI/180));
        setTimeout( preciseIncreaseVolume(newVolume), timeSpan);
    }
}

export function sync_radio()
{
    var new_now = values.current_time + getSecondsHere();
    debugLog("Trying to sync @ "+ values.current_time + " + " + getSecondsHere() + " = " + new_now);
    getAudioElement().currentTime = new_now;
    getAudioElement().play();
    getAudioElement().muted = false;
    getAudioElement().volume = 0;
    fadeInAudio();
    return new_now;
}

function syncOnDOMfromListCallback(now, hash_of_list, json)
{
    getTimeOfVisit().innerText = now;
    getListStarted().innerText = json.started_on;
    getListDuration().innerText = json.duration;
    getListHash().innerText = hash_of_list;
    getDeltaTime().innerText = values.delta_time;
    getMinTimesPlayed().innerText = values.min_times_played;
    getMaxTimesPlayed().innerText = values.max_times_to_be_played;
    getDt().innerText = values.Dt;
    getCurrentTime().innerText = values.now_on_sequence;
    getListInfo().innerText = JSON.stringify(json, null, 2);
}

function infoShowCallback(json, params)
{
    var [ hash ] = params;
    if ( document.querySelector(`#d-${hash}`) !== null )
    {
        var parent = document.querySelector(`#d-${hash}`);
        var tableElement = {
            element:'div',
            id: `t-${hash}`,
            innerHTML:[
                {element:"div",innerText:`${json.artist}`},
                {element:"div",innerText:`${json.title}`}
            ]
        };
        makeElement(tableElement, parent);
    }
}

function appendPreviouslyPlayedShows(listItem){
    if ( document.querySelector(`#d-${listItem.hash}`) === null )
    {
        var tmp = {
            element:'div',
            style: 'flex-direction:row;align-items:center;',
            id: `d-${listItem.hash}`,
            innerHTML:[
                { element:"img", id: `i-${listItem.hash}` }
            ]
        }
        makeElement(tmp, getPreviouslyPlayed());
        document.querySelector(`#d-${listItem.hash}`).scrollIntoView();
        generateImage(listItem.hash, 'new');
        FetchJSON(`${jsonRequest}${listItem.hash}`, infoShowCallback, [listItem.hash]);
    }
}

function listCallback(json, params)
{
    debugLog('listCallback');
    debugLog(json);
    debugLog(params);
    var [ now, hash_of_list ] = params;
    values.delta_time = now - json.started_on;
    values.min_times_played = Math.floor( values.delta_time / json.duration );
    values.max_times_to_be_played = values.delta_time / json.duration;
    values.Dt = values.max_times_to_be_played - values.min_times_played;
    values.now_on_sequence = values.Dt * json.duration;
    syncOnDOMfromListCallback(now, hash_of_list, json);
    debugLog(`now_on_sequence: ${values.now_on_sequence}, Dt: ${values.Dt}`)
    debugLog(json.list.map((item, index)=>({index, value: item})).sort((a,b)=>{return b.value.index - a.value.index}));
    if ( json.list.length === 1 )
    {
        FetchJSON(`${jsonRequest}${json.list[0].hash}`, loadShowCallback, [json, values.now_on_sequence, json.list[0], hash_of_list]);
    }
    else
    {
        for ( var i = 0; i < json.list.length - 1; i++)
        {
            if( i !== 0 ) appendPreviouslyPlayedShows(json.list[i-1]);
            debugLog("getting there " + i)
            debugLog(`${json.list[i].starts_on} < ${values.now_on_sequence} < ${json.list[i+1].starts_on}`);
            if ( json.list[i].starts_on < values.now_on_sequence && values.now_on_sequence < json.list[i+1].starts_on )
            {
                values.now_on_sequence = values.now_on_sequence - json.list[i].starts_on;
                debugLog(`now_on_sequence (1updated): ${values.now_on_sequence}`);
                FetchJSON(`${jsonRequest}${json.list[i].hash}`, loadShowCallback, [json, values.now_on_sequence, json.list[i], hash_of_list]);
                generateImage(json.list[i].hash);
                debugLog('First!');
                break;
            }
            else if ( values.now_on_sequence > json.list[i+1].starts_on && i === json.list.length - 2 )
            {
                if( i !== 0 ) appendPreviouslyPlayedShows(json.list[i]);
                values.now_on_sequence = values.now_on_sequence - json.list[i+1].starts_on;
                FetchJSON(`${jsonRequest}${json.list[i+1].hash}`, loadShowCallback, [json, values.now_on_sequence, json.list[i+1], hash_of_list]);
                generateImage(json.list[i].hash);
                debugLog('Second!');
                break;
            }
            else
            {
                debugLog(`We are here: ${i}`);
                debugLog(values.now_on_sequence);
                debugLog(json.list[i].starts_on);
                if (i > 0) debugLog(json.list[i-1].starts_on);
                debugLog('Nothing!');
            }
        }
    }
}

function hashCallback(json, params)
{
    var [ now ] = params;
    debugLog('hashCallback');
    FetchJSON(`${jsonRequest}${json.latest_list}`, listCallback, [now, json.latest_list]);
}

export function start_radio()
{
    FetchJSON(`${listRequest}`, hashCallback, [ new Date().getTime() ]);
}

// @license-end
