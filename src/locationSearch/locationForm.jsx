import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LocationForm = () => {
  // TODO: add location api and predictions for location name

  const [formData, setFormData] = useState(null);

  // const formUpdate = (elem) => {
  //   setFormData(elem.target);
  // };
  const navigate = useNavigate();

  const formSubmit = async (elem) => {
    // const latitude = encodeURIComponent(localStorage.getItem("latitude"));
    // const longitude = encodeURIComponent(localStorage.getItem("longitude"));
    elem.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form id="location-form" className="location-form" onSubmit={formSubmit}>
        <input
          id="location-input"
          type="text"
          className="location-input"
          placeholder="Enter a Location"
          // onkeypress={searchLocation()}
        />
        <input
          type="submit"
          className="location-search"
          value="&#x1F50E;&#xFE0E;"
        />
      </form>
    </div>
  );
};

/** <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, viewport-fit=cover"
    />
    <title>Weather App Home Page</title>
    <link rel="stylesheet" href="index.css" type="text/css" />
  </head>
  <body>
    <h1>Weather App</h1>

    <!-- <form id="location-form" class="location-form">
      <input
        id="location-input"
        type="text"
        class="location-input"
        placeholder="Enter a Location"
      />

      onkeypress="searchLocation()"

      <input type="submit" class="location-search" value="&#x1F50E;&#xFE0E;" />
    </form> -->
    <div id="location-form"></div>

    <script
      type="text/jsx"
      src="src/locationSearch/locationSearch.jsx"
    ></script>
  </body>
</html>
 */

export default LocationForm;
