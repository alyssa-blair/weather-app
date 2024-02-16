import fetchData from "../dashboard/dashboard.jsx";
import React from "react";
import HourlyWeather from "./hourlyWeather.jsx";
import WeatherTime from "../dashboard/WeatherTime.jsx";

const CurrentWeather = (props) => {
  const hourlyElems = Array.from({ length: 24 }, (_, index) => index + 1);

  const currentTime = new WeatherTime(
    ...props.data.current.time.split(/-|T|:/)
  );
  const index = props.data.hourly.time.indexOf(currentTime.formatNoMinutes());

  return (
    <div>
      <div
        id="current-weather-temperature"
        className="current-weather-temperature"
      >
        <h1>{Math.round(props.data.current.temperature_2m) + "\u00B0"}</h1>
        <p id="current-weather-temp"></p>
      </div>
      <div id="current-weather-breakdown" className="current-weather-breakdown">
        <h1>24-Hour Breakdown</h1>
        <div id="current-weather-hourly">
          <ul>
            {hourlyElems.map((day) => (
              <li key={`hourly${day}`}>
                <HourlyWeather data={props.data} day={day} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
