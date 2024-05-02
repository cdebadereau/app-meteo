function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityName = document.querySelector("#weather-app-city");
  cityName.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);
