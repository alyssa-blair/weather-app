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
// document.addEventListener("DOMContentLoaded", function () {
//   var form = document.getElementById("location-form");
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log("here");
//     // var searchValue = document.getElementById("location-input").value;

//   });
// });

// function showLocation(position) {
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
// }

// const locationInput = document.getElementById("location-input");

// const apiKey = "YOUR_API_KEY";

// export function searchLocation() {
//   console.log("here");
//   const location = locationInput.value.trim();

//   fetch(
//     `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       searchSuggestions(data.predictions);
//     })
//     .catch((error) => {
//       console.error(`Error finding location: ${error}`);
//     });
// }

// function searchSuggestions(predictions) {
//   suggestions.innerHTML = "";

//   for (var prediction of predictions) {
//     const suggestion = document.createElement("div");
//     suggestion.classList.add("suggestion");
//     suggestion.textContent = prediction.description;

//     suggestion.addEventListener("click", () => selectSuggestion(prediction));
//     suggestions.appendChild(suggestion);
//   }
// }

// function selectSuggestion(prediction) {
//   fetch(
//     `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       localStorage.setItem("locationName", data.result.geometry.location);
//       localStorage.setItem("latitude", location.let);
//       localStorage.setItem("longitude", location.lng);
//     })
//     .catch((error) => {
//       console.error(`Error fetcing latitude and longitude: ${error}`);
//     });
// }

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
const root = createRoot(document.getElementById("location-form"));
root.render(<MainApp />);
