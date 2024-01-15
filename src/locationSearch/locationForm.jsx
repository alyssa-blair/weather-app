import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LocationForm = () => {
  // TODO: add location api and predictions for location name

  const [formData, setFormData] = useState(null);

  const formUpdate = (elem) => {
    setFormData(elem.target);
  };
  const navigate = useNavigate();

  const formSubmit = () => {
    // const latitude = encodeURIComponent(localStorage.getItem("latitude"));
    // const longitude = encodeURIComponent(localStorage.getItem("longitude"));

    navigate("/dashboard.html");
  };

  return (
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
  );
};

export default LocationForm;
