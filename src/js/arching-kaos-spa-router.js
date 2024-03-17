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

function locationHashSetter(value){
    window.location.hash = value;
    locationHashOnChange();
}

function locationHashGetter(){
    return window.location.hash;
}

function locationHashOnChange(){
    var route = new Object;
    route.full = locationHashGetter();
    route.args = route.full.split('/');
    route.menuid = '#'+route.args[1];
    route.subcommand = route.args[2];
    menuinit();
    if ( (locationHashGetter() !== 'undefined') && (locationHashGetter() === '') ){
        document.querySelector('#welcome-section').hidden=false;
    } else if ( (locationHashGetter() !== 'undefined') && ( menuids.includes(route.menuid))){
        document.querySelector(route.menuid).hidden=false;
    } else {
        document.querySelector('#not-found-section').hidden=false;
    }
}
