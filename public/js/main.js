
//#region MENU HEADER
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
//#endregion MENU HEADER