import React from "react";
import WeatherTime from "../dashboard/WeatherTime.jsx";
import { getWeatherEmoji } from "./current.js";

const HourlyWeather = (props) => {
  const hourly = props.data.hourly;
  const index = props.day + props.index;

  const times = hourly.time;
  const time = new WeatherTime(...times[index].split(/-|T|:/));

  const weatherCode = hourly.weather_code[index];
  const temp = Math.round(hourly.temperature_2m[index]) + "\u00B0";

  return (
    <div id={`hour${props.day}`} className="hourly-breakdown">
      <h4>{time.monthDay()}</h4>
      <h3>{time.twelveHourTime()}</h3>
      <p id="hourly-emoji">{getWeatherEmoji(weatherCode)}</p>
      <p id="hourly-temp">{temp}</p>
    </div>
  );
};

export default HourlyWeather;
