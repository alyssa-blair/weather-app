import React from "react";

// export function fillWidgets(data) {
//   // TODO: Make hourly graphs of each
//   fillHumidity(data.current.relative_humidity_2m);
//   fillPrecipitationProbability(data.hourly.precipitation_probability[0]);
//   fillWindSpeed(data.current.wind_speed_10m);
//   fillFeelsLike(data.current.apparent_temperature);
//   fillPrecipitation(data.current.precipitation);
// }

// function fillHumidity(humidity) {
//   var elem = document.querySelector("#humidity > h2");
//   elem.innerHTML = humidity + "%";
// }

// function fillPrecipitationProbability(chance) {
//   var elem = document.querySelector("#precipitation-probability > h2");
//   elem.innerHTML = chance + "%";
// }

// function fillPrecipitation(precipitation) {
//   var elem = document.querySelector("#precipitation > h2");
//   elem.innerHTML = Math.round(precipitation) + "mm";
// }

// function fillWindSpeed(speed) {
//   var elem = document.querySelector("#wind-speed > h2");
//   elem.innerHTML = Math.round(speed) + "km/h";
// }

// function fillFeelsLike(feelsLike) {
//   var elem = document.querySelector("#feels-like > h2");
//   elem.innerHTML = Math.round(feelsLike) + "\u00B0";
// }

const Widgets = (data) => {
  const widgetData = data.data;
  return (
    <div>
      <div id="humidity" className="side-widgets">
        <h1>Humidity</h1>
        <h2>{widgetData.current.relative_humidity_2m + "%"}</h2>
      </div>
      <div id="precipitation" className="side-widgets">
        <h1>Precipitation</h1>
        <h2>{widgetData.current.precipitation + "mm"}</h2>
        <p>In the last hour</p>
      </div>
      <div id="precipitation-probability" className="side-widgets">
        <h1>Chance of Precipitation</h1>
        <h2>{widgetData.current.precipitation_probability + "%"}</h2>
      </div>
      <div id="wind-speed" className="side-widgets">
        <h1>Wind Speed</h1>
        <h2>{Math.round(widgetData.current.wind_speed_10m) + "km/h"}</h2>
      </div>
      <div id="feels-like" className="side-widgets">
        <h1>Feels Like</h1>
        <h2>
          {Math.round(widgetData.current.apparent_temperature) + "\u00B0"}
        </h2>
      </div>
    </div>
  );
};

export default Widgets;
