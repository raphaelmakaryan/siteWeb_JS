//#region VARIABLES
/* 
PREMIER :
https://mocki.io/v1/d2c438e4-f9f3-4f8b-bdee-b59b0325bd4e

DEUXIEME : 
https://mocki.io/v1/289a8bc6-3310-42b9-bcd7-9c1fd4962f19

*/
const API_URL = "https://mocki.io/v1/289a8bc6-3310-42b9-bcd7-9c1fd4962f19"
const API_TOKEN = "Bearer 12345-abcde"
const tableDashboard = document.getElementsByClassName("tableDashboard");
let evolutionVisibilty = false
//#endregion VARIABLES

//#region LOCALSTORAGE
function north(data) {
    let nameLS = "Capteur Nord"
    const getHistoricNorth = localStorage.getItem(nameLS);
    let historique = [];
    if (!getHistoricNorth) {
        data.forEach(element => {
            if (element.name === nameLS) {
                historique.push({
                    temperature: [element.temperature],
                    humidity: [element.humidity],
                    id: element.id
                });
            }
        });
        localStorage.setItem(nameLS, JSON.stringify(historique));
    } else {
        let jsonLocal = JSON.parse(getHistoricNorth)[0]
        let lastPosTem = jsonLocal.temperature[jsonLocal.temperature.length - 1]
        let lastPosHum = jsonLocal.humidity[jsonLocal.humidity.length - 1]
        let idNorth = jsonLocal.id
        verificationNewValue(data, lastPosTem, lastPosHum, nameLS, idNorth - 1)
    }
}

function east(data) {
    let nameLS = "Capteur Est"
    const getHistoricEast = localStorage.getItem(nameLS);
    if (!getHistoricEast) {
        let historique = [];
        data.forEach(element => {
            if (element.name === nameLS) {
                historique.push({
                    temperature: [element.temperature],
                    humidity: [element.humidity],
                    id: element.id
                });
            }
        });
        localStorage.setItem(nameLS, JSON.stringify(historique));
    } else {
        let jsonLocal = JSON.parse(getHistoricEast)[0]
        let lastPosTem = jsonLocal.temperature[jsonLocal.temperature.length - 1]
        let lastPosHum = jsonLocal.humidity[jsonLocal.humidity.length - 1]
        let idEast = jsonLocal.id
        verificationNewValue(data, lastPosTem, lastPosHum, nameLS, idEast - 1)
    }
}

function south(data) {
    let nameLS = "Capteur Sud"
    const getHistoricSouth = localStorage.getItem(nameLS);
    if (!getHistoricSouth) {
        let historique = [];
        data.forEach(element => {
            if (element.name === nameLS) {
                historique.push({
                    temperature: [element.temperature],
                    humidity: [element.humidity],
                    id: element.id
                });
            }
        });
        localStorage.setItem(nameLS, JSON.stringify(historique));
    } else {
        let jsonLocal = JSON.parse(getHistoricSouth)[0]
        let lastPosTem = jsonLocal.temperature[jsonLocal.temperature.length - 1]
        let lastPosHum = jsonLocal.humidity[jsonLocal.humidity.length - 1]
        let idSouth = jsonLocal.id
        verificationNewValue(data, lastPosTem, lastPosHum, nameLS, idSouth - 1)
    }
}

function west(data) {
    let nameLS = "Capteur Ouest"
    const getHistoricWest = localStorage.getItem(nameLS);
    if (!getHistoricWest) {
        let historique = [];
        data.forEach(element => {
            if (element.name === nameLS) {
                historique.push({
                    temperature: [element.temperature],
                    humidity: [element.humidity],
                    id: element.id
                });
            }
        });
        localStorage.setItem(nameLS, JSON.stringify(historique));
    } else {
        let jsonLocal = JSON.parse(getHistoricWest)[0]
        let lastPosTem = jsonLocal.temperature[jsonLocal.temperature.length - 1]
        let lastPosHum = jsonLocal.humidity[jsonLocal.humidity.length - 1]
        let idWest = jsonLocal.id
        verificationNewValue(data, lastPosTem, lastPosHum, nameLS, idWest - 1)
    }
}

function verificationLocal(data) {
    north(data)
    west(data)
    south(data)
    east(data)
}

function addNewValue(data, capteur, what) {
    let localCapteur = JSON.parse(localStorage.getItem(capteur)) || [];
    let search = localCapteur[0][what]
    search.push(data);
    localStorage.setItem(capteur, JSON.stringify(localCapteur));
}

function verificationNewValue(data, temp, hum, capteur, id) {
    if (data[id].name === capteur) {
        let dataSearch = data[id]
        if (temp != dataSearch.temperature) {
            addNewValue(dataSearch.temperature, capteur, "temperature")
        } else if (hum != dataSearch.humidity) {
            addNewValue(dataSearch.humidity, capteur, "humidity")
        }
        else if (!evolutionVisibilty){
            evolutionVisibilty = true
            evolution()
        }
    }
}

function evolution() {
    const getHistoricNorth = JSON.parse(localStorage.getItem("Capteur Nord"));
    const getHistoricEast = JSON.parse(localStorage.getItem("Capteur Est"));
    const getHistoricWest = JSON.parse(localStorage.getItem("Capteur Ouest"));
    const getHistoricSouth = JSON.parse(localStorage.getItem("Capteur Sud"));

    if (getHistoricNorth && getHistoricEast && getHistoricSouth && getHistoricWest) {
        const ctx = document.getElementById('canvaDashboardEvolution');
        ctx.style.width = "500px";

        const labels = Array.from({ length: getHistoricNorth[0].temperature.length }, (_, i) => `Point ${i + 1}`);

        const datasets = [
            {
                label: 'North Temperature (°C)',
                data: getHistoricNorth[0].temperature,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false
            },
            {
                label: 'East Temperature (°C)',
                data: getHistoricEast[0].temperature,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false
            },
            {
                label: 'South Temperature (°C)',
                data: getHistoricSouth[0].temperature,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
            },
            {
                label: 'West Temperature (°C)',
                data: getHistoricWest[0].temperature,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: false
            }
        ];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Historical Data Evolution'
                    }
                }
            }
        });
    }
}

//#endregion LOCALSTORAGE

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

//#region CHARTS
function getChart(data) {
    const ctx = document.getElementById('canvaDashboard');
    ctx.style.width = "500px";

    const labels = data.map(element => element.name);
    const temperatures = data.map(element => element.temperature);
    const humidities = data.map(element => element.humidity);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatures,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Humidity (%)',
                    data: humidities,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Data'
                }
            }
        }
    });
}
//#endregion CHARTS

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
    const bodyCaptorsDashboard = document.getElementById("bodyCaptorsDashboard");
    if (data && alreadyExists(tableDashboard[0].children) === false) {
        data.forEach(element => {
            bodyCaptorsDashboard.innerHTML += `
                <tr class="oneCaptor status-${statutCaptors(element.temperature, element.humidity)}">
                    <td>${element.name}</td>
                    <td>${element.temperature}</td>
                    <td>${element.humidity}</td>
                    <td>${statutCaptors(element.temperature, element.humidity)}</td>
                </tr>
            `;
        });
        getChart(data)
    }
}
//#endregion TABLE

//#region FILTERS MENU
function allCaptors() {
    let allCaptors = tableDashboard[0].children
    for (let index = 0; index < allCaptors.length; index++) {
        const element = allCaptors[index];
        element.style.display = ""
    }
}

function captorsOk() {
    let captors = document.querySelectorAll(".oneCaptor")
    for (let i = 0; i < captors.length; i++) {
        let captor = captors[i];
        let verifStatut = captor.classList[1] === "status-✅";
        if (verifStatut) {
            captor.style.display = "";
        } else {
            captor.style.display = "none";
        }
    }
}

function captorsError() {
    let captors = document.querySelectorAll(".oneCaptor")
    for (let i = 0; i < captors.length; i++) {
        let captor = captors[i];
        let verifStatut = captor.classList[1] === "status-⚠";
        if (verifStatut) {
            captor.style.display = "";
        } else {
            captor.style.display = "none";
        }
    }
}
//#endregion FILTERS MENU

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

//#region API
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
            verificationLocal(data)
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

//#region CREATE ERROR
function logKey(e) {
    if (e.key === "e") {
        sendErrorMessage("Voici une erreur")
    }
}
document.addEventListener("keypress", logKey);
//#endregion CREATE ERROR