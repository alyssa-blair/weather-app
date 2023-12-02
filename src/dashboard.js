
function fillWeekdays(data) {    
    var date = new Date();
    var nextDay = date.getDay();

    const temps = data.hourly.temperature_2m;
    const times = data.hourly.time;

    var nextDayFull = date;

    for (var i = 0; i < 7; i++) {
        if (i != 0) {
            nextDay = (nextDay + 1) % 7;
            setWeekday(i, nextDay);
        }

        setMinMaxTemp(i, nextDayFull, times, temps);
        nextDayFull = new Date(date.setDate(date.getDate() + 1));
    }
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
                min = temps[i];

            if (!max || temps[i] > max)
                max = temps[i];
            
        }
    }

    const minTemp = document.querySelector(`#day${dateIndex} > #minTemp`);
    const maxTemp = document.querySelector(`#day${dateIndex} > #maxTemp`);

    minTemp.innerHTML = "Min: " + min + '\u00B0';
    maxTemp.innerHTML = "Max: " + max + '\u00B0';

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
    localStorage.setItem('latitude', position.coords.latitude.toString());
    localStorage.setItem('longitude', position.coords.latitude.toString());
}

window.onload = async function() {
    fetchData();
}
