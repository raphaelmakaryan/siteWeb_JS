/*#region GETURL*/
function getURL() {
    const url = window.location.href;
    const segments = url.split('/');
    const fileName = segments.pop();
    return fileName
}
/*#endregion GETURL*/

/*#region API*/
if (getURL() === '') {

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
}
/*#endregion MENU*/


/*#region CREATEPOST*/
if (getURL() === '') {
    function createPostManuel() {
        let question = document.getElementById("questionCreate").value
        let reponse = document.getElementById("reponseCreate").value
        let id = document.getElementById("idCreate").value

        let html = `
    <div class="forFeedPost mb-1" id="feedPost">
    <p class="question mt-1 ms-1">Question : ${question}</p>
    <p class="mt-1 ms-1">Réponse : ${reponse}</p>
    <p class="mt-1 ms-1 mb-1">ID : ${id}</p>
    </div>
`;
        feedPage.innerHTML += html;
    }
}
/*#endregion CREATEPOST*/

/*#region CREATEIMAGEGALERIE*/
if (getURL() === 'galerie.html') {
    let galeriePage = document.getElementById("galeriePage")
    async function createImageGalerie(nombre) {
        for (let index = 0; index < nombre; index++) {
            let html = `<div class="forGalerieImage mb-1">
                <img src="./public/imgs/default.webp" alt="" class="galerieImage">
            </div>
`;
            galeriePage.innerHTML += html;
        }
    }
    createImageGalerie(5)
}
/*#endregion CREATEIMAGEGALERIE*/

/*#region OPTIONSGALERIE*/
if (getURL() === 'galerie.html') {
    let optionsGalerie = "mos" // mos | col

    let buttonsMos = document.getElementById("optionsMosGalerie")
    let buttonsCol = document.getElementById("optionsColGalerie")
    let galeriePage = document.getElementById("galeriePage")

    buttonsMos.addEventListener("click", function () {
        if (optionsGalerie !== "mos") {
            optionsGalerie = "mos"
            buttonsMos.classList.add("activeOptions")
            buttonsCol.classList.remove("activeOptions")
            galeriePage.classList.remove("colonne")
            galeriePage.classList.add("mosaique")
        }
    });

    buttonsCol.addEventListener("click", function () {
        if (optionsGalerie !== "col") {
            optionsGalerie = "col"
            buttonsCol.classList.add("activeOptions")
            buttonsMos.classList.remove("activeOptions")
            galeriePage.classList.remove("mosaique")
            galeriePage.classList.add("colonne")
        }
    });
}
/*#endregion OPTIONSGALERIE*/