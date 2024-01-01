export function currentWeatherTemp(data) {
    var elem = document.getElementById("current-weather-temp");
    elem.innerHTML = Math.round(data.current.temperature_2m) + '\u00B0';
}

export function currentWeatherBreakdown(currentTime, temps, times) {
    var i = times.indexOf(currentTime.replace(/:\w{2}$/, ':00'));
    var count = 0;

    while (count < 24) {
        var time = times[i + count];
        var temp = Math.round(temps[i + count]);

        var tempText = document.querySelector(`#hour${count} > p`);
        var timeHeader = document.querySelector(`#hour${count} > h3`);
        var dateTime = time.split('T');

        timeHeader.innerHTML = dateTime[dateTime.length - 1];
        tempText.innerHTML = temp + '\u00B0';
        count++;
    }
}