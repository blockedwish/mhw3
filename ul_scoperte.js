//Questo javascript sara' avviato una volta caricato tutto l'html. 
const client_id = "1fea81b4b6c9418eadd85ce875129a35";
const client_secret = "c71f06f041e046be904cd69b22785eeb";
const LINK_AUTHORIZATION_GET_API = "https://accounts.spotify.com/api/token";
const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1/search";

let player = null;
const audio = new Audio();

function play_music(event){
    if(event.currentTarget == player){
        audio.pause();
        
    }
    else{
        player = event.currentTarget;
        audio.src = event.currentTarget.dataset.link;
        audio.play();
    }
   
    
}

function disasseble_tracks(resp){
    let items= resp.tracks.items
    preview_container = document.querySelector("div.preview");
    preview_container.innerHTML = '';
    for( i=0; i<items.length; i++){
        let box = document.createElement("div");
        let image = document.createElement("img");
        box.classList.add("box");
        console.log(items[i].album.images[1].url);
        image.src= items[i].album.images[1].url;
        box.appendChild(image);
        preview_container.appendChild(box);
        image.setAttribute("data-link",items[i].preview_url);
        image.addEventListener("click", play_music);
    }
    
}

function tracksresponse(resp){
    return resp.json();
   
}


function gejson(resp){
    token = resp.access_token;
    
    fetch(SPOTIFY_ENDPOINT+"?q=naturasong&type=track&limit=6", 
    {method:"GET",
            headers:{"Accept": "application/json", 
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token}
    }).then(tracksresponse).then(disasseble_tracks);
}
function getoken(resp){
    return resp.json();
}

/*

*/

function get_track(){


    fetch(LINK_AUTHORIZATION_GET_API, {
        method:"POST",
        body: 'grant_type=client_credentials',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ":"+client_secret)
        }
    }).then(getoken).then(gejson); //Ci accaparriamo il codice inviando la richiesta post e facendoci dare il token da usare nelle prossime query




}


get_track();