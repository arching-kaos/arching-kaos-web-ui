/* Arching Kaos Setup
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
var mixtapeIds = new Array;
var mixtapes = new Array;
var sortedMixtapes = new Array;
var zchainsFound = 0;
var holders = new Array;
var gpglist = new Array;
var participants = new Array;
var stellarNetworkConfiguredAddresses = 0;
var stellarParticipants = 0;
var stellarParticipantsScanned = 0;
var zchainLoadingStatus = new Array;
var zchains = new Array;
var references = new Array;
var fullZblocks = new Array;
var zblocks = new Array;
var blocks = new Array;
var data = new Array;
var nodeInfo = new Array;
var body = document.querySelector('body');
var pageLayout = document.querySelector('.page-layout');
var mainContainer = document.querySelector('.main');
var isMobile = false;
var aknet = document.querySelector('.aknet-network')
var resultsArea = document.querySelector('.results-area')


/*
 * Array of all the menu-panes IDs
 */
var menuids = [
    '#welcome-section',
    '#about-section',
    '#zchain-data-section',
    '#news-section',
    '#comments-section',
    '#stats-section',
    '#mixtapes-section',
    '#chat-section',
    '#radio-section',
    '#mypage-section',
    '#stellar-balances',
    '#stellar-data-config',
    '#arching-kaos-node-info',
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
var httpProgressPlaceholder = document.querySelector('#http-progress');
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

// @license-end
