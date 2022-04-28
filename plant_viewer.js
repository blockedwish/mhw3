const api_key_plantnet = "2b10vsiGXtJtdbabHTzhsSLmu";
const plantnet_endpoint= "https://my-api.plantnet.org/v2/identify/all";



function jsonSearchReaponseHandler(json_response){
    console.log(json_response);
    document.querySelector("#plant_name").textContent=json_response.bestMatch;

}
function onResponse(resp){
    console.log(resp);
    return resp.json();
}

function search(event){
    event.preventDefault();
    let img_src = event.currentTarget.querySelector("input").value;
    let img_container = document.querySelector("#image_container");
    document.querySelector("section.plant_preview").style.display="flex";
    img_container.src=img_src;
    fetch(plantnet_endpoint+"?"+"api-key="+api_key_plantnet+"&images="+encodeURIComponent(img_src)+"&organs=leaf").then(onResponse)
            .then(jsonSearchReaponseHandler);
    //fetch(crops).then(onResponse).then(jsonSearchReaponseHandler);

}

document.querySelector(".search_plant").addEventListener("submit", search);


