const currentWeather = () => {
  console.log("here");
  fetchData();

  return (
    <div>
      <div id="current-weather-temperature" class="current-weather-temperature">
        <h1></h1>
        <p id="current-weather-temp"></p>
      </div>
      <div id="current-weather-breakdown" class="current-weather-breakdown">
        <h1>24-Hour Breakdown</h1>
        <div id="current-weather-hourly"></div>
      </div>
    </div>
  );
};
