/*#region GETURL*/
function getURL() {
    const url = window.location.href;
    const segments = url.split("/");
    const fileName = segments.pop();
    return fileName;
}
/*#endregion GETURL*/

/*#region DEBUG*/
function debugFunctions(debug1, debug2) {
    console.log("------------1-------------");
    console.log(debug1);
    console.log("------------1-------------");
    console.log("------------2-------------");
    console.log(debug2);
    console.log("------------2-------------");
}
/*#endregion DEBUG*/

/*#region API*/
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

if (getURL() === "index.html") {
    createPostAPI(5);
}
/*#endregion API*/

/*#region MENU HEADER*/
let buttonDropDown = document.getElementById("dropdownHeaderMain");
let buttonDropDownList = document.getElementById("dropdownHeaderList");
let isActive = false;

buttonDropDown.addEventListener("click", function () {
    if (isActive) {
        isActive = false;
        buttonDropDownList.style.display = "none";
    } else if (!isActive) {
        isActive = true;
        buttonDropDownList.style.display = "flex";
    }
});
/*#endregion MENU HEADER*/

/*#region CREATEPOST*/
function createPostManuel() {
    let question = document.getElementById("questionCreate").value;
    let reponse = document.getElementById("reponseCreate").value;
    let id = document.getElementById("idCreate").value;
    let forDelete = `Man${id}`;

    let html = ` <div class="forFeedPost mb-1" id="feedPost" data-value="${forDelete}">
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
/*#endregion CREATEPOST*/

/*#region CREATEIMAGEGALERIE*/
async function createImageGalerie(nombre, galeriePage) {
    for (let index = 0; index < nombre; index++) {
        let html = `<div class="forGalerieImage mb-1" id="galeriePost">
                <img src="./public/imgs/galerie/default.webp" alt="" class="galerieImage">
            </div>
`;
        galeriePage.innerHTML += html;
    }
}
if (getURL() === "galerie.html") {
    let galeriePage = document.getElementById("galeriePage");
    createImageGalerie(5, galeriePage);
}
/*#endregion CREATEIMAGEGALERIE*/

/*#region OPTIONSGALERIE*/
if (getURL() === "galerie.html") {
    let optionsGalerie = "mos"; // mos | col
    let comptForDelete = 0;
    let galeriePage = document.getElementById("galeriePage");
    let buttonsMos = document.getElementById("optionsMosGalerie");
    let imgButtonMos = document.getElementById("optionsMosImage");
    let buttonsCol = document.getElementById("optionsColGalerie");
    let imgButtonCol = document.getElementById("optionsColImage");
    let addImage = document.getElementById("optionsAddGalerie");

    buttonsMos.addEventListener("click", function () {
        if (optionsGalerie !== "mos") {
            optionsGalerie = "mos";
            imgButtonMos.src = "./public/imgs/galerie/mosaique/mosaiqueActiv.png";
            imgButtonCol.src = "./public/imgs/galerie/colonne/colonneNoActiv.png";
            galeriePage.classList.remove("colonne");
            galeriePage.classList.add("mosaique");
        }
    });

    buttonsCol.addEventListener("click", function () {
        if (optionsGalerie !== "col") {
            optionsGalerie = "col";
            imgButtonMos.src = "./public/imgs/galerie/mosaique/mosaiqueNoActiv.png";
            imgButtonCol.src = "./public/imgs/galerie/colonne/colonneActiv.png";

            galeriePage.classList.remove("mosaique");
            galeriePage.classList.add("colonne");
        }
    });

    addImage.addEventListener("click", async function () {
        comptForDelete++;
        let forDelete = `Man${comptForDelete}`;
        let html = `  
  <div class="forGalerieImage mb-1" id="galeriePost"  data-value="${forDelete}">
   <button type="button" class="noneButtons buttonsDeleteGalerie" onclick="deleteImage('${forDelete}')"> <img src="./public/imgs/delete.png" class='iconDeleteGalerie' alt="">    </button>
    <div style="    display: flex;
    flex-direction: column;
    align-items: center;">
      <img src="./public/imgs/galerie/default.webp" alt="" class="galerieImage">
    </div>
  </div>
`;
        galeriePage.innerHTML += html;
    });
}
/*#endregion OPTIONSGALERIE*/

/* #endregion DELETE POST*/
async function deletePost(id) {
    let allPost = document.querySelectorAll("#feedPost");
    allPost.forEach((post) => {
        let search = post.dataset.value;
        if (search === id) {
            post.remove();
        }
    });
}
/*#endregion DELETE POST*/

/* #endregion DELETE IMAGE*/
async function deleteImage(id) {
    let allImage = document.querySelectorAll("#galeriePost");
    allImage.forEach((img) => {
        let search = img.dataset.value;
        if (search === id) {
            img.remove();
        }
    });
}
/*#endregion DELETE IMAGE*/

/*#endregion PUB*/
if (getURL() === "galerie.html") {
    let moving = true,
        allImagesPub = document.getElementsByClassName("carrouselPub"),
        totalImagesPub = allImagesPub.length,
        slide = 0;

    setInterval(function () {
        moving = false;
        if (!moving) {
            moveNext();
        }
    }, 2000);

    function moveNext() {
        console.log(moving);
        if (!moving) {
            if (slide === totalImagesPub - 1) {
                slide = 0;
            } else {
                slide++;
            }
            moveCarouselTo(slide);
        }
    }

    function moveCarouselTo(slide) {
        if (!moving) {
            let previousSlide = slide === 0 ? totalImagesPub - 1 : slide - 1;
            let nextSlide = slide === totalImagesPub - 1 ? 0 : slide + 1;

            for (let i = 0; i < totalImagesPub; i++) {
                allImagesPub[i].classList.remove("carrouselPubSee");
            }

            allImagesPub[slide].classList.add("carrouselPubSee");
            allImagesPub[previousSlide].classList.add("carrouselPubPrev");
            allImagesPub[nextSlide].classList.add("carrouselPubNext");
        }
    }
}
/*#endregion PUB*/

/*#region JEUX*/
if (getURL() === "jeux.html") {
    let buttonDropDownGame = document.getElementById("dropdownGameMain");
    let buttonDropDownGameList = document.getElementById("dropdownGameList");
    let isActiveGame = false;
    let chooseDifficulty = document.getElementById("chooseDifficulty");
    let gameBoard = document.getElementById("gameBoard");
    let informations = {}
    let carteActuel = {};
    let endTheGame = false;
    let nombrePartieTotal = localStorage.getItem("nombrePartieTotal");
    let nombrePartieEasy = localStorage.getItem("nombrePartieEasy");
    let nombrePartieMedium = localStorage.getItem("nombrePartieMedium");
    let nombrePartieHard = localStorage.getItem("nombrePartieHard");
    let nombrePartieWin = localStorage.getItem("nombrePartieWin");
    let nombrePartieLoose = localStorage.getItem("nombrePartieLoose");
    userHaveProfil()

    buttonDropDownGame.addEventListener("click", function () {
        if (isActiveGame) {
            isActiveGame = false;
            buttonDropDownGameList.style.display = "none";
        } else if (!isActiveGame) {
            isActiveGame = true;
            buttonDropDownGameList.style.display = "flex";
        }
    });


    function userHaveProfil() {
        if (nombrePartieTotal && nombrePartieEasy && nombrePartieMedium && nombrePartieHard && nombrePartieWin && nombrePartieLoose) {
            textProfil()
            return true;
        } else {
            createProfil()
            location.reload();
        }
    }

    function textProfil() {
        let profilMain = document.getElementById("profilMain");
        profilMain.innerHTML = `
        <div>
        <p style="font-size: 1.2rem">Profil</p>
        </div>
        <p>Total number of parts : ${nombrePartieTotal}</p>
        <p>Number of easy parts : ${nombrePartieEasy}</p>
        <p>Number of medium parts : ${nombrePartieMedium}</p>
        <p>Number of hard parts : ${nombrePartieHard}</p>
        <p>Number of victories : ${nombrePartieWin}</p>
        <p>Number of defeats : ${nombrePartieLoose}</p>
        </div>
        `;
    }


    function saveProfil(raison) {
        if (raison === "nombrePartie") {
            let newValue = parseInt(nombrePartieTotal + 1)
            localStorage.removeItem("nombrePartieTotal")
            localStorage.setItem("nombrePartieTotal", newValue);
        }
        else if (raison === "easy") {
            localStorage.setItem("nombrePartieEasy", nombrePartieEasy + 1);
        }
        else if (raison === "medium") {
            localStorage.setItem("nombrePartieMedium", nombrePartieMedium + 1);
        }
        else if (raison === "hard") {
            localStorage.setItem("nombrePartieHard", nombrePartieHard + 1);
        }
        else if (raison === "win") {
            localStorage.setItem("nombrePartieWin", nombrePartieWin + 1);
        }
        else if (raison === "loose") {
            localStorage.setItem("nombrePartieLoose", nombrePartieLoose + 1);
        }
    }

    function createProfil() {
        localStorage.setItem("nombrePartieTotal", 0);
        localStorage.setItem("nombrePartieEasy", 0);
        localStorage.setItem("nombrePartieMedium", 0);
        localStorage.setItem("nombrePartieHard", 0);
        localStorage.setItem("nombrePartieWin", 0);
        localStorage.setItem("nombrePartieLoose", 0);
    }


    function chooseDifficultyGame(mode) {
        if (mode) {
            chooseDifficulty.style.display = "none";
            if (mode === "easy") {
                fetchAPIDifficulty("https://mocki.io/v1/36f49edb-8665-483b-96a2-dd0ff9f12f93");
            } else if (mode === "medium") {
                fetchAPIDifficulty("https://mocki.io/v1/286f3ef0-dd4a-481f-8aea-f8cab719f557");
            } else if (mode === "hard") {
                fetchAPIDifficulty("https://mocki.io/v1/fd97f4f5-f5d9-4e2c-a631-268efb962737");
            }
        }
    }

    function fetchAPIDifficulty(lien) {
        if (lien) {
            fetch(lien)
                .then((response) => response.json())
                .then((data) => {
                    gameSetup(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }

    function gameSetup(data) {
        let gameInformations = document.getElementById("gameInformations");

        if (data.informations) {
            informations = {
                nameGame: data.informations.nameGame,
                id: data.informations.id,
                difficulty: data.informations.difficulty,
                numberPairsFind: data.informations.numberPairsFind,
                cardHidden: data.game.cardHidden,
                life: data.informations.life || "Unlimited",
            }
            gameInformations.innerHTML = `
                <p>${data.informations.nameGame}</p>
                <p>ID : ${data.informations.id}</p>
                <p>Difficulty : ${data.informations.difficulty}</p>
                <p id="numberPair">Number pairs to find : ${data.informations.numberPairsFind}</p>
                <p id="numberLife">Number life : ${data.informations.life || "Unlimited"}</p>
                <div id="endTheGame" class="mt-1"></div>
            `;

            if (data.informations.life != null) {
                numberLife = data.informations.life;
            }
        }
        if (data.game) {

            let cards = [];
            let compt = 0;


            for (let index = 0; index < (data.informations.numberPairsFind * data.game.cards.length); index++) {
                let randomIndex = Math.floor(Math.random() * data.game.cards.length);
                let randomCard = data.game.cards[randomIndex];
                if (!cards.some(card => card.id === randomCard.id)) {
                    cards.push(randomCard);
                }
            }

            cards = [...cards, ...cards];
            cards = cards.sort(() => Math.random() - 0.5);

            cards.forEach(card => {
                compt++;
                gameBoard.innerHTML += `<img src="${data.game.cardHidden}" id="cards" alt="" class="cardsGame${informations.difficulty}" onclick="clickCard(${compt}, ${card.id})">`;
            });
        }

    }

    function clickCard(card, valeur) {
        if (!endTheGame) {
            let allCards = document.querySelectorAll("#gameBoard");
            let cardSelect = allCards[0].children[card - 1]
            let cardHidden = informations.cardHidden.split("/")[4];
            if (cardSelect.src.split("/")[6] === cardHidden) {
                cardSelect.src = `./public/imgs/memoryGame/image${valeur}.webp`;
                sameCard({ idDiv: cardSelect, valeur: valeur });
                endGame();
                winGame()
            }
        }
    }

    function sameCard(nouvelle) {
        if (Object.keys(carteActuel).length === 2) {
            if (carteActuel.valeur === nouvelle.valeur) {
                informations.numberPairsFind = informations.numberPairsFind - 1
                newText("pairs");
                carteActuel = {}
            } else {
                carteActuel.idDiv.src = `./public/imgs/memoryGame/cardHidden.png`;
                nouvelle.idDiv.src = `./public/imgs/memoryGame/cardHidden.png`;
                carteActuel = {}
                if (informations.life != "Unlimited") {
                    informations.life = informations.life - 1
                    newText("life");
                }
            }
        } else {
            carteActuel = {
                idDiv: nouvelle.idDiv,
                valeur: nouvelle.valeur
            }
        }
    }

    function newText(raison) {
        if (raison === "life") {
            let divNumberLife = document.getElementById("numberLife");
            if (informations.life) {
                divNumberLife.innerHTML = `Number life : ${informations.life} `;
            }
        } else if (raison === "pairs") {
            let nombrePair = document.getElementById("numberPair")
            let newValuePair = informations.numberPairsFind;
            nombrePair.innerHTML = `Number pairs to find : <span id="newValue">${newValuePair}</span>`;
        }
    }

    function winGame() {
        if (informations.numberPairsFind === 0) {
            saveProfil("win")
            saveProfil("nombrePartie")
            saveProfil(informations.difficulty.toLowerCase())
            let endGameText = document.getElementById("endTheGame");
            endGameText.innerHTML = `<span id="win">Congratulations! You have found all the pairs!</span>`
            endTheGame = true;
        }
    }

    function endGame() {
        if (informations.life === 0) {
            saveProfil("loose")
            saveProfil("nombrePartie")
            saveProfil(informations.difficulty.toLowerCase())
            let divNumberLife = document.getElementById("numberLife");
            divNumberLife.innerHTML = `Number life : ${informations.life} `;
            let endGameText = document.getElementById("endTheGame");
            endGameText.innerHTML = `<span id="loose">YOU LOOSE</span>`
            endTheGame = true;
        }
    }
}
/*#endregion JEUX*/
