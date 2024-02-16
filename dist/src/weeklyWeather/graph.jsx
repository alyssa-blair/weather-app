import { formatDate } from "../dashboard/dateFormat.jsx";
import React from "react";
import Plot from "react-plotly.js";

const Graph = (props) => {
  const times = props.data.hourly.time;
  const temps = props.data.hourly.temperature_2m;

  const nextDayFormatted = formatDate(props.date);
  const searchDate = nextDayFormatted.substring(0, 10);

  const start = times.indexOf(searchDate + "T00:00");

  const graphData = [
    {
      x: times.slice(start, start + 24),
      y: temps.slice(start, start + 24),
      mode: "lines",
      type: "scatter",
      line: { shape: "spline" },
    },
  ];

  const layout = {
    title: {
      text: `Weather on ${props.date.toDateString()}`,
      font: {
        family: "Segoe UI",
        size: 18,
        color: "#afafaf",
      },
    },
    xaxis: {
      title: {
        text: "Time",
        font: {
          family: "Segoe UI",
          size: 18,
          color: "#afafaf",
        },
      },
      tickfont: {
        color: "#afafaf",
      },
    },
    yaxis: {
      title: {
        text: "Temperature in Degrees",
        font: {
          family: "Segoe UI",
          size: 18,
          color: "#afafaf",
        },
      },
      tickfont: {
        color: "#afafaf",
      },
    },
    plot_bgcolor: "#0c2143",
    paper_bgcolor: "#0c2143",
    border_radius: "20px",
  };

  return <Plot data={graphData} layout={layout} />;
};

export default Graph;
