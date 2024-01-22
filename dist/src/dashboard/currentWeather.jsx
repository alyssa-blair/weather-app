import fetchData from "./dashboard.jsx";
import React from "react";

const CurrentWeather = () => {
  // console.log("here");
  fetchData();

  return (
    <div>
      <div
        id="current-weather-temperature"
        className="current-weather-temperature"
      >
        <h1></h1>
        <p id="current-weather-temp"></p>
      </div>
      <div id="current-weather-breakdown" className="current-weather-breakdown">
        <h1>24-Hour Breakdown</h1>
        <div id="current-weather-hourly"></div>
      </div>
    </div>
  );
};

export default CurrentWeather;
