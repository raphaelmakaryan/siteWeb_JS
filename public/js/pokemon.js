//#region VARIABLES
const divErrorMessage = document.getElementById("forErrorMessage")
const divPokemonInfo = document.getElementById("forAfterSearchPokemon")
let searchButton = document.getElementById("searchButton")
let previousButton = document.getElementById("previousButton")
let randomButton = document.getElementById("randomButton")
let nextButton = document.getElementById("nextButton")
let rotationButton = document.getElementById("rotationButton")
let interval;
//#endregion VARIABLES

//#region SEARCHPOKEMONARRAY
function searchPokemonArray(tab, search) {
    return tab.find((element) => element === search);
}
//#endregion SEARCHPOKEMONARRAY

//#region DARK/LIGHT THEME
document.addEventListener('DOMContentLoaded', function () {

    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

});
//#endregion DARK/LIGHT THEME

//#region STOCK ID
function stockId(id) {
    const getLastID = localStorage.getItem("lastIdPokemon");
    if (!getLastID || getLastID) {
        localStorage.setItem("lastIdPokemon", JSON.stringify(id));
    }
}
//#endregion STOCK ID

//#region RESETFORSEARCH
function resetSearch(div) {
    div.value = "";
    divErrorMessage.innerHTML = ""
}
//#endregion RESETFORSEARCH

//#region ERROR
function showError(erreur) {
    divErrorMessage.innerHTML +=
        `
    <p>${erreur}</p>
    `
}
//#endregion ERROR

//#region DELETEHAVEPOKEMON
function clearDisplay() {
    divPokemonInfo.innerHTML = ""
    return true
}
//#endregion DELETEHAVEPOKEMON

//#region VERIFICATION
function verificationHavePokemon(action) {
    if (divPokemonInfo.children.length != 0) {
        if (action != "news") {
            return clearDisplay()
        }
    }
    return true
}
//#endregion VERIFICATION

//#region HISTORICTABLE
function stockHistoric(nom) {
    const historicPokemon = localStorage.getItem("historicPokemon");
    let historic = []
    if (!historicPokemon) {
        historic.push(nom)
        localStorage.setItem("historicPokemon", JSON.stringify(historic));
    } else {
        let newLocal = JSON.parse(historicPokemon)
        const haveAPokemon = searchPokemonArray(newLocal, nom)
        if (haveAPokemon === undefined) {
            historic = newLocal
            historic.push(nom)
            localStorage.setItem("historicPokemon", JSON.stringify(historic));
        }
    }
}

function viewHistoric() {
    const historic = document.getElementById("historic")
    const forHistoric = document.getElementById("forHistoric")
    const forArrowHistoric = document.getElementById("forArrowHistoric")
    const listPokemonHistoric = document.getElementById("listPokemonHistoric")
    const forArrowFavoris = document.getElementById("forArrowFavoris")
    const historicPokemon = localStorage.getItem("historicPokemon");
    forArrowFavoris.style.display = "none"
    historic.style.display = "flex"
    historic.style.width = "50%"
    forHistoric.style.flexDirection = "row-reverse"
    forArrowHistoric.style.display = "none"
    if (historicPokemon) {
        let allHistoric = JSON.parse(historicPokemon)
        allHistoric.forEach(element => {
            listPokemonHistoric.innerHTML +=
                `
                <li>${element}</li>
                `
        });
    } else {
        listPokemonHistoric.innerHTML +=
            `
        <li>Aucun pokémon dans l'historique</li>
        `
    }
}

function closeHistoric() {
    const historic = document.getElementById("historic")
    const forHistoric = document.getElementById("forHistoric")
    const forArrowHistoric = document.getElementById("forArrowHistoric")
    const listPokemonHistoric = document.getElementById("listPokemonHistoric")
    const forArrowFavoris = document.getElementById("forArrowFavoris")
    forArrowFavoris.style.display = "flex"
    historic.style.display = "none"
    historic.style.width = ""
    forHistoric.style.flexDirection = ""
    forArrowHistoric.style.display = "flex"
    listPokemonHistoric.innerHTML = ""
}

function deleteHistoric() {
    localStorage.setItem("historicPokemon", "");
    closeHistoric()
}
//#endregion HISTORICTABLE

//#region FAVORISTABLE
function stockFavoris(id) {
    const favorisPokemon = localStorage.getItem("favorisPokemon");
    let favoris = []
    if (!favorisPokemon) {
        favoris.push(id)
        localStorage.setItem("favorisPokemon", JSON.stringify(favoris));
    } else {
        let newLocal = JSON.parse(favorisPokemon)
        const haveAPokemon = searchPokemonArray(newLocal, id)
        if (haveAPokemon === undefined) {
            favoris = newLocal
            favoris.push(id)
            localStorage.setItem("favorisPokemon", JSON.stringify(favoris));
        } else {
            const index = newLocal.findIndex((ele) => ele === id);
            let newTab = newLocal.splice(index, index)
            favoris = newTab
            localStorage.setItem("favorisPokemon", JSON.stringify(favoris));
        }
    }
}

function viewFavoris() {
    const favoris = document.getElementById("favoris")
    const forFavoris = document.getElementById("forFavoris")
    const forArrowFavoris = document.getElementById("forArrowFavoris")
    const listPokemonFavoris = document.getElementById("listPokemonFavoris")
    const forArrowHistoric = document.getElementById("forArrowHistoric")
    const favorisPokemon = localStorage.getItem("favorisPokemon");
    forArrowFavoris.style.display = "none"
    favoris.style.display = "flex"
    favoris.style.width = "50%"
    forFavoris.style.flexDirection = "row"
    forArrowHistoric.style.display = "none"
    if (listPokemonFavoris) {
        let allFavoris = JSON.parse(favorisPokemon)
        if (allFavoris != null && allFavoris.length >= 1) {
            allFavoris.forEach(element => {
                listPokemonFavoris.innerHTML +=
                    `
                <button class="noneButtons " id="" onclick="searchPokemon(${element})">
                <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element}.png'>
                </button>
                `
            });
        } else {
            listPokemonFavoris.innerHTML +=
                `
            <p>Aucun pokémon en favori</p>
            `
        }
    } else {
        listPokemonFavoris.innerHTML +=
            `
        <p>Aucun pokémon en favori</p>
        `
    }
}

function closeFavoris() {
    const favoris = document.getElementById("favoris")
    const forFavoris = document.getElementById("forFavoris")
    const forArrowFavoris = document.getElementById("forArrowFavoris")
    const forArrowHistoric = document.getElementById("forArrowHistoric")
    const listPokemonFavoris = document.getElementById("listPokemonFavoris")
    favoris.style.display = "none"
    favoris.style.width = ""
    forFavoris.style.flexDirection = ""
    forArrowFavoris.style.display = "flex"
    forArrowHistoric.style.display = "flex"
    listPokemonFavoris.innerHTML = ""
}
//#endregion FAVORISTABLE

//#region TYPES
function typesPokemon(data) {
    if (data) {
        let allTypes = []
        data.forEach(element => {
            allTypes.push(element.type.name)
        });
        return allTypes
    }
}
//#endregion TYPES

//#region STATS
function statsPokemon(data) {
    if (data) {
        let allStats = []
        data.forEach(element => {
            allStats.push(element.stat.name)
        });
        return allStats
    }
}
//#endregion STATS

//#region INSERTDATA
function renderPokemon(valeur, action) {
    const favorisPokemon = localStorage.getItem("favorisPokemon");
    let imageFront = valeur?.sprites?.front_default || "https://placehold.co/250x250";
    let imageBack = valeur?.sprites?.back_default || "https://placehold.co/250x250";
    let name = valeur?.name;
    let id = valeur.id
    stockId(id)
    let types = typesPokemon(valeur.types)
    let stats = statsPokemon(valeur.stats)

    if (action === "news") {
        displayNewsFeedPokemon(imageFront, name, id)
    } else {
        stockHistoric(name)
        //! PRINCIPALE
        let mainDiv = document.createElement("div")
        mainDiv.id = "afterSearchPokemon";

        //! IMG
        let forImg = document.createElement("div")
        forImg.id = "imgAfterSearchPokemon";
        let img = document.createElement("img")
        if (action === "polling") {
            img.src = imageBack
        } else {
            img.src = imageFront
        }
        forImg.appendChild(img)

        //! Info
        let forInfo = document.createElement("div")
        forInfo.id = "infoAfterSearchPokemon";
        //& Nom
        let divName = document.createElement("p")
        divName.innerText = `Name : ${name}`;
        //& ID
        let divId = document.createElement("p")
        divId.innerText = `ID : ${id}`;
        //& SEPAR
        let separation = document.createElement("hr")
        separation.style.width = "100%";
        //& BUTTONFAVORIS
        let favorisButton = document.createElement("button")
        favorisButton.onclick = () => stockFavoris(id);
        favorisButton.id = "buttonFavorisFeed"
        favorisButton.className = "noneButtons"
        //& FAVORISIMG
        let favoris = document.createElement("img")
        if (favorisPokemon) {
            let search = searchPokemonArray(JSON.parse(favorisPokemon), id)
            if (search === undefined) {
                favoris.src = "./public/imgs/pokemon/noFavoris.png"
            } else {
                favoris.src = "./public/imgs/pokemon/favoris.png"
            }
        } else {
            favoris.src = "./public/imgs/pokemon/noFavoris.png"
        }
        favoris.style.width = "100%"
        forInfo.appendChild(divName)
        forInfo.appendChild(divId)
        favorisButton.appendChild(favoris)
        forInfo.appendChild(favorisButton)
        forInfo.appendChild(separation)

        //! MoreInfo
        let forMoreInfo = document.createElement("div")
        forMoreInfo.id = "moreInfoAfterSearchPokemon";
        forMoreInfo.className = "mt-1 mb-1";

        //& Type
        let typePokemon = document.createElement("div")
        typePokemon.id = "typePokemon";
        let titleType = document.createElement("p")
        titleType.className = "titleInfoPokemon";
        titleType.innerText = "Types :";
        let listTypes = document.createElement("ul")
        listTypes.className = "listMoreInfo";
        for (let index = 0; index < types.length; index++) {
            let listType = document.createElement("li")
            listType.innerText = types[index];
            listTypes.appendChild(listType)
            typePokemon.appendChild(titleType)
        }
        typePokemon.appendChild(listTypes)
        forMoreInfo.appendChild(typePokemon)

        //& Stats
        let divStatsPokemon = document.createElement("div")
        divStatsPokemon.id = "statsPokemon";
        let titleStats = document.createElement("p")
        titleStats.className = "titleInfoPokemon";
        titleStats.innerText = "Stats :";
        let listStats = document.createElement("ul")
        listStats.className = "listMoreInfo";
        divStatsPokemon.appendChild(titleStats)
        for (let index = 0; index < stats.length; index++) {
            let listStats = document.createElement("li")
            listStats.innerText = stats[index];
            divStatsPokemon.appendChild(listStats)
        }
        forMoreInfo.appendChild(divStatsPokemon)


        mainDiv.appendChild(forImg)
        mainDiv.appendChild(forInfo)
        mainDiv.appendChild(forMoreInfo)
        divPokemonInfo.appendChild(mainDiv)
    }
}
//#endregion INSERTDATA

//#region LOADER 
function loaderFunction(action) {
    if (action != "news") {
        document.getElementById("loader").style.display = "flex";
        return new Promise((resolve) => {
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
                resolve(true);
            }, 250);
        });
    }
    return false
}
//#endregion LOADER 

//#region PLAYROTATION 
function startRotation() {
    interval = setInterval(() => {
        randomPokemon("rotation");
    }, 5000);
}

function rotationPokemon() {
    searchButton.className = "forButtons dimensionButton disabled"
    searchButton.ariaDisabled = "true"
    previousButton.className = "forButtons dimensionButton disabled"
    previousButton.ariaDisabled = "true"
    randomButton.className = "forButtons dimensionButton disabled"
    randomButton.ariaDisabled = "true"
    nextButton.className = "forButtons dimensionButton disabled"
    nextButton.ariaDisabled = "true"
    rotationButton.className = "forButtons dimensionButton disabled"
    rotationButton.ariaDisabled = "true"
    startRotation();
}
//#endregion PLAYROTATION 

//#region STOPROTATION
function stopRotation() {
    clearInterval(interval);
}

function stopRotationPokemon() {
    searchButton.className = "forButtons dimensionButton"
    searchButton.ariaDisabled = "false"
    previousButton.className = "forButtons dimensionButton"
    previousButton.ariaDisabled = "false"
    randomButton.className = "forButtons dimensionButton"
    randomButton.ariaDisabled = "false"
    nextButton.className = "forButtons dimensionButton"
    nextButton.ariaDisabled = "false"
    rotationButton.className = "forButtons dimensionButton"
    rotationButton.ariaDisabled = "false"
    stopRotation();
}
//#endregion STOPROTATION 

//#region NEWSFEED
setInterval(() => {
    newsFeed();
}, 10000);

function newsFeed() {
    randomPokemon("news")
}
//#endregion NEWSFEED

//#region DISPLAYPOKEMONNEWSFEED
function displayNewsFeedPokemon(image, nom, id) {
    const news = document.getElementById("forNewsFeedPokemon")
    news.innerHTML =
        `
     <div id="newsFeedPokemon">
            <a onclick="clickPokemonNews(${id})">
                <div id="imgNewsFeedPokemon"><img
                        src="${image}"></div>
                <div id="infoNewsFeedPokemon">
                    <p>Name : ${nom}</p>
                </div>
            </a>
        </div>
    `
}
//#endregion DISPLAYPOKEMONNEWSFEED

//#region CLICKPOKEMONNEWSFEED
function clickPokemonNews(id) {
    searchPokemon(id, 'withNews')
}
//#endregion CLICKPOKEMONNEWSFEED

//#region CLICKPOKEMONNEWSFEED
setInterval(() => {
    pollingPokemon();
}, 10000);

function pollingPokemon() {
    const getLastID = localStorage.getItem("lastIdPokemon");
    if (divPokemonInfo.children.length != 0 && getLastID) {
        searchPokemon(getLastID, "polling")
    }
}
//#endregion CLICKPOKEMONNEWSFEED

//#region API
async function fetchPokemon(nomOuId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${nomOuId}`
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
    });

    if (!response.ok) {
        showError("Le pokémon que vous avez écris n'existe pas !")
        return null
    } else {
        return response.json();
    }
}
//#endregion API

//#region PREVIOUS
function previousPokemon() {
    const getLastID = localStorage.getItem("lastIdPokemon");
    if (!getLastID) {
        showError("Vous n'avez pas encore chercher de pokemon !")
    } else {
        let newId = parseInt(getLastID) - 1
        searchPokemon(newId)
    }
}
//#endregion PREVIOUS

//#region NEXT
function nextPokemon() {
    const getLastID = localStorage.getItem("lastIdPokemon");
    if (!getLastID) {
        showError("Vous n'avez pas encore chercher de pokemon !")
    } else {
        let newId = parseInt(getLastID) + 1
        searchPokemon(newId)
    }
}
//#endregion NEXT

//#region RANDOM
function randomPokemon(action) {
    searchPokemon(Math.floor(Math.random() * 151), action)
}
//#endregion RANDOM

//#region SEARCH
function searchPokemon(valeur, action) {
    const valueInput = document.getElementById("inputSearchPokemon")
    let haveValue = valueInput.value
    if (haveValue || valeur != null) {
        if (verificationHavePokemon(action)) {
            fetchPokemon(haveValue || valeur).then(async (donnees) => {
                if (await loaderFunction(action) === true) {
                    renderPokemon(donnees, action);
                } else {
                    renderPokemon(donnees, action);
                }
            });
            resetSearch(valueInput)
        }
    }
}
//#endregion SEARCH