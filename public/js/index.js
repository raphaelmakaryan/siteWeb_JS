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

/*#region MENU*/
let buttonDropDown = document.getElementById("dropdownHeaderMain")
let buttonDropDownList = document.getElementById("dropdownHeaderList")
let isActive = false;

buttonDropDown.addEventListener("click", function () {
    if (isActive) {
        isActive = false
        buttonDropDownList.style.display = "none"
    } else if (!isActive) {
        isActive = true
        buttonDropDownList.style.display = "flex"
    }
});

/*#endregion MENU*/



/*#region BACKUP*/
/*
*/
/*#endregion BACKUP*/