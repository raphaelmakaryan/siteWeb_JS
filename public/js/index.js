/*#region GETURL*/
function getURL() {
    const url = window.location.href;
    const segments = url.split('/');
    const fileName = segments.pop();
    return fileName
}
/*#endregion GETURL*/

/*#region API*/
let feedPage = document.getElementById("feedPage")

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
    let collection = document.querySelectorAll("#feedPost")
    for (const elem of collection) {
        elem.remove();
    }
    createPostAPI(nombre)
}

if (getURL() === 'index.html') {
    createPostAPI(5)
}
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

/*#region CREATEPOST*/
function createPostManuel() {
    let question = document.getElementById("questionCreate").value
    let reponse = document.getElementById("reponseCreate").value
    let id = document.getElementById("idCreate").value
    let forDelete = `Man${id}`

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
      `
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
if (getURL() === 'galerie.html') {
    let galeriePage = document.getElementById("galeriePage")
    createImageGalerie(5, galeriePage)
}
/*#endregion CREATEIMAGEGALERIE*/

/*#region OPTIONSGALERIE*/
if (getURL() === 'galerie.html') {
    let optionsGalerie = "mos" // mos | col
    let comptForDelete = 0;
    let galeriePage = document.getElementById("galeriePage")
    let buttonsMos = document.getElementById("optionsMosGalerie")
    let imgButtonMos = document.getElementById("optionsMosImage")
    let buttonsCol = document.getElementById("optionsColGalerie")
    let imgButtonCol = document.getElementById("optionsColImage")
    let addImage = document.getElementById("optionsAddGalerie")


    buttonsMos.addEventListener("click", function () {
        if (optionsGalerie !== "mos") {
            optionsGalerie = "mos"
            imgButtonMos.src = "./public/imgs/galerie/mosaique/mosaiqueActiv.png"
            imgButtonCol.src = "./public/imgs/galerie/colonne/colonneNoActiv.png"
            galeriePage.classList.remove("colonne")
            galeriePage.classList.add("mosaique")
        }
    });

    buttonsCol.addEventListener("click", function () {
        if (optionsGalerie !== "col") {
            optionsGalerie = "col"
            imgButtonMos.src = "./public/imgs/galerie/mosaique/mosaiqueNoActiv.png"
            imgButtonCol.src = "./public/imgs/galerie/colonne/colonneActiv.png"

            galeriePage.classList.remove("mosaique")
            galeriePage.classList.add("colonne")
        }
    });

    addImage.addEventListener("click", async function () {
        comptForDelete++;
        let forDelete = `Man${comptForDelete}`
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
    allPost.forEach(post => {
        let search = post.dataset.value
        if (search === id) {
            post.remove();
        }
    });
}
/*#endregion DELETE POST*/

/* #endregion DELETE IMAGE*/
async function deleteImage(id) {
    let allImage = document.querySelectorAll("#galeriePost");
    allImage.forEach(img => {
        let search = img.dataset.value
        if (search === id) {
            img.remove();
        }
    });
}
/*#endregion DELETE IMAGE*/


/*#endregion PUB*/

let moving = true, allImagesPub = document.getElementsByClassName("carrouselPub"), totalImagesPub = allImagesPub.length, slide = 0
setInterval(function () {
    moving = false
    movePrev()
}, 1000);


function movePrev() {
    if (!moving) {
        if (slide === 0) {
            slide = (totalImagesPub - 1);
        } else {
            slide--;
        }
        moveCarouselTo(slide);
    }
}


function moveCarouselTo(slide) {
    if (!moving) {
        let dernierePub = slide - 1, nouvellePub = slide + 1, ancienneDernierPub = slide - 2, ancienneNouvellePub = slide + 2
        if ((totalImagesPub - 1) > 3 ){
            allImagesPub[dernierePub].classList.remove("carrouselPubSee")
            allImagesPub[nouvellePub].classList.add("carrouselPubSee")
        }
    }
}



/*
function moveCarouselTo(slide) {
    if (!moving) {
        var newPrevious = slide - 1,
            newNext = slide + 1,
            oldPrevious = slide - 2,
            oldNext = slide + 2;
        if ((totalImagesPub - 1) > 3) {
            if (newPrevious <= 0) {
                oldPrevious = (totalImagesPub - 1);
            } else if (newNext >= (totalImagesPub - 1)) {
                oldNext = 0;
            }
            if (slide === 0) {
                newPrevious = (totalImagesPub - 1);
                oldPrevious = (totalImagesPub - 2);
                oldNext = (slide + 1);
            } else if (slide === (totalImagesPub - 1)) {
                newPrevious = (slide - 1);
                newNext = 0;
                oldNext = 1;
            }
            items[oldPrevious].className = "carrouselPub";
            items[oldNext].className = "carrouselPub";
            items[newPrevious].className = "carrouselPub" + " prev";
            items[slide].className = "carrouselPub" + " active";
            items[newNext].className = "carrouselPub" + " next";
        }
    }
}
    */

/*#endregion PUB*/