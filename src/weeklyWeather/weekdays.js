import { formatDate } from "../dashboard/dateFormat.js";
import {
  currentWeatherBreakdown,
  currentWeatherTemp,
} from "../currentWeather/current.js";
import { createGraph } from "./graph.js";

export function fillWeekdays(data, graphDate = null) {
  var date = new Date();
  var nextDay = date.getDay();

  const temps = data.hourly.temperature_2m;
  const times = data.hourly.time;

  var nextDayFull = date;
  var mins = [];
  var maxs = [];

  for (var i = 0; i < 7; i++) {
    // plot window is open, create the graph
    if (i == graphDate) {
      createGraph(nextDayFull, times, temps);
      return;
    }

    // set the date string
    if (i != 0) {
      nextDay = (nextDay + 1) % 7;
      setWeekday(i, nextDay);
    }

    // get the min and max temperatures
    var range = setMinMaxTemp(i, nextDayFull, times, temps);
    mins.push(range[0]);
    maxs.push(range[1]);
    nextDayFull = new Date(date.setDate(date.getDate() + 1));
  }

  // fill the min-max bars and the current temperature for each weekday
  fillWeekdayBars(mins, maxs);
  currentWeatherTemp(data);
  currentWeatherBreakdown(data, temps, times);
}

function setWeekday(i, day) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const elemDate = document.querySelector(`#day${i} > h2`);
  elemDate.innerHTML = days[day];
}

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

function setMinMaxTemp(dateIndex, date, times, temps) {
  const nextDayFormatted = formatDate(date, 0);
  const searchDate = nextDayFormatted.substring(0, 10);

  var min;
  var max;

  const start = times.indexOf(searchDate + "T00:00");
  for (var i = start; i < start + 24; i++) {
    if (times[i].startsWith(searchDate)) {
      if (!min || temps[i] < min) min = Math.round(temps[i]);

      if (!max || temps[i] > max) max = Math.round(temps[i]);
    }
  }

  const minTemp = document.querySelector(
    `#day${dateIndex} > div > #minTemp${dateIndex}`
  );
  const maxTemp = document.querySelector(
    `#day${dateIndex} > div > #maxTemp${dateIndex}`
  );

  minTemp.innerHTML = min + "\u00B0";
  maxTemp.innerHTML = max + "\u00B0";
  return [min, max];
}
