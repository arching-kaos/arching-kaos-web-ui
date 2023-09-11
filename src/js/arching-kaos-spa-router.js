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
    route.id = locationHashGetter();
    menuinit();
    if ( (locationHashGetter() !== 'undefined') && (locationHashGetter() === '') ){
        document.querySelector('#welcome-section').hidden=false;
    } else if ( (locationHashGetter() !== 'undefined') && ( menuids.includes(route.id.replace('/',''))) ){
        document.querySelector(route.id.replace('/','')).hidden=false;
    } else {
        document.querySelector('#not-found-section').hidden=false;
    }
}
