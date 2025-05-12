//#region MENU
let buttonDropDownCaptors = document.getElementById("dropdownDashboard");
let buttonDropDownCaptorsList = document.getElementById("dropdownDashboardList");
let isActiveMenu = false;

buttonDropDownCaptors.addEventListener("click", function () {
    if (isActiveMenu) {
        isActiveMenu = false;
        buttonDropDownCaptors.style.borderRadius = "var(--radius) var(--radius)  var(--radius) var(--radius)";
        buttonDropDownCaptorsList.style.display = "none";
    } else if (!isActiveMenu) {
        isActiveMenu = true;
        buttonDropDownCaptors.style.borderRadius = "var(--radius) var(--radius)  0 0";
        buttonDropDownCaptorsList.style.display = "flex";
    }
});
//#endregion MENU

