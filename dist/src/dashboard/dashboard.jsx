import WeeklyWeather from "../weeklyWeather/weeklyWeather.jsx";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CurrentWeather from "./currentWeather.jsx";
import { createRoot } from "react-dom/client";
import Widgets from "../currentWeather/widgets.jsx";

// console.log("here");
// window.onload = function () {
//   fetchData();
// };

// const plotWindow = document.getElementById("plot-window");
// const plotClose = document.getElementById("plot-close");
// const currentWeatherBreakdown = document.getElementById(
//   "current-weather-hourly"
// );

// window.generateGraph = function (value) {
//   plotWindow.style.display = "block";
//   fetchData(value);
// };

// plotClose.addEventListener("click", function () {
//   plotWindow.style.display = "none";
// });

// // create the current weather breakdown elements
// for (var i = 0; i < 24; i++) {
//   const currentWeatherDiv = document.createElement("div");
//   currentWeatherDiv.id = `hour${i}`;
//   currentWeatherDiv.classNameName = `hourly-breakdown`;

//   const currentWeatherDate = document.createElement("h4");
//   currentWeatherDiv.appendChild(currentWeatherDate);

//   const currentWeatherTime = document.createElement("h3");
//   currentWeatherDiv.appendChild(currentWeatherTime);

//   const weatherEmoji = document.createElement("p");
//   weatherEmoji.id = "hourly-emoji";
//   currentWeatherDiv.appendChild(weatherEmoji);

//   const currentWeatherTemp = document.createElement("p");
//   currentWeatherTemp.id = "hourly-temp";
//   currentWeatherDiv.appendChild(currentWeatherTemp);

//   currentWeatherBreakdown.appendChild(currentWeatherDiv);
// }

function getParams() {
  const date = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateStr = date.toLocaleString("en-US", {
    timeZoneName: "short",
    timezone,
  });
  const timezoneAbbr = dateStr.split(" ")[3];

  navigator.geolocation.getCurrentPosition(showLocation);

  const params = {
    latitude: localStorage.getItem("latitude"),
    longitude: localStorage.getItem("longitude"),
    timezone: timezoneAbbr,
    hourly:
      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation_probability",
    current:
      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,precipitation",
  };

  return params;
}

async function fetchData(date = null) {
  const params = getParams();
  const api = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&timezone=${params.timezone}&current=${params.current}&hourly=${params.hourly}`;

  return fetch(api)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP Error, Status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      // fillWeekdays(data, date);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

function showLocation(position) {
  const latitude = position.coords.latitude.toString();
  const longitude = position.coords.longitude.toString();

  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
}

const Dashboard = async () => {
  // const [data, setData] = useState(null);
  const data = await fetchData();

  console.log(gotData);
  return (
    <div id="dashboard">
      <div id="widgetsOne" className="widgets">
        <div id="current-weather" className="current-weather"></div>
        <WeeklyWeather />
        <div id="widgets" className="widgets">
          <Widgets data={Promise.resolve(data)} />
        </div>
      </div>
      {/* <div id="humidity" className="side-widgets">
        <h1>Humidity</h1>
        <h2></h2>
      </div>
      <div id="precipitation" className="side-widgets">
        <h1>Precipitation</h1>
        <h2></h2>
        <p>In the last hour</p>
      </div>
      <div id="precipitation-probability" className="side-widgets">
        <h1>Chance of Precipitation</h1>
        <h2></h2>
      </div>
      <div id="wind-speed" className="side-widgets">
        <h1>Wind Speed</h1>
        <h2></h2>
      </div>
      <div id="feels-like" className="side-widgets">
        <h1>Feels Like</h1>
        <h2></h2>
        rel="preload"
      </div> */}
    </div>
  );
};

export default Dashboard;
// const root = createRoot(document.getElementById("location-form"));
// root.render(<CurrentWeather />);
/** 
  <body>
    <div id="widgetsOne" className="widgets">
      <div id="current-weather" className="current-weather"></div>
      <div id="weekly-weather" className="weekly-weather">
        <h1>7-day forecast</h1>
        <div id="day0" className="weekday" onclick="generateGraph(0)">
          <h2 className="weekday-date">Today</h2>
          <div className="weekday-info">
            <h3 className="min-temp" id="minTemp0"></h3>
            <div className="temperature-bar">
              <span id="range0"></span>
            </div>
            <h3 className="max-temp" id="maxTemp0"></h3>
          </div>
        </div>
        <div id="day1" className="weekday" onclick="generateGraph(1)">
          <h2 className="weekday-date"></h2>
          <div className="weekday-info">
            <h3 className="min-temp" id="minTemp1"></h3>
            <div className="temperature-bar">
              <span id="range1"></span>
            </div>
            <h3 className="max-temp" id="maxTemp1"></h3>
          </div>
        </div>
        <div id="day2" className="weekday" onclick="generateGraph(2)">
          <h2 className="weekday-date"></h2>
          <div className="weekday-info">
            <h3 className="min-temp" id="minTemp2"></h3>
            <div className="temperature-bar">
              <span id="range2"></span>
            </div>
            <h3 className="max-temp" id="maxTemp2"></h3>
          </div>
        </div>
        <div id="day3" className="weekday" onclick="generateGraph(3)">
          <h2 className="weekday-date"></h2>
          <div className="weekday-info">
            <h3 className="min-temp" id="minTemp3"></h3>
            <div className="temperature-bar">
              <span id="range3"></span>
            </div>
            <h3 className="max-temp" id="maxTemp3"></h3>
          </div>
        </div>
        <div id="day4" className="weekday" onclick="generateGraph(4)">
          <h2 className="weekday-date"></h2>
          <div className="weekday-info">
            <h3 className="min-temp" id="minTemp4"></h3>
            <div className="temperature-bar">
              <span id="range4"></span>
            </div>
            <h3 className="max-temp" id="maxTemp4"></h3>
          </div>
        </div>
        <div id="day5" className="weekday" onclick="generateGraph(5)">
          <h2 className="weekday-date"></h2>
          <div className="weekday-info">
            <h3 className="min-temp" id="minTemp5"></h3>
            <div className="temperature-bar">
              <span id="range5"></span>
            </div>
            <h3 className="max-temp" id="maxTemp5"></h3>
          </div>
        </div>
        <div id="day6" className="weekday" onclick="generateGraph(6)">
          <h2 className="weekday-date"></h2>
          <div className="weekday-info">
            <h3 className="min-temp" id="minTemp6"></h3>
            <div className="temperature-bar">
              <span id="range6"></span>
            </div>
            <h3 className="max-temp" id="maxTemp6"></h3>
          </div>
        </div>
      </div>
      <div id="widgets" className="widgets"></div>
      <!-- </div>
      <div id="humidity" className="side-widgets">
        <h1>Humidity</h1>
        <h2></h2>
      </div>
      <div id="precipitation" className="side-widgets">
        <h1>Precipitation</h1>
        <h2></h2>
        <p>In the last hour</p>
      </div>
      <div id="precipitation-probability" className="side-widgets">
        <h1>Chance of Precipitation</h1>
        <h2></h2>
      </div>
      <div id="wind-speed" className="side-widgets">
        <h1>Wind Speed</h1>
        <h2></h2>
      </div>
      <div id="feels-like" className="side-widgets">
        <h1>Feels Like</h1>
        <h2></h2>
      rel="preload"
      </div>  -->
    </div>

    <div id="plot-window" data-date="none">
      <div id="weather-plot"></div>
      <button id="plot-close" className="close-button">Close</button>
    </div>

    <script type="text/jsx" src="dashboard.jsx"></script>

    <!-- <script
      rel="preload"
      type="text/js"
      src="node_modules/plotly.js/dist/plotly.min.js"
    ></script> -->
  </body>
</html>
*/
