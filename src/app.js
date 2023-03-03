// Global variables

let windDegree = null;

// Format the date

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  return weekdays[day];
}

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

//Calculate wind direction

function convertWind(windDegree) {
  let windDirection = document.querySelector("#wind-direction");
  if (windDegree === 0) {
    windDirection.innerHTML = "north";
  } else {
    if (windDegree <= 45) {
      windDirection.innerHTML = "north-east";
    } else {
      if (windDegree <= 90) {
        windDirection.innerHTML = "east";
      } else {
        if (windDegree <= 135) {
          windDirection.innerHTML = "south-east";
        } else {
          if (windDegree <= 180) {
            windDirection.innerHTML = "south";
          } else {
            if (windDegree <= 225) {
              windDirection.innerHTML = "south-west";
            } else {
              if (windDegree <= 270) {
                windDirection.innerHTML = "west";
              } else {
                if (windDegree <= 315) {
                  windDirection.innerHTML = "north-west";
                } else {
                  if (windDegree <= 360) {
                    windDirection.innerHTML = "north";
                  } else {
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

//Function to display the weather

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#change-city-field").value = null;
  document.querySelector("#date").innerHTML =
    formatDay(response.data.time) + ", " + formatTime(response.data.time);

  document
    .querySelector("#icon-today")
    .setAttribute("src", `images/${response.data.condition.icon}.png`);

  document.querySelector("#current-unit").innerHTML = "C";

  windDegree = Math.round(response.data.wind.degree);
  convertWind(windDegree);
  getForecast(response.data.city);
}

//Function to call the forecast api

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?`;
  let apiKey = `f552o2btc343e2d6edd4e830ffa6cab0`;
  let unit = "metric";
  axios
    .get(`${apiUrl}query=${city}&key=${apiKey}&units=${unit}`)
    .then(displayForecast);
}

//Function to display the forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `     <div class="col">
            <div class="card">
              <div class="card-header">${formatDay(forecastDay.time)}</div>
              <div class="card-body">
                <img
                  class="forecast"
                  src="images/${forecastDay.condition.icon}.png"
                  alt="sun & cloud"
                />
                <img
                  class="temp-forecast"
                  src="images/temp_high.png"
                  alt="max temperature"
                />
                ${Math.round(forecastDay.temperature.maximum)}°C
                <img
                  class="temp-forecast"
                  src="images/temp_low.png"
                  alt="min temperature"
                />
                ${Math.round(forecastDay.temperature.minimum)}°C
              </div>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

//Search Engine

function searchCity(city) {
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  let apiKey = "f552o2btc343e2d6edd4e830ffa6cab0";
  let unit = "metric";
  axios
    .get(`${apiUrl}query=${city}&key=${apiKey}&units=${unit}`)
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
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  let apiKey = "f552o2btc343e2d6edd4e830ffa6cab0";
  let unit = "metric";
  axios
    .get(
      `${apiUrl}lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${unit}`
    )
    .then(displayWeather);
}

document
  .querySelector("button.locate")
  .addEventListener("click", getCurrentLocation);
