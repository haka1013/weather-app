//Function to display the temperature

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#change-city-field").value = null;
}

//Search Engine

function searchCity(city) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let unit = "metric";
  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=${unit}`)
    .then(displayWeather);
}

//Handle the Submit Button

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-field").value;
  searchCity(cityInput);
}

//Search Form Event

let searchForm = document.querySelector("#change-city-form");
searchForm.addEventListener("submit", handleSubmit);

//Display weather when loading

searchCity("Newquay");

//Current Positon button

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let unit = "metric";
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    )
    .then(displayWeather);
}

document
  .querySelector("button.locate")
  .addEventListener("click", getCurrentLocation);

//Display current time

let now = new Date();

//Time in UTC

let currentHours = now.getUTCHours();
let currentMinutes = now.getUTCMinutes();
let time = document.querySelector("#time");

if (currentMinutes < 10) {
  time.innerHTML = `${currentHours}:0${currentMinutes}`;
} else {
  time.innerHTML = `${currentHours}:${currentMinutes}`;
}

//Day in UTC

let day = document.querySelector("#day");
let currentDay = now.getUTCDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

day.innerHTML = weekDays[currentDay];

//Conversion to Fahrenheit (prior week)

function changeToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 46;
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.classList.add("current-unit");
  celsius.classList.remove("current-unit");
}

function changeToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 8;
  let celsius = document.querySelector("#celsius-link");
  celsius.classList.add("current-unit");
  fahrenheit.classList.remove("current-unit");
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit);
