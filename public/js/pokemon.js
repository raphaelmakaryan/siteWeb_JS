//#region VARIABLES
const divErrorMessage = document.getElementById("forErrorMessage")
const divPokemonInfo = document.getElementById("forAfterSearchPokemon")
//#endregion VARIABLES

//#region RESETFORSEARCH
function resetSearch(div) {
    div.value = "";
    divErrorMessage.innerHTML = ""
}
//#endregion RESETFORSEARCH

//#region ERROR
function errorMessage(erreur) {
    divErrorMessage.innerHTML +=
        `
    <p>${erreur}</p>
    `
}
//#endregion ERROR

//#region DELETEHAVEPOKEMON
function deleteHavePokemon() {
    divPokemonInfo.innerHTML = ""
    return true
}
//#endregion DELETEHAVEPOKEMON

//#region VERIFICATION
function verificationHavePokemon() {
    if (divPokemonInfo.children.length != 0) {
        return deleteHavePokemon()
    }
    return true
}
//#endregion VERIFICATION

//#region TYPES
function typesPokemon(data) {
    let allTypes = []
    data.forEach(element => {
        allTypes.push(element.type.name)
    });
    return allTypes
}
//#endregion TYPES

//#region STATS
function statsPokemon(data) {
    let allStats = []
    data.forEach(element => {
        allStats.push(element.stat.name)
    });
    return allStats
}
//#endregion STATS

//#region INSERTDATA
function insertData(valeur) {
    let image = valeur.sprites.front_default
    let name = valeur.name
    let id = valeur.id
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
    forMoreInfo.className = "mt-1";

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

//#region API
async function fetchPokemon(nomOuId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomOuId}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
    });

    if (!response.ok) {
        errorMessage("Le pokémon que vous avez écris n'existe pas !")
        return null
    } else {
        return response.json();
    }
}
//#endregion API

//#region SEARCH
function searchPokemon() {
    const valueInput = document.getElementById("inputSearchPokemon")
    let haveValue = valueInput.value
    if (haveValue) {
        if (verificationHavePokemon()) {
            fetchPokemon(haveValue).then((donnees) => {
                insertData(donnees)
            });
            resetSearch(valueInput)
        }
    }
}
//#endregion SEARCH