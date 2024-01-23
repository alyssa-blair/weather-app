import React, { useState } from "react";
import { formatDate } from "../dashboard/dateFormat.jsx";

// export function fillWeekdays(data, graphDate = null) {
//   // var date = new Date();
//   // var nextDay = date.getDay();

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

// function getMinMaxTemps(data, day) {
//   const temps = data.hourly.temperature_2m;
//   const times = data.hourly.time;

//   var date = new Date();
//   date = new Date(date.setDate(date.getDate() + day));
//   const dateFormatted = formatDate(date, 0);
//   const searchDate = dateFormatted.substring(0, 10);

//   const startIndex = times.indexOf(searchDate + "T00:00");

//   var min;
//   var max;

//   for (var i = startIndex; i < startIndex + 24; i++) {
//     if (times[i].startsWith(searchDate)) {
//       if (!min || temps[i] < min) min = Math.round(temps[i]);

//       if (!max || temps[i] > max) max = Math.round(temps[i]);
//     }
//   }

//   return [min, max];
// }

function fillWeekdayBars(mins, maxs) {
  var min = Math.min.apply(null, mins);
  var max = Math.max.apply(null, maxs);

  const range = max - min != 0 ? max - min : 1;
  const sectionSize = 150 / range;

  for (var i = 0; i < 7; i++) {
    var elem = document.getElementById(`range${i}`);
    var curMin = mins[i];
    var curMax = maxs[i];

    var curRange = curMax - curMin;
    if (curRange == 0) curRange = 1;

    elem.style.width = `${curRange * sectionSize}px`;
    elem.style.left = `${(curMin - min) * sectionSize}px`;
  }
}

const Weekday = (props) => {
  const [weekdayName, setWeekdayName] = useState("");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log(props);
  // const minmax = getMinMaxTemps(props.data, props.day);
  // var [min, max] = minmax;

  // console.log(min, max);

  //   const setWeekday = () => {
  //     return setWeekdayName(days[props.day]);
  //   };

  // fillWeekdayBars(props.currentMin, props.currentMax);

  var curRange = props.currentMax - props.currentMin;
  if (curRange == 0) curRange = 1;

  var totalRange = props.totalMax - props.totalMin;
  if (totalRange == 0) totalRange = 1;

  const sectionSize = 150 / totalRange;

  // elem.style.width = `${curRange * sectionSize}px`;
  // elem.style.left = `${(curMin - min) * sectionSize}px`;
  return (
    <div
      id={`day${props.day}`}
      key={`day${props.day}`}
      className="weekday"
      //   onclick={generateGraph(props.day)}
    >
      <h2 className="weekday-date">
        {props.id == 0 ? "Today" : days[props.day]}
      </h2>
      <div className="weekday-info">
        <h3 className="min-temp" id={`minTemp${props.day}`}>
          {props.currentMin + "\u00B0"}
        </h3>
        <div className="temperature-bar">
          <span
            id={`range${props.day}`}
            style={{
              width: `${curRange * sectionSize}px`,
              left: `${(props.currentMin - props.totalMin) * sectionSize}px`,
            }}
          ></span>
        </div>
        <h3 className="max-temp" id={`maxTemp${props.day}`}>
          {props.currentMax + "\u00B0"}
        </h3>
      </div>
    </div>
  );
};

export default Weekday;
