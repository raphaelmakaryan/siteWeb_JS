/*#region API*/
let feedPage = document.getElementById("feedPage")
let btnRecharg = document.getElementById("buttonRecharg");

async function rechargPost(nombre) {
    let collection = document.querySelectorAll("#feedPost")
    for (const elem of collection) {
        elem.remove();
    }
    createPostAPI(nombre)
}

async function createPostAPI(nombre) {
    for (let index = 0; index < nombre; index++) {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?lang=fr");
        const post = await response.json();
        let html = `
    <div class="forFeedPost mb-1" id="feedPost">
    <p class="question mt-1 ms-1">Question : ${post.setup}</p>
    <p class="mt-1 ms-1">Réponse : ${post.delivery}</p>
    <p class="mt-1 ms-1 mb-1">ID : ${post.id}</p>
    </div>
`;
        feedPage.innerHTML += html;
    }
}

createPostAPI(5)
/*#endregion API*/





/*#region BACKUP*/
/*

async function createPostAPI() {
const response = await fetch("https://v2.jokeapi.dev/joke/Any?lang=fr");
const post = await response.json();
let html = `
    <div class="feedPost mb-1">
    <p class="question mt-1 ms-1">Question : ${post.setup}</p>
    <p class="mt-1 ms-1">Réponse : ${post.delivery}</p>
    <p class="mt-1 ms-1 mb-1">ID : ${post.id}</p>
    </div>
`;
feedPage.innerHTML += html;
}


while (nombre < 3) {
nombre++
console.log(nombre)
//createPostAPI()
}



*/
/*#endregion BACKUP*/