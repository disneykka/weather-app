let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hours = date.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = `${day} ${hours}:${minutes}`;

let elementDate = document.querySelector("#today");
elementDate.innerHTML = currentDate;

function searchLocation(position) {
  let apiKey = "149c6eff9388fbb2c2cbb95d16a022be";
  let units = "metric";
  let apiResponse = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiResponse).then(showTemp);
}
function showTemp(response) {
  let userTemp = Math.round(response.data.main.temperature);
  document.querySelector(".cardbody_name_city").innerHTML = response.data.name;
  document.querySelector(
    "#cardbody_temperature_current"
  ).innerHTML = `${userTemp}`;
}

function searchCity(city) {
  let apiKey = "149c6eff9388fbb2c2cbb95d16a022be";
  let units = "metric";
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiCity).then(showTemp);
}

function inputCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-city").value;
  searchCity(citySearch);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", inputCity);

let currentLocationButton = document.querySelector("#current-location-button");
form.addEventListener("click", getLocation);

searchCity("Amsterdam");
