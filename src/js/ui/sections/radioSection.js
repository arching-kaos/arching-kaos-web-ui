// Arching Kaos Radio Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";
import { start_radio, sync_radio } from "../../radio-emulator.js";

window.start_radio = start_radio;
window.sync_radio = sync_radio;

export function radioSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Radio"}
        ]
    };
    var radioContent = {
        element:"div",
        id: "radio-main",
        innerHTML:[
            {element:"div",className:"start-top",innerHTML:[
                {element:"div",className:"div-groups",style:"flex-grow:1;",innerHTML:[
                    {element:"div",className:"now-playing-details",innerHTML:[
                        {element:"div",className:"div-groups-row",innerHTML:[
                            {element:"img", className:"generated"},
                            {element:"table", innerHTML:[
                                {element:"tr",innerHTML:[
                                    {element:"th", innerText:"Artist"},
                                    {element:"td", className:"artist"}
                                ]},
                                {element:"tr",innerHTML:[
                                    {element:"th", innerText:"Title"},
                                    {element:"td", className:"title"}
                                ]},
                                {element:"tr",innerHTML:[
                                    {element:"th", innerText:"Starts On (ms)"},
                                    {element:"td", className:"starts-on"}
                                ]},
                                {element:"tr",innerHTML:[
                                    {element:"th", innerText:"Duration"},
                                    {element:"td",className:"show-duration"}
                                ]}
                            ]}
                        ]}
                    ]},
                    {element:"div", className:"enhanced-player",innerHTML:[
                        {element:"div", className:"radio-player",innerHTML:[
                            {element:"audio", id: "radio-player", preload:"auto", controls:true, muted:true}
                        ]},
                        {element:"div", className:"div-row",innerHTML:[
                            {element:"button", id:"start-button",innerText:"Start!"},
                            {element:"button", id:"sync-button",innerText:"Sync"}
                        ]}
                    ]}
                ]},
                {element:"div",className:"previously-played"},
            ]},
            {element:"div", className:"more-details", innerHTML:[
                {element:"details",id:"progress-details", innerHTML:[
                    {element:"summary", innerText:"Progress details"},
                    {element:"div",innerHTML:[
                        {element:"p", innerText:"Download progress:"},
                        {element:"progress",className:"dl-progress", max:"100"}
                    ]},
                    {element:"div",innerHTML:[
                        {element:"p", innerText:"Live progress:"},
                        {element:"progress",className:"play-progress"}
                    ]},
                    {element:"div", className:"div-inline",innerHTML:[
                        {element:"div", className:"div-inline",innerHTML:[
                            {element:"p", innerText:"Listening at:"},
                            {element:"p", className:"listening-at"},
                        ]},
                        {element:"div", className:"div-inline",innerHTML:[
                            {element:"p", innerText:"Show playback:"},
                            {element:"div", className:"no-break",innerHTML:[
                                {element:"p", className:"relative-time"},
                                {element:"p", innerText:"/"},
                                {element:"p", className:"show-duration"}
                            ]}
                        ]}
                    ]}
                ]},
                {element:"details",id:"sync-info", innerHTML:[
                    {element:"summary", innerText:"Sync info"},
                    {element:"div",className:"groups",innerHTML:[
                        {element:"h3", innerText:"Timings"},
                        {element:"table", innerHTML:[
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"Time of visit (ms)"},
                                {element:"td", className:"time-of-visit"}
                            ]},
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"Time elapsed since visited (s)"},
                                {element:"td", className:"you-are-here"}
                            ]},
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"List started on (ms)"},
                                {element:"td", className:"started-on"}
                            ]},
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"List duration (s)"},
                                {element:"td",className:"list-duration"}
                            ]}
                        ]},
                        {element:"h3", innerText:"Calculations"},
                        {element:"table", innerHTML:[
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"Times Fully Played"},
                                {element:"td", className:"min-played"}
                            ]},
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"Times Played"},
                                {element:"td", className:"max-played"}
                            ]},
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"Dt = TP - TFP"},
                                {element:"td", className:"d-t"}
                            ]},
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"Delta time"},
                                {element:"td",className:"delta-time"}
                            ]},
                            {element:"tr",innerHTML:[
                                {element:"th", innerText:"Initial \"tune in\" time (s)"},
                                {element:"td",className:"current-time"}
                            ]}

                        ]},
                    ]}
                ]},
                {element:"details",id:"about", innerHTML:[
                    {element:"summary",innerText:"Info to get you started"},
                    {element:"h2",innerText:"Notice"},
                    {element:"p",innerText:"If you are visiting for the first time, you might need to \"Allow Audio\" first. Please do and refresh the page."},
                    {element:"h2",innerText:"About"},
                    {element:"p",innerText:"This is a \"Radio Station Emulator\". We create lists with shows to be played, but since we are not doing streaming of the playlists, we offer another way of \"tuning in\"."},
                    {element:"p",innerText:"Providing the time a list started playing and having pre-calculated the starting timestamps of each show relevant to the list start timestamp, we can calculate which show is on and what its current time of playing is."},
                    {element:"p",innerText:"Ultimately, you are hearing what we would be streaming, as you would do for a regular radio station."},
                    {element:"h2",innerText:"Steps"},
                    {element:"ol",innerHTML:[
                        {element:"li",innerText:"First, your browser is going to ask our server here, what is the current list that plays right now. It will get a response and will fetch that list."},
                        {element:"li",innerText:"Based on properties of the list overall and the time of visit, your browser will start comparing each show's properties found in the list, to figure the relative time of yours on the list. A progress bar labeled \"Live progress\" will be indicating the correct time on the show."},
                        {element:"li",innerText:"Having figured out the show that is playing, it will go and download the whole show. Progress of that would be observable via the \"Download progress\" bar below."},
                        {element:"li",innerText:"Upon completion of the download, the \"Sync\" button is auto pressed and the player start playing the show from the calculated second it calculated previously."},
                    ]},
                    {element:"h2",innerText:"Notes"},
                    {element:"ul",innerHTML:[
                        {element:"li",innerText:"Sometimes, you might need to press the \"Sync\" button more than once. That's mostly due to bandwidth capabilities of both the server and the client. The \"tune\" would be right if you press it multiple times and land near the same timespace over and over."},
                        {element:"li",innerText:"Ideally, if \"Listening at:\" and \"Show playback:\" havea the same value then you are in sync!"}
                    ]}
                ]},
                {element:"details",id:"data",  innerHTML:[
                    {element:"summary", innerText:"Data segments"},
                    {element:"h3",innerText:"Hash of list"},
                    {element:"pre", className:"list-hash"},
                    {element:"h3",innerText:"List info (JSON)"},
                    {element:"pre", className:"list-info"},
                    {element:"h3",innerText:"Hash of current show"},
                    {element:"pre", className:"current-show-hash"},
                    {element:"h3",innerText:"Show info (JSON)"},
                    {element:"pre", className:"show-info"},
                    {element:"div", innerHTML:[
                        {element:"a", href:"./data.html", target:"_blank",innerText:"Data"}
                    ]}
                ]}
            ]}
        ]
    };
    var content = {
        element: "div",
        className: "content",
        innerHTML: [
            radioContent
        ]
    };
    var radioSection = {
        element: "div",
        id: 'radio-section',
        hidden: true,
        style: 'height: 100%;',
        innerHTML: [
            whereAmI,
            content
        ]
    };
    makeElement(radioSection, document.querySelector('.main'));
    document.querySelector("#start-button").addEventListener("click",()=>{
        start_radio();
        document.querySelector("#start-button").remove();
    });
    document.querySelector("#sync-button").addEventListener("click",()=>{sync_radio();});
}

// @license-end
