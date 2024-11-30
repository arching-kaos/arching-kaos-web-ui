// Arching Kaos Main Layout
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { headerSpawn } from "./header.js";
import { menuSpawn } from "./menu.js";
import { mainSpawn } from "./main.js";
import { footerSpawn } from "./footer.js";

export function mainLayoutSpawn()
{
    headerSpawn();
    menuSpawn();
    mainSpawn();
    footerSpawn();
}
// @license-end
