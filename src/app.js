function refreshWeather(response) {
  let temperatureElement = document.querySelector(
    "#weather-app-temperature-value"
  );
  let currentTemperature = Math.round(response.data.temperature.current);
  let cityName = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#weather-app-description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img
              src="${response.data.condition.icon_url}"
              class="weather-app-icon"
            />`;

  temperatureElement.innerHTML = currentTemperature;
  cityName.innerHTML = response.data.city;
  descriptionElement.innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
  windElement.innerHTML = `${response.data.wind.speed}%`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  pressureElement.innerHTML = `${response.data.temperature.pressure}hPa`;
  currentTime.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "96668c3bo8171924ab023b1atd05c04f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "96668c3bo8171924ab023b1atd05c04f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temperatures">
          <div class="forecast-temperature-max">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="forecast-temperature-min">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Montréal");
