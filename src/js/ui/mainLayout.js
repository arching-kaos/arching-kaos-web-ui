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
