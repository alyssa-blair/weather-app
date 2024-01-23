import WeatherTime from "../dashboard/WeatherTime.jsx";
import { fillWidgets } from "./widgets.jsx";
import React from "react";
import {
  WiCloudy,
  WiSprinkle,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiHail,
} from "react-icons/wi";

export function currentWeatherTemp(data) {
  var elem = document.getElementById("current-weather-temp");
  elem.innerHTML = Math.round(data.current.temperature_2m) + "\u00B0";
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
    var weatherCode = getWeatherCode(data.hourly.weather_code[count + i]);

    weatherEmoji.innerHTML = weatherCode;
    dateHeader.innerHTML = `${time.monthDay()}`;
    timeHeader.innerHTML = `${time.twelveHourTime()}`;
    tempText.innerHTML = temp + "\u00B0";
    count++;
  }

  // fillWidgets(data);
}

// const HourlyWeather = ({ data, temps, times }) => {
//   const [currentTime, setCurrentTime] = useState(null);
//   const [hourlyData, setHourlyData] = useState([]);

//   useEffect(() => {
//     const weatherTime = new WeatherTime(...data.current.time.split(/-|T|:/));
//     setCurrentTime(weatherTime);

//     const i = times.indexOf(currentTime.formatNoMinutes());

//     const newHourlyData = times.splice(i, i + 24).map((time, index) => {
//       console.log(index);
//       var time = new WeatherTime(...time.split(/-|T|:/));

//       return {
//         index: index,
//         time: time.twelveHourTime(),
//         date: time.monthDay(),
//         temp: Math.round(temps[i]),
//         weatherCode: getWeatherCode(data.hourly.weather_code[i]),
//       };
//     });

//     setHourlyData(newHourlyData);
//   });

//   return (
//     <div>
//       {hourlyData.map(({ index, time, date, temp, weatherCode }) => {
//         <div id={`hour${count}`}>
//           <div id="hourly-temp">{temp + "\u00B0"}</div>
//           <div id="hourly-emoji">{weatherCode}</div>
//           <h3>{time}</h3>
//           <h4>{date}</h4>
//         </div>;
//       })}
//     </div>
//   );
// };

export function getWeatherCode(weatherCode) {
  var code = "";
  if (weatherCode == 0) code = <WiDaySunny />;
  else if (weatherCode <= 3) code = <WiCloudy />;
  else if (weatherCode <= 48) code = <WiFog />;
  else if (weatherCode <= 55)
    code = <WiSprinkle />; //drizzle
  else if (weatherCode <= 65 || 82 >= weatherCode >= 80) code = <WiRain />;
  else if (weatherCode <= 67)
    code = <WiHail />; // freezing rain
  else if (weatherCode <= 86) code = <WiSnow />;
  else if (weatherCode == 95) code = <WiThunderstorm />;

  return code;
}

// export default HourlyWeather;
