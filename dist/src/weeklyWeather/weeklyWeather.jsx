import { formatDate } from "../dashboard/dateFormat.js";
import {
  currentWeatherBreakdown,
  currentWeatherTemp,
} from "../currentWeather/current.js";
import { createGraph } from "./graph.js";
import Weekday from "./weekday.jsx";
import React from "react";

// export function fillWeekdays(data, graphDate = null) {
//   var date = new Date();
//   var nextDay = date.getDay();

//   const temps = data.hourly.temperature_2m;
//   const times = data.hourly.time;

//   var nextDayFull = date;
//   var mins = [];
//   var maxs = [];

//   for (var i = 0; i < 7; i++) {
//     // plot window is open, create the graph
//     if (i == graphDate) {
//       createGraph(nextDayFull, times, temps);
//       return;
//     }

//     // set the date string
//     if (i != 0) {
//       nextDay = (nextDay + 1) % 7;
//       setWeekday(i, nextDay);
//     }

//     // get the min and max temperatures
//     var range = setMinMaxTemp(i, nextDayFull, times, temps);
//     mins.push(range[0]);
//     maxs.push(range[1]);
//     nextDayFull = new Date(date.setDate(date.getDate() + 1));
//   }

//   // fill the min-max bars and the current temperature for each weekday
//   fillWeekdayBars(mins, maxs);
//   currentWeatherTemp(data);
//   currentWeatherBreakdown(data, temps, times);
// }

// function setWeekday(i, day) {
//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const elemDate = document.querySelector(`#day${i} > h2`);
//   elemDate.innerHTML = days[day];
// }

// function fillWeekdayBars(mins, maxs) {
//   var min = Math.min.apply(null, mins);
//   var max = Math.max.apply(null, maxs);

//   const range = max - min != 0 ? max - min : 1;
//   const sectionSize = 150 / range;

//   for (var i = 0; i < 7; i++) {
//     var elem = document.getElementById(`range${i}`);
//     var curMin = mins[i];
//     var curMax = maxs[i];

//     var curRange = curMax - curMin;
//     if (curRange == 0) curRange = 1;

//     elem.style.width = `${curRange * sectionSize}px`;
//     elem.style.left = `${(curMin - min) * sectionSize}px`;
//   }
// }

// function setMinMaxTemp(dateIndex, date, times, temps) {
//   const nextDayFormatted = formatDate(date, 0);
//   const searchDate = nextDayFormatted.substring(0, 10);

//   var min;
//   var max;

//   const start = times.indexOf(searchDate + "T00:00");
//   for (var i = start; i < start + 24; i++) {
//     if (times[i].startsWith(searchDate)) {
//       if (!min || temps[i] < min) min = Math.round(temps[i]);

//       if (!max || temps[i] > max) max = Math.round(temps[i]);
//     }
//   }

//   const minTemp = document.querySelector(
//     `#day${dateIndex} > div > #minTemp${dateIndex}`
//   );
//   const maxTemp = document.querySelector(
//     `#day${dateIndex} > div > #maxTemp${dateIndex}`
//   );

//   minTemp.innerHTML = min + "\u00B0";
//   maxTemp.innerHTML = max + "\u00B0";
//   return [min, max];
// }

const WeeklyWeather = () => {
  const dayNums = [0, 1, 2, 3, 4, 5, 6]; // update to be in relation to today

  const ls = [];

  dayNums.forEach((dayNum) => {
    ls.push(<Weekday dayNum={dayNum} />);
  });

  return (
    <div id="weekly-weather" className="weekly-weather">
      <h1>7-day forecast</h1>
      <ul>
        {ls.map((weekday) => (
          <li key={weekday.props.dayNum}>{weekday}</li>
        ))}
      </ul>
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
