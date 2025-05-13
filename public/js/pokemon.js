//#region VARIABLES
const divErrorMessage = document.getElementById("forErrorMessage")
const divPokemonInfo = document.getElementById("forAfterSearchPokemon")
//#endregion VARIABLES

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
function verificationHavePokemon() {
    if (divPokemonInfo.children.length != 0) {
        return clearDisplay()
    }
    return true
}
//#endregion VERIFICATION

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
function renderPokemon(valeur) {
    let image = valeur.sprites?.front_default || "https://placehold.co/250x250"
    let name = valeur.name
    let id = valeur.id
    stockId(id)
    let types = typesPokemon(valeur.types)
    let stats = statsPokemon(valeur.stats)

    //! PRINCIPALE
    let mainDiv = document.createElement("div")
    mainDiv.id = "afterSearchPokemon";

    //! IMG
    let forImg = document.createElement("div")
    forImg.id = "imgAfterSearchPokemon";
    let img = document.createElement("img")
    img.src = image
    forImg.appendChild(img)

    //! Info
    let forInfo = document.createElement("div")
    forInfo.id = "infoAfterSearchPokemon";
    let divName = document.createElement("p")
    divName.innerText = `Name : ${name}`;
    let divId = document.createElement("p")
    divId.innerText = `ID : ${id}`;
    let separation = document.createElement("hr")
    separation.style.width = "100%";
    forInfo.appendChild(divName)
    forInfo.appendChild(divId)
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
//#endregion INSERTDATA

//#region LOADER 
function loaderFunction() {
    document.getElementById("loader").style.display = "flex";
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
            resolve(true);
        }, 2000);
    });
}
//#endregion LOADER 

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
function randomPokemon() {
    searchPokemon(Math.floor(Math.random() * 151))
}
//#endregion RANDOM

//#region SEARCH
function searchPokemon(valeur) {
    const valueInput = document.getElementById("inputSearchPokemon")
    let haveValue = valueInput.value
    if (haveValue || valeur != null) {
        if (verificationHavePokemon()) {
            fetchPokemon(haveValue || valeur).then(async (donnees) => {
                if (await loaderFunction() === true) {
                    renderPokemon(donnees);
                }
            });
            resetSearch(valueInput)
        }
    }
}
//#endregion SEARCH