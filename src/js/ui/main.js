// Arching Kaos Main
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { aboutSection } from "./sections/aboutSection.js";
import { akNodeInfoSection } from "./sections/akNodeInfoSection.js";
import { chatSection } from "./sections/chatSection.js";
import { commentsSection } from "./sections/commentsSection.js";
import { filesSection } from "./sections/filesSection.js";
import { mixtapesSection } from "./sections/mixtapesSection.js";
import { newsSection } from "./sections/newsSection.js";
import { myPageSection } from "./sections/myPageSection.js";
import { notFoundSection } from "./sections/notFoundSection.js";
import { radioSection } from "./sections/radioSection.js";
import { settingsSection } from "./sections/settingsSection.js";
import { statsSection } from "./sections/statsSection.js";
import { stellarBalancesSection } from "./sections/stellarBalancesSection.js";
import { stellarDataConfigSection } from "./sections/stellarDataConfigSection.js";
import { stellarSection } from "./sections/stellarSection.js";
import { welcomeSection } from "./sections/welcomeSection.js";
import { zchainDataSection } from "./sections/zchainDataSection.js";
import { markdownSection } from "./sections/markdownSection.js";

export function mainSpawn()
{
    aboutSection();
    akNodeInfoSection();
    chatSection();
    commentsSection();
    markdownSection()
    filesSection();
    mixtapesSection();
    newsSection();
    myPageSection();
    notFoundSection();
    radioSection();
    settingsSection();
    statsSection();
    stellarBalancesSection();
    stellarDataConfigSection();
    stellarSection();
    welcomeSection();
    zchainDataSection();
}
// @license-end
