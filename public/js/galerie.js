let optionsGalerie = "mos"; // mos | col
let comptForDelete = 0;
let galeriePage = document.getElementById("galeriePage");
let buttonsMos = document.getElementById("optionsMosGalerie");
let imgButtonMos = document.getElementById("optionsMosImage");
let buttonsCol = document.getElementById("optionsColGalerie");
let imgButtonCol = document.getElementById("optionsColImage");
let addImage = document.getElementById("optionsAddGalerie");

//#region CREATEIMAGEGALERIE
async function createImageGalerie(nombre, galeriePage) {
    for (let index = 0; index < nombre; index++) {
        let html = `
            <div class="forGalerieImage mb-1" id="galeriePost">
                <img src="./public/imgs/galerie/default.webp" alt="" class="galerieImage">
            </div>
            `;
        galeriePage.innerHTML += html;
    }
}

createImageGalerie(5, galeriePage);
//#endregion CREATEIMAGEGALERIE

//#region OPTIONSGALERIE
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
                    <div style="    display: flex;flex-direction: column; align-items: center;">
                        <img src="./public/imgs/galerie/default.webp" alt="" class="galerieImage">
                    </div>
                </div>
                `;
    galeriePage.innerHTML += html;
});
//#endregion OPTIONSGALERIE

//#region DELETE IMAGE
async function deleteImage(id) {
    let allImage = document.querySelectorAll("#galeriePost");
    allImage.forEach((img) => {
        let search = img.dataset.value;
        if (search === id) {
            img.remove();
        }
    });
}
//#endregion DELETE IMAGE

//#region PUB
let moving = true,
    allImagesPub = document.getElementsByClassName("carrouselPub"),
    totalImagesPub = allImagesPub.length,
    slide = 0, auto = false;

if (auto) {
    setInterval(function () {
        moving = false;
        if (!moving) {
            moveNextAuto();
        }
    }, 2000);
}

function moveNextAuto() {
    if (!moving) {
        if (slide === totalImagesPub - 1) {
            slide = 0;
        } else {
            slide++;
        }
        moveCarouselTo(slide);
    }
}

function moveNextMan(action) {
    if (slide === totalImagesPub - 1) {
        slide = 0;
    } else if (action === "next"){
        slide++;
    } else if (action === "previous") {
        slide--;
    }
    moveCarouselTo(slide);
}

function moveCarouselTo(slide) {
    if (!moving && auto) {
        let previousSlide = slide === 0 ? totalImagesPub - 1 : slide - 1;
        let nextSlide = slide === totalImagesPub - 1 ? 0 : slide + 1;

        for (let i = 0; i < totalImagesPub; i++) {
            allImagesPub[i].classList.remove("carrouselPubSee");
        }

        allImagesPub[slide].classList.add("carrouselPubSee");
        allImagesPub[previousSlide].classList.add("carrouselPubPrev");
        allImagesPub[nextSlide].classList.add("carrouselPubNext");
    } else if (!auto) {
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
//#endregion PUB
