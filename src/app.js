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
  console.log(response.data);

  temperatureElement.innerHTML = currentTemperature;
  cityName.innerHTML = response.data.city;
  descriptionElement.innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
  windElement.innerHTML = `${response.data.wind.speed}%`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  pressureElement.innerHTML = `${response.data.temperature.pressure}hPa`;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Montréal");
