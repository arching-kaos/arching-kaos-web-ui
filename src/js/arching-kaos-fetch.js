function archingKaosFetchJSON( url, callback ){
    fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json'
        }
    }).then(response=>{
        if(response.ok){
            response.json().then(json=>{
                callback(json);
            })
        } else {
            if (DEBUG) console.log(e);
        }
    })
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
