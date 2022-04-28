const unsplash_endpoint = "https://api.unsplash.com/search/photos?";
const unsplash_oauth_secret_key= "Un7jhhzsJy9N44eWixlaMrQNnxxOzhoxy5TNnz1yiaU"
//https://api.unsplash.com/search/photos?query=nature&per_page=20&client_id=Un7jhhzsJy9N44eWixlaMrQNnxxOzhoxy5TNnz1yiaU
var a;
function onjson(resp){
     console.log(resp)
    document.querySelector("#copertina").src= resp.results[parseInt(Math.random()*20)].urls.full;
}
function onresponse(resp){
    return resp.json();
}
fetch(unsplash_endpoint+"query=wallpaper+plant"+"&per_page=20&client_id="+unsplash_oauth_secret_key).then(onresponse).then(onjson);