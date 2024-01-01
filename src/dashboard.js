import { fillWeekdays } from './weekdays.js'

window.onload = function() {
    fetchData();
}

const plotWindow = document.getElementById("plot-window");
const plotClose = document.getElementById("plot-close");
const currentWeatherBreakdown = document.getElementById('current-weather-hourly')

window.generateGraph = function(value) {
    plotWindow.style.display = "block";
    fetchData(value);
}

plotClose.addEventListener("click", function() {
    plotWindow.style.display = "none";
});

// create the current weather breakdown elements
for (var i = 0; i < 24; i++) {
    const currentWeatherDiv = document.createElement('div');
    currentWeatherDiv.id = `hour${i}`;
    currentWeatherDiv.className = `hourly-breakdown`;

    const currentWeatherTime = document.createElement('h3');
    currentWeatherDiv.appendChild(currentWeatherTime);

    const currentWeatherTemp = document.createElement('p');
    currentWeatherDiv.appendChild(currentWeatherTemp);

    currentWeatherBreakdown.appendChild(currentWeatherDiv);
}


function getParams() {
    const date = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateStr = date.toLocaleString('en-US', {timeZoneName: "short", timezone});
    const timezoneAbbr = dateStr.split(' ')[3];

    navigator.geolocation.getCurrentPosition(showLocation);

    const params = {
        "latitude": localStorage.getItem("latitude"),
        "longitude": localStorage.getItem("longitude"),
        "timezone": timezoneAbbr,
        "hourly": "temperature_2m",
    }

    return params;
}


function fetchData(date=null) {
    const params = getParams();
    const api = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&timezone=${params.timezone}&current=temperature_2m,wind_speed_10m&hourly=${params.hourly},relative_humidity_2m,wind_speed_10m`

    fetch(api).then(response => {    
        if (!response.ok)
            throw new Error(`HTTP Error, Status: ${response.status}`);
        return response.json();
    }).then(data => {
        fillWeekdays(data, date);
    }).catch(error => {
        console.error("Error fetching data: ", error);
    })
}


function showLocation(position) {
    const latitude = position.coords.latitude.toString()
    const longitude = position.coords.longitude.toString()

    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
}
