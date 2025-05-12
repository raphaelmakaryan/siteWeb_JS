//#region VARIABLES
let debug = false;
//#endregion VARIABLES

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

//#region ERROR
function sendErrorMessage(error) {
    const errorAPI = document.getElementById("errorAPI");
    errorAPI.innerHTML += `<p>${error}</p>`
}
//#endregion ERROR

//#region TABLE

function alreadyExists(div) {
    if (div.length === 0) {
        return false
    }
    return true
}

function statutCaptors(temperature, humidity) {
    if (temperature <= 35 && humidity <= 80) {
        return "✅";
    }
    return "⚠";
}

function updateTable(data) {
    const tableDashboard = document.getElementsByClassName("tableDashboard");
    const bodyCaptorsDashboard = document.getElementById("bodyCaptorsDashboard");
    if (data && alreadyExists(tableDashboard[0].children) === false) {
        data.forEach(element => {
            bodyCaptorsDashboard.innerHTML += `
                <tr class="status-${statutCaptors(element.temperature, element.humidity)}">
                    <td>${element.name}</td>
                    <td>${element.temperature}</td>
                    <td>${element.humidity}</td>
                    <td>${statutCaptors(element.temperature, element.humidity)}</td>
                </tr>
            `;
        });
    }
}
//#endregion TABLE

//#region API
const API_URL = "https://mocki.io/v1/d2c438e4-f9f3-4f8b-bdee-b59b0325bd4e"
const API_TOKEN = "Bearer 12345-abcde"

function getAuthHeaders() {
    return {
        "Authorization": API_TOKEN,
        "Content-Type": "application/json"
    };
}

function fetchSensorData() {
    fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders()
    })
        .then(response => {
            if (!response.ok) {
                sendErrorMessage("Network response was not ok")
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            updateTable(data);
        })
        .catch(error => {
            sendErrorMessage(error)
            console.error("Error fetching sensor data:", error);
        });
}

setInterval(() => {
    fetchSensorData()
}, 5000);
//#endregion API
