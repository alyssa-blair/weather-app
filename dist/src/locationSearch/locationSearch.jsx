import HourlyWeather from "../currentWeather/current";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import LocationForm from "./locationForm.jsx";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Dashboard from "../dashboard/dashboard.jsx";

// window.searchLocation = searchLocation;

// const LocationSearch = () => {
//   return (
//     <div>
//       <HourlyWeather data={hourlyData} />
//     </div>
//   );
// };

// export default LocationSearch;

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

// ReactDOM.createRoot(<LocationForm />, document.getElementById("location-form"));
const root = createRoot(document.getElementById("app-layout"));
root.render(<MainApp />);
