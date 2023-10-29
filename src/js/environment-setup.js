var mixtapeIds = [];
var mixtapes = [];
var sortedMixtapes = [];
var zchainsFound = 0;
var holders = [];
var participants = [];
var stellarNetworkConfiguredAddresses = 0;
var stellarParticipants = 0;
var stellarParticipantsScanned = 0;
var zchain = [];
var zchains = new Array;
var zblocks = new Array;
var blocks = new Array;
var data = new Array;
var akid = new Array;
var body = document.querySelector('body');
var pageLayout = document.querySelector('.page-layout');
var mainContainer = document.querySelector('.main');
var doubleFloorMenu = document.querySelector('#double-floor'); 
var isMobile = false;
var aknet = document.querySelector('.aknet-network')


/*
 * Array of all the menu-panes IDs
 */
var menuids = [
    '#welcome-section',
    '#about-section',
    '#zchain-data-section',
    '#news-section',
    '#stats-section',
    '#mixtapes-section',
    '#chat-section',
    '#mypage-section',
    '#stellar-balances',
    '#stellar-data-config',
    '#arching-kaos-id',
    '#files-section',
    '#settings-section',
    '#stellar-section',
    '#not-found-section'
];

/*
 * We select our basic placeholders.
 *
 * Placeholders are mostly 'div' with specified id and we use them here
 * to append data on specific places in the page.
 *
 */
var progressPlaceholder = document.querySelector('#total-progress');
var currentLogMessageElement = document.querySelector('#current-log-message');
var logsAreaElement = document.querySelector("#logs-area-element");
var radio = document.querySelector("#radio-player");
var radioButton = document.querySelector("#radio-button-controller");

/*
 * Get addresses that trust the asset
 * Limit is 200 addresses cause horizon API limitations.
 *
 * Returns div DOM elements for each found address, embedding
 * the address both in innerHTML and in id of the div.
 */
var lastPage = '';

var stellar_connection_status = 0;

// var localnode = "https://aka.arching-kaos.net:8610/v0/akid";
var localnode = "http://api.aknet.z.kaotisk-hund.com/v0/akid";
