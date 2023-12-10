
function fillWeekdays(data) {    
    var date = new Date();
    var nextDay = date.getDay();

    const temps = data.hourly.temperature_2m;
    const times = data.hourly.time;

    var nextDayFull = date;
    var mins = [];
    var maxs = [];

    for (var i = 0; i < 7; i++) {
        if (i != 0) {
            nextDay = (nextDay + 1) % 7;
            setWeekday(i, nextDay);
        }

        var range = setMinMaxTemp(i, nextDayFull, times, temps);
        mins.push(range[0]);
        maxs.push(range[1]);
        nextDayFull = new Date(date.setDate(date.getDate() + 1));
    }

    fillWeekdayBars(mins, maxs);
    fillCurrent(data)
}

function fillWeekdayBars(mins, maxs) {
    var min = Math.min.apply(null, mins);
    var max = Math.max.apply(null, maxs);

    const range = max - min != 0 ? max - min : 1;
    const sectionSize = 150 / range;
    
    for (var i = 0; i < 7; i++) {
        var elem = document.getElementById(`range${i}`)
        var curMin = mins[i];
        var curMax = maxs[i];

        var curRange = curMax - curMin;
        if (curRange == 0)
            curRange = 1
    
        elem.style.width = `${curRange * sectionSize}px`;
        elem.style.left = `${(curMin - min) * sectionSize}px`;

    }
}

function fillCurrent(data) {
    console.log(data.current)
    var elem = document.getElementById("current-weather-temp");
    elem.innerHTML = data.current.temperature_2m + '\u00B0';
}

function setMinMaxTemp(dateIndex, date, times, temps) {

    const nextDayFormatted = formatDate(date, 0);
    const searchDate = nextDayFormatted.substring(0, 10);

    var min;
    var max;

    const start = times.indexOf(searchDate + "T00:00");
    for (var i = start; i < start + 24; i++) {

        if (times[i].startsWith(searchDate)) {

            if (!min || temps[i] < min)
                min = Math.round(temps[i]);

            if (!max || temps[i] > max)
                max = Math.round(temps[i]);
        }
    }

    const minTemp = document.querySelector(`#day${dateIndex} > div > #minTemp${dateIndex}`);
    const maxTemp = document.querySelector(`#day${dateIndex} > div > #maxTemp${dateIndex}`);

    minTemp.innerHTML = min + '\u00B0';
    maxTemp.innerHTML = max + '\u00B0';
    return [min, max];
}


function setWeekday(i, day) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const elemDate = document.querySelector(`#day${i} > h2`);
    elemDate.innerHTML = days[day];
}


function formatDate(date) {
    const dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }

    const timeOptions = {
        hour: "2-digit",
        hourCycle: "h24",
    }

    const formattedDate = date.toLocaleDateString('en-CA', dateOptions).replaceAll("/", "-");
    const formattedTime = date.toLocaleTimeString('en-CA', timeOptions);

    return `${formattedDate}T${formattedTime}:00`
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


function fetchData() {
    const params = getParams();
    const api = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&timezone=${params.timezone}&current=temperature_2m,wind_speed_10m&hourly=${params.hourly},relative_humidity_2m,wind_speed_10m`

    fetch(api).then(response => {    
        if (!response.ok)
            throw new Error(`HTTP Error, Status: ${response.status}`);
        return response.json();
    }).then(data => {
        fillWeekdays(data)
    }).catch(error => {
        console.error("Error fetching data: ", error);
    })
}

function showLocation(position) {
    const latitude = position.coords.latitude.toString()
    const longitude = position.coords.longitude.toString()

    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    localStorage.setItem('locationName', new google.maps.LatLng(latitude, longitude));
}

window.onload = function() {
    fetchData();

}
