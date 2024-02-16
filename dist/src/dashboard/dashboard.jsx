import WeeklyWeather from "../weeklyWeather/weeklyWeather.jsx";
import React, { useEffect, useState } from "react";
import CurrentWeather from "../currentWeather/currentWeather.jsx";
import Widgets from "../currentWeather/widgets.jsx";

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
      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,precipitation,precipitation_probability",
  };

  return params;
}

async function fetchDataFunction() {
  const params = getParams();
  const api = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&timezone=${params.timezone}&current=${params.current}&hourly=${params.hourly}`;

  return fetch(api)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP Error, Status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // fillWeekdays(data, date);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        });
      }, 1500);
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

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDataFunction().then((d) => {
      if (!data) setData(d);
    });
  }, []);

  return (
    <div id="dashboard">
      <div id="current-weather" className="current-weather">
        {data && <CurrentWeather data={data} />}
      </div>
      {data && <WeeklyWeather data={data} />}
      <div id="widgets" className="widgets">
        {data && <Widgets data={data} />}
      </div>
    </div>
  );
};

export default Dashboard;
