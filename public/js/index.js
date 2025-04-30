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
let feedPage = document.getElementById("feedPage");

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

createPostAPI(5);
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