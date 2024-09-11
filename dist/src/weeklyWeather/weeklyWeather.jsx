import { formatDate } from "../dashboard/dateFormat.jsx";
import Weekday from "./weekday.jsx";
import React, { useState } from "react";
import Graph from "./graph.jsx";

function getMinMaxTemps(data, dayNum) {
  const temps = data.hourly.temperature_2m;
  const times = data.hourly.time;

  var date = new Date();
  date = new Date(date.setDate(date.getDate() + dayNum));
  const dateFormatted = formatDate(date, 0);
  const searchDate = dateFormatted.substring(0, 10);

  const startIndex = times.indexOf(searchDate + "T00:00");

  var min;
  var max;

  for (var i = startIndex; i < startIndex + 24; i++) {
    if (times[i].startsWith(searchDate)) {
      if (!min || temps[i] < min) min = Math.round(temps[i]);

      if (!max || temps[i] > max) max = Math.round(temps[i]);
    }
  }

  return [min, max];
}

const WeeklyWeather = (props) => {
  const ids = [0, 1, 2, 3, 4, 5, 6]; // update to be in relation to today
  const [graphVisible, setGraphVisible] = useState(null);
  const ls = [];

  const date = new Date();
  var day = date.getDay();

  var totalMin = null;
  var totalMax = null;

  ids.forEach((id) => {
    var [min, max] = getMinMaxTemps(props.data, day);

    totalMin = totalMin ? Math.min(totalMin, min) : min;
    totalMax = totalMax ? Math.max(totalMax, max) : max;

    ls.push({
      id: id,
      day: day,
      currentMin: min,
      currentMax: max,
    });

    day = (day + 1) % 7;
  });
  console.log(ls);
  return (
    <div id="weekly-weather" className="weekly-weather">
      <h1>7-day forecast</h1>
      <ul>
        {ls.map((weekday) => (
          <li key={weekday.day}>
            <div onClick={() => setGraphVisible(weekday.id)}>
              <Weekday
                day={weekday.day}
                data={props.data}
                currentMin={weekday.currentMin}
                currentMax={weekday.currentMax}
                totalMin={totalMin}
                totalMax={totalMax}
                id={weekday.id}
              />
            </div>
          </li>
        ))}
      </ul>
      <div
        className={graphVisible != null ? "plot-window" : "plot-window-hidden"}
      >
        <Graph
          date={new Date(date.setDate(date.getDate() + graphVisible))}
          data={props.data}
          // id={graphVisible}
        />
        <button
          id="plot-close"
          className="close-button"
          onClick={() => setGraphVisible(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WeeklyWeather;

/* <div id="day0" className="weekday" onclick="generateGraph(0)">
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
          </div> */
