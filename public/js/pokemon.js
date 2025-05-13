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

//#region INSERTDATA
function insertData(valeur) {

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
        fetchPokemon(valeur).then((donnees) => {
            insertData(donnees)
        });
        resetSearch(valueInput)
    }
}
//#endregion SEARCH