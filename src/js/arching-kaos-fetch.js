function archingKaosFetchJSON( url, callback, params ){
    const request = new XMLHttpRequest();
    request.addEventListener("load", ()=>{
        var json = JSON.parse(request.response);
        if(request.status !== 404){
            callback(json, params);
        } else {
            archingKaosLog(`ERROR ${request.status} while loading ${url}`);
        }
    });
    request.addEventListener("error", ()=>{
        console.log("An error occured.");
    });
    request.addEventListener("progress", (event)=>{
        if (event.lengthComputable && progressPlaceholder){
            httpProgressPlaceholder.value = (event.loaded / event.total) * 100;
        } else {
            httpProgressPlaceholder.value = 0;
            console.log("Supposingly zeroed progressPlaceholder");
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
            console.log(e);
        }
    })
}
