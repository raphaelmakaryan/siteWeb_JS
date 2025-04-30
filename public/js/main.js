
//#region MENU HEADER
let buttonDropDown = document.getElementById("dropdownHeaderMain");
let buttonDropDownList = document.getElementById("dropdownHeaderList");
let isActive = false;

buttonDropDown.addEventListener("click", function () {
    if (isActive) {
        isActive = false;
        buttonDropDown.style.borderRadius = "var(--radius) var(--radius) var(--radius) var(--radius)";
        buttonDropDownList.style.display = "none";
    } else if (!isActive) {
        isActive = true;
        buttonDropDown.style.borderRadius = "var(--radius) var(--radius)  0 0";
        buttonDropDownList.style.display = "flex";
    }
});
//#endregion MENU HEADER