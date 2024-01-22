import React, { useState } from "react";

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

  //   const setWeekday = () => {
  //     return setWeekdayName(days[props.dayNum]);
  //   };

  return (
    <div
      id={`day${props.dayNum}`}
      key={`day${props.dayNum}`}
      className="weekday"
      //   onclick={generateGraph(props.dayNum)}
    >
      <h2 className="weekday-date">{days[props.dayNum]}</h2>
      <div className="weekday-info">
        <h3 className="min-temp" id={`minTemp${props.dayNum}`}></h3>
        <div className="temperature-bar">
          <span id={`range${props.dayNum}`}></span>
        </div>
        <h3 className="max-temp" id={`maxTemp${props.dayNum}`}></h3>
      </div>
    </div>
  );
};

export default Weekday;
