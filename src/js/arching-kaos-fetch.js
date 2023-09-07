function archingKaosFetchJSON( url, callback, params ){
//    fetch(url, {
//        method:'GET',
//        headers:{
//            Accept: 'application/json'
//        }
//    }).then(response=>{
//        if(response.ok){
//            response.json().then(json=>{
//                callback(json);
//            })
//        } else {
//            if (DEBUG) console.log(e);
//        }
//    }).catch( e=>{
//        if (DEBUG) console.log(e);
//    })
    const request = new XMLHttpRequest();
    request.addEventListener("load", ()=>{
        var json = JSON.parse(request.response);
        callback(json, params);
    });
    request.addEventListener("error", ()=>{
        console.log("An error occured.");
    });
    request.addEventListener("progress", (event)=>{
        if (event.lengthComputable && progressPlaceholder){
            progressPlaceholder = (event.loaded / event.total) * 100;
        } else {
            progressPlaceholder = 0;
        }
    });
    request.addEventListener("abort", ()=>{
        console.log("Request aborted.");
    });
    request.open("GET", url);
    request.send();

}

async function archingKaosFetchText( url, callback ){
    return fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.text().then(text=>{
                return callback(text);
            })
        } else {
            if (DEBUG) console.log(e);
        }
    })
}
