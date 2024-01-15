import HourlyWeather from "../currentWeather/current";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import LocationForm from "./locationForm.jsx";

// document.addEventListener("DOMContentLoaded", function () {
//   var form = document.getElementById("location-form");
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log("here");
//     // var searchValue = document.getElementById("location-input").value;

//   });
// });

// const LocationForm = () => {
//   const [formData, setFormData] = useState(null);

//   const formUpdate = (elem) => {
//     setFormData(elem.target);
//   };

//   const formSubmit = (elem) => {
//     elem.preventDefault();
//   };

//   return (
//     <form id="location-form" class="location-form">
//       <input
//         id="location-input"
//         type="text"
//         class="location-input"
//         placeholder="Enter a Location"
//         onkeypress={searchLocation()}
//       />
//       <input type="submit" class="location-search" value="&#x1F50E;&#xFE0E;" />
//     </form>
//   );
// };

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

ReactDOM.render(<LocationForm />, document.getElementById("location-form"));
