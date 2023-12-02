
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('location-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var searchValue = document.getElementById('location-input').value;
        window.location.href = 'dashboard.html?loc=' + encodeURIComponent(searchValue);
    });
});

function showLocation(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
}
var useCurrentLocation = false;
if (useCurrentLocation)
    navigator.geolocation.getCurrentPosition(showLocation);