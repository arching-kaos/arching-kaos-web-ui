// Arching Kaos Single Page Application Router
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

/*
 * A new feature for a new future:
 *
 * We will get `location.search` values to figure out where the visitor wants
 * to go.
 *
 * We should then replace the menu links with these ones.
 *
 * We should also modify the existing menu mechanism to show/hide depending on
 * the "route" we got from `location.search`.
 *
 */
import { menuinit, menuids } from "./ui/menu.js";

export function locationHashSetter(value)
{
    window.location.hash = value;
    locationHashOnChange();
}

export function locationHashGetter()
{
    return window.location.hash;
}

export function getWelcomeSection()
{
    return document.querySelector('#welcome-section');
}

export function getSoftError()
{
    return document.querySelector('#not-found-section');
}

export function locationHashOnChange()
{
    var route = new Object;
    route.full = locationHashGetter();
    route.args = route.full.split('/');
    route.menuid = '#'+route.args[1];
    route.subcommand = route.args[2];
    menuinit();
    if ( (locationHashGetter() !== 'undefined') && (locationHashGetter() === '') )
    {
        getWelcomeSection().hidden=false;
    }
    else if ( route.args[1] == "route" )
    {
        getWelcomeSection().hidden=false;
        if ( route.args.length === 4 )
        {
            if ( route.args[2] === "zblock" )
            {
                seekZblock(route.args[3], ['search', false]);
            }
        }
    }
    else if ( (locationHashGetter() !== 'undefined') && ( menuids().includes(route.menuid)))
    {
        document.querySelector(route.menuid).hidden=false;
    }
    else
    {
        getSoftError().hidden=false;
    }
}

// @license-end
