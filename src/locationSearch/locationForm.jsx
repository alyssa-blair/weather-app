import React, { useState } from "react";

const LocationForm = () => {
  const [formData, setFormData] = useState(null);

  const formUpdate = (elem) => {
    setFormData(elem.target);
  };

  const formSubmit = (elem) => {
    elem.preventDefault();
  };

  const openDashboard = () => {
    window.location.href = `dashboard.html?lat=${encodeURIComponent(localStorage.getItem("latitude"))}&long=${encodeURIComponent(localStorage.getItem("longitude"))}`;
  };

  return (
    <form id="location-form" class="location-form">
      <input
        id="location-input"
        type="text"
        class="location-input"
        placeholder="Enter a Location"
        // onkeypress={searchLocation()}
      />
      <input
        type="submit"
        class="location-search"
        value="&#x1F50E;&#xFE0E;"
        onsubmit={openDashboard()}
      />
    </form>
  );
};

export default LocationForm;
