import WeatherTime from "../dashboard/WeatherTime.jsx";
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

export function getWeatherEmoji(weatherCode) {
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
