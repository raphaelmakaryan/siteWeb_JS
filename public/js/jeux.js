//#region JEUX
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
        buttonDropDownGame.style.borderRadius = "var(--radius) var(--radius)  var(--radius) var(--radius)";
        buttonDropDownGameList.style.display = "none";
    } else if (!isActiveGame) {
        isActiveGame = true;
        buttonDropDownGame.style.borderRadius = "var(--radius) var(--radius)  0 0";
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
        let newValue = parseInt(nombrePartieTotal) + 1;
        localStorage.setItem("nombrePartieTotal", newValue);
    } else if (raison === "easy") {
        let newValue = parseInt(nombrePartieEasy) + 1;
        localStorage.setItem("nombrePartieEasy", newValue);
    }
    else if (raison === "medium") {
        let newValue = parseInt(nombrePartieMedium) + 1;
        localStorage.setItem("nombrePartieMedium", newValue);
    }
    else if (raison === "hard") {
        let newValue = parseInt(nombrePartieHard) + 1;
        localStorage.setItem("nombrePartieHard", newValue);
    }
    else if (raison === "win") {
        let newValue = parseInt(nombrePartieWin) + 1;
        localStorage.setItem("nombrePartieWin", newValue);
    }
    else if (raison === "loose") {
        let newValue = parseInt(nombrePartieLoose) + 1;
        localStorage.setItem("nombrePartieLoose", newValue);
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
//#endregion JEUX