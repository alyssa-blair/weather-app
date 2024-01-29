import React from "react";
import WeatherTime from "../dashboard/WeatherTime.jsx";
import { getWeatherEmoji } from "./current.js";

const HourlyWeather = (props) => {
  const hourly = props.data.hourly;
  const index = props.day + props.index;

  const times = hourly.time;
  const time = new WeatherTime(...times[index].split(/-|T|:/));

  //   const hourlyElems = Array.from({ length: 24 }, (_, index) => index + 1);
  //   const weatherCode = ;
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
// var time = new WeatherTime(...times[i + count].split(/-|T|:/));
// var temp = Math.round(temps[i + count]);
