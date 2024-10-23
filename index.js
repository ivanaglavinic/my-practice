function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureNow = document.querySelector(".temperature-value");
  let temperature = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  let getEmoji = document.querySelector(".app-icon");

  cityElement.innerHTML = response.data.name;
  getEmoji.src = iconUrl;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  temperatureNow.innerHTML = `${temperature}°C`;
}

function alwaysCity(city) {
  let apiKey = "8ef4a64bf2b3f08b9f692e2febca0acb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  alwaysCity(searchInputElement.value);
}

function getForecast(city) {
  let apiKey = "8ef4a64bf2b3f08b9f692e2febca0acb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let shortDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  shortDays.forEach(function (shortDay) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${shortDay}</div>
  <div class="weather-forecast-icon">⛅</div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature"><strong>14°C</strong></div>
    <div class="weather-forecast-temperature">18°C</div>
  </div>
</div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

alwaysCity("Paris");
getForecast("Paris");
