import React, { useState } from "react";

const Weekday = (props) => {
  // const [weekdayName, setWeekdayName] = useState("");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var curRange = props.currentMax - props.currentMin;
  if (curRange == 0) curRange = 1;

  var totalRange = props.totalMax - props.totalMin;
  if (totalRange == 0) totalRange = 1;

  const sectionSize = 150 / totalRange;

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
