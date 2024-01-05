import WeatherTime from './WeatherTime.js'

export function currentWeatherTemp(data) {
    var elem = document.getElementById("current-weather-temp");
    elem.innerHTML = Math.round(data.current.temperature_2m) + '\u00B0';
}

export function currentWeatherBreakdown(data, temps, times) {
    const currentTime = new WeatherTime(...data.current.time.split(/-|T|:/));
    var i = times.indexOf(currentTime.formatNoMinutes());
    var count = 0;

    while (count < 24) {
        var time = new WeatherTime(...times[i + count].split(/-|T|:/));
        var temp = Math.round(temps[i + count]);

        var tempText = document.querySelector(`#hour${count} > #hourly-temp`);
        var weatherEmoji = document.querySelector(`#hour${count} > #hourly-emoji`);
        var timeHeader = document.querySelector(`#hour${count} > h3`);
        var dateHeader = document.querySelector(`#hour${count} > h4`);
        var weatherCode = getWeatherCode(data.hourly.weather_code[count+i]);

        weatherEmoji.innerHTML = weatherCode;
        dateHeader.innerHTML = `${time.monthDay()}`;
        timeHeader.innerHTML = `${time.twelveHourTime()}`;
        tempText.innerHTML = temp + '\u00B0';
        count++;
    }
}

function getWeatherCode(weatherCode) {
    // TODO: replace with weather codes
    var code = '';
    if (weatherCode == 0)
        code = '&#x26C4';
    else if (weatherCode <= 3)
        code = '&#x26C5';
    else if (weatherCode <= 48)
        code = 'fog';
    else if (weatherCode <= 55)
        code = 'drizzle';
    else if (weatherCode <= 65 || 82 >= weatherCode >= 80)
        code = 'rain';
    else if (weatherCode <= 67)
        code = 'freezing rain';
    else if (weatherCode <= 86)
        code = 'snow fall';
    else if (weatherCode == 95)
        code = 'thunderstorm';

    return code;
}


