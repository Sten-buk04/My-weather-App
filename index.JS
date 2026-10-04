const getWeatherBtn = document.getElementById("get-weather-btn");
const citySelect = document.getElementById("city-select");

const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationEle = document.getElementById("location");


async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );

    if (!response.ok) {
      throw new Error("Weather data unavailable");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}


async function showWeather(city) {
  const data = await getWeather(city);

  if (data === undefined) {
    alert("Something went wrong, please try again later");
    return;
  }

  mainTemp.textContent =
    data.main?.temp !== undefined
      ?  `${data.main.temp}° C`
      : "N/A";

  feelsLike.textContent =
    data.main?.feels_like !== undefined
      ? `Feels Like: ${data.main.feels_like}° C`
      :  "Feels Like: N/A";

  humidity.textContent =
    data.main?.humidity !== undefined
       ? `Humidity: ${data.main.humidity}%`
      : "Humidity: N/A";

  wind.textContent =
    data.wind?.speed !== undefined
      ? `Wind: ${data.wind.speed} m/s`
      : "Wind: N/A";

  windGust.textContent =
    data.wind?.gust !== undefined
     ? `Wind Gust: ${data.wind.gust} m/s`
      : "Wind Gust: N/A";

  weatherMain.textContent =
    data.weather?.[0]?.main !== undefined
      ? data.weather[0].main
      : "N/A";

  locationEle.textContent =
    data.name !== undefined
      ? data.name
      : "N/A";

  weatherIcon.src =
    data.weather?.[0]?.icon !== undefined
      ? data.weather[0].icon
      : "";
}


getWeatherBtn.addEventListener("click", () => {
  const selectedCity = citySelect.value;

  if (selectedCity === "") {
    return;
  }

  showWeather(selectedCity);
});