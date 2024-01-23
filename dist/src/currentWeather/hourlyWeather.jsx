import React from "react";
import WeatherTime from "../dashboard/WeatherTime.jsx";
import { getWeatherCode } from "./current.js";

const HourlyWeather = (props) => {
  const times = props.data.hourly.time;
  const time = new WeatherTime(
    ...times[props.day + props.index].split(/-|T|:/)
  );

  //   const hourlyElems = Array.from({ length: 24 }, (_, index) => index + 1);
  //   const weatherCode = ;
  const weatherCode = 1;
  const temp = "";
  console.log(props);
  return (
    <div id={`hour${props.day}`} className="hourly-breakdown">
      <h4>{time.monthDay()}</h4>
      <h3>{time.twelveHourTime()}</h3>
      <p id="hourly-emoji">{`${getWeatherCode(weatherCode)}`}</p>
      <p id="hourly-temp">{temp}</p>
    </div>
  );
};

export default HourlyWeather;
// var time = new WeatherTime(...times[i + count].split(/-|T|:/));
// var temp = Math.round(temps[i + count]);
