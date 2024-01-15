export function fillWidgets(data) {
  // TODO: Make hourly graphs of each
  fillHumidity(data.current.relative_humidity_2m);
  fillPrecipitationProbability(data.hourly.precipitation_probability[0]);
  fillWindSpeed(data.current.wind_speed_10m);
  fillFeelsLike(data.current.apparent_temperature);
  fillPrecipitation(data.current.precipitation);
}

function fillHumidity(humidity) {
  var elem = document.querySelector("#humidity > h2");
  elem.innerHTML = humidity + "%";
}

function fillPrecipitationProbability(chance) {
  var elem = document.querySelector("#precipitation-probability > h2");
  elem.innerHTML = chance + "%";
}

function fillPrecipitation(precipitation) {
  var elem = document.querySelector("#precipitation > h2");
  elem.innerHTML = Math.round(precipitation) + "mm";
}

function fillWindSpeed(speed) {
  var elem = document.querySelector("#wind-speed > h2");
  elem.innerHTML = Math.round(speed) + "km/h";
}

function fillFeelsLike(feelsLike) {
  var elem = document.querySelector("#feels-like > h2");
  elem.innerHTML = Math.round(feelsLike) + "\u00B0";
}
