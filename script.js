const apiKey = "95db7735bec9873c7a037dbfab3ed276";
const locationInput = document.getElementById("locationInput");
const locationName = document.getElementById("locationName");
const temp = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const bottom = document.getElementById("bottom");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weatherDescription");

// localStorage for saved location
window.addEventListener("load", () => {
  const savedLocation = localStorage.getItem("location");
  if (savedLocation) {
    fetchWeatherData(savedLocation);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date();
  const dayString = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
  });
  const dateString = currentDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("daySpan").textContent = dayString;
  document.getElementById("dateSpan").textContent = dateString;
});

locationInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const location = locationInput.value;
    localStorage.setItem("location", location); // Save location to localStorage
    fetchWeatherData(location);

    locationInput.value = "";
  }
});

function fetchWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })

    .then((data) => {
      locationName.textContent = data.name;
      if (data.main) {
        temp.textContent = `${(((data.main.temp - 32) * 5) / 9).toFixed(1)}°C`;
        feelsLike.textContent = `${(
          ((data.main.feels_like - 32) * 5) /
          9
        ).toFixed(1)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
      }
      if (data.weather) {
        weatherDescription.textContent = data.weather[0].main;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      }
      if (data.wind) {
        windSpeed.textContent = `${data.wind.speed.toFixed()} MPH`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("City not found. Please enter a valid city name.");
    });
}
