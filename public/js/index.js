//#region MODAL
let activateModal = false;
let modal = document.getElementById("modalPost");
let header = document.getElementById("header");
let feed = document.getElementById("feedMain");

function addingPostModal() {
    if (activateModal === false) {
        modal.style.display = "block";
        header.style.display = "none";
        feed.style.display = "none";
        activateModal = true;
    } else {
        modal.style.display = "none";
        header.style.display = "flex";
        feed.style.display = "flex";
        activateModal = false;
    }
}

function closeModalPost() {
    modal.style.display = "none";
    header.style.display = "flex";
    feed.style.display = "flex";
}
//#endregion MODAL

//#region API
let feedPage = document.getElementById("apiJoke");

async function createPostAPI(nombre) {
    for (let index = 0; index < nombre; index++) {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?lang=fr");
        const post = await response.json();
        let html = `
                <div class="forFeedPost mb-1" id="feedPost">
                    <div>
                    <p class="question mt-1 ms-1">Question : ${post.setup}</p>
                    <p class="mt-1 ms-1">Réponse : ${post.delivery}</p>
                    <p class="mt-1 ms-1 mb-1">ID : ${post.id}</p>
                    </div>
                </div>
            `;
        feedPage.innerHTML += html;
    }
}

async function rechargPost(nombre) {
    let collection = document.querySelectorAll("#feedPost");
    for (const elem of collection) {
        elem.remove();
    }
    createPostAPI(nombre);
}

createPostAPI(6);
//#endregion API

//#region CREATEPOST
function createPostManuel() {
    if (activateModal) {
        let question = document.getElementById("questionCreate").value;
        let reponse = document.getElementById("reponseCreate").value;
        let id = document.getElementById("idCreate").value;
        modal.style.display = "none";
        header.style.display = "flex";
        feed.style.display = "flex";
        let forDelete = `Man${id}`;

        let html = ` 
    <div class="forFeedPost mb-1" id="feedPost" data-value="${forDelete}">
        <div style="width:100%;">
            <p class="question mt-1 ms-1">Question : ${question}</p>
            <p class="mt-1 ms-1">Réponse :  ${reponse} </p>
            <p class="mt-1 ms-1 mb-1">ID : ${id} </p>
        </div>
        <div style='display:flex;'>
            <button type="button" class="noneButtons" id='buttonDeleteFeed' onclick="deletePost('${forDelete}')"><img src="./public/imgs/delete.png" class='iconDeleteFeed' alt=""></button>
        </div>
    </div>
    `;
        feedPage.innerHTML += html;
    }
}
//#endregion CREATEPOST

//#region DELETE POST
async function deletePost(id) {
    let allPost = document.querySelectorAll("#feedPost");
    allPost.forEach((post) => {
        let search = post.dataset.value;
        if (search === id) {
            post.remove();
        }
    });
}
//#endregion DELETE POST

//#region NASA
let dataNASA = localStorage.getItem("nasa");
let objectData = JSON.parse(dataNASA);
let nasaPage = document.getElementById("apiNASA");
let useAPI = false
verifDateNASA(useAPI);

function verifDateNASA(valeur) {
    let date = new Date();
    let dateNasa = new Date(objectData.date);
    if (date.getDate() !== dateNasa.getDate()) {
        nasaAPI(valeur)
    } else {
        nasaAPI(valeur)
    }
}


function nasaAPI(api) {
    if (api) {
        fetch("")
            .then(res => res.json())
            .then(resWT => {
                fetch(`https://api.nasa.gov/planetary/apod?api_key=${resWT.whatThis}`)
                    .then(resN => resN.json())
                    .then(responseN => {
                        localStorage.setItem("nasa", JSON.stringify(responseN));
                        postNASA()
                    })
            })
    } else if (!api) {
        let noApi = {
            "copyright": "\nDaniel Korona\n",
            "date": "2025-04-30",
            "explanation": "Sometimes, the sky itself seems to smile.  A few days ago, visible over much of the world, an unusual superposition of our Moon with the planets Venus and Saturn created just such an iconic facial expression. Specifically, a crescent Moon appeared to make a happy face on the night sky when paired with seemingly nearby planets.  Pictured is the scene as it appeared over Zacatecas, México, with distinctive Bufa Hill in the foreground.  On the far right and farthest in the distance is the planet Saturn.  Significantly closer and visible to Saturn's upper left is Venus, the brightest planet on the sky.  Just above the central horizon is Earth's Moon in a waning crescent phase. To create this gigantic icon, the crescent moon phase must be smiling in the correct direction.   Dial-A-Moon: Find the Moon phase on your birthday this year",
            "hdurl": "https://apod.nasa.gov/apod/image/2504/HappySkyMexico_Korona_1358.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "A Happy Sky over Bufa Hill in Mexico",
            "url": "https://apod.nasa.gov/apod/image/2504/HappySkyMexico_Korona_960.jpg"
        }
        localStorage.setItem("nasa", JSON.stringify(noApi));
        postNASA()
    }
}


function postNASA() {
    let data = localStorage.getItem("nasa");
    let objectData = JSON.parse(data);

    let html = `
        <div class="forNasaPost mb-1" id="feedPost">
            <div>
                <p class="question mt-1 ms-1">Titre : ${objectData.title}</p>
                <p class="mt-1 ms-1">Description : ${objectData.explanation}</p>
                <p class="mt-1 ms-1 mb-1">Date : ${objectData.date}</p>
                <img src="${objectData.url}" alt="" class="imgNASA">
            </div>
        </div>
    `;
    nasaPage.innerHTML += html;
}
//#endregion NASA