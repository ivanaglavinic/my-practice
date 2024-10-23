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

  getForecast(response.data.name);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "8ef4a64bf2b3f08b9f692e2febca0acb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.list);

  let forecasticonCode =
    response.data.list[(5, 13, 21, 29, 37)].weather[0].icon;
  let forecasticonUrl = `http://openweathermap.org/img/wn/${forecasticonCode}@2x.png`;
  let forecastHtml = "";
  response.data.list.forEach(function (shortDay, index) {
    if (
      index === 5 ||
      index === 13 ||
      index === 21 ||
      index === 29 ||
      index === 37
    ) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(shortDay.dt)}</div>
  <img src= "${forecasticonUrl}" class="weather-forecast-icon"/>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature"><strong>${Math.round(
      shortDay.main.temp_max
    )}°</strong></div>
    <div class="weather-forecast-temperature">${Math.round(
      shortDay.main.temp_min
    )}°</div>
  </div>
</div>
`;
    }
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
