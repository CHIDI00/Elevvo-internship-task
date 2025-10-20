const API_KEY = "28ee037282ef39113a8daf0f7807a2f2";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

const citySearch = document.getElementById("citySearch");
const searchBtn = document.getElementById("searchBtn"); // optional button (if present)
const loading = document.getElementById("loading");
const weatherContent = document.getElementById("weatherContent");
const errorMessage = document.getElementById("errorMessage");
const themeToggle = document.getElementById("themeToggle");
const forecastCards = document.getElementById("forecastCards");
const citiesList = document.getElementById("citiesList");

// default cities
const defaultCities = [
  "Lagos",
  "Beijing",
  "Tokyo",
  "Brasilia",
  "Berlin",
  "Canberra",
];

// Background images for weather condition
const weatherBackgrounds = {
  Clear: "./asset/clear.jpg",
  Clouds: "./asset/cloud.jpg",
  Rain: "./asset/rain.jpg",
  Drizzle: "./asset/drizzly.jpg",
  Thunderstorm: "./asset/storm2.jpg",
  Snow: "./asset/snowy.jpg",
  Mist: "./asset/mist.jpg",
  Fog: "./asset/fog.jpg",
  Haze: "./asset/haze.jpg",
  Smoke: "./asset/smoke2.jpg",
  Dust: "./asset/dust.jpeg",
  Sand: "./asset/sand.jpg",
  Default: "./asset/clear.jpg",
};

document.addEventListener("DOMContentLoaded", () => {
  setBackgroundByKey("Default");
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const lastCity = localStorage.getItem("lastCity") || "Lagos";
  fetchWeatherData(lastCity);

  loadOtherCities();
}

// Event Listeners
function setupEventListeners() {
  citySearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const city = citySearch.value.trim();
      if (!city) return;
      fetchWeatherData(city);
      citySearch.value = "";
    }
  });

  // Darkmode toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Tabs (Today / Week)
  document.querySelectorAll(".tab-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      const tab = e.target.dataset.tab;
      const city = localStorage.getItem("lastCity") || "Lagos";
      tab === "week" ? fetchForecastData(city) : fetchWeatherData(city);
    })
  );
}

async function fetchWeatherData(city) {
  try {
    showLoading();
    hideError();

    const response = await fetch(
      `${API_BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      if (response.status === 404) throw new Error("City not found");
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    displayWeatherData(data);
    fetchHourlyForecast(city);
    localStorage.setItem("lastCity", city);
  } catch (error) {
    console.error(error);
    showError(
      error.message === "City not found"
        ? "City not found. Please try again."
        : "Unable to fetch weather. Check your connection"
    );
  } finally {
    hideLoading();
  }
}

async function fetchHourlyForecast(city) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/forecast?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Forecast unavailable");

    const data = await response.json();
    displayHourlyForecast(data);
  } catch (error) {
    console.error("Error loading hourly forecast:", error);
  }
}

async function fetchForecastData(city) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/forecast?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Weekly forecast unavailable");

    const data = await response.json();
    displayWeeklyForecast(data);
  } catch (error) {
    console.error("Error loading weekly forecast:", error);
  }
}

function displayWeatherData(data) {
  const mainCondition =
    data.weather && data.weather[0] && data.weather[0].main
      ? data.weather[0].main
      : "Default";
  // update background based on weather condition
  setBackgroundByKey(mainCondition);

  document.getElementById(
    "cityName"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("currentTime").textContent = getCurrentTime();
  document.getElementById("temp").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("weatherMain").textContent = data.weather[0].main;
  document.getElementById("feelsLike").textContent = `Feels like ${Math.round(
    data.main.feels_like
  )}°C`;
  document.getElementById("weatherDetails").textContent =
    getWeatherDescription(data);

  // overview
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `${Math.round(
    data.wind.speed * 3.6
  )} km/h`;
  document.getElementById("visibility").textContent = `${(
    data.visibility / 1000
  ).toFixed(1)} km`;

  weatherContent.classList.remove("hidden");
  weatherContent.classList.add("fade-in");
}

function displayHourlyForecast(data) {
  const hourlyData = data.list.slice(0, 4);
  forecastCards.innerHTML = hourlyData
    .map((item) => {
      const time = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: false,
      });
      const temp = Math.round(item.main.temp);
      const icon = getWeatherIcon(item.weather[0].main);
      return `
        <div class="forecast-item fade-in">
          <span class="time">${time}:00</span>
          <span class="icon">${icon}</span>
          <span class="temp">${temp}°C</span>
        </div>`;
    })
    .join("");
}

function displayWeeklyForecast(data) {
  const dailyData = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);
  forecastCards.innerHTML = dailyData
    .map((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const temp = Math.round(item.main.temp);
      const icon = getWeatherIcon(item.weather[0].main);
      return `
        <div class="forecast-item fade-in">
          <span class="time">${day}</span>
          <span class="icon">${icon}</span>
          <span class="temp">${temp}°C</span>
        </div>`;
    })
    .join("");
}

// Other Cities
async function loadOtherCities() {
  citiesList.innerHTML = "";

  for (const city of defaultCities) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) continue;
      const data = await response.json();
      citiesList.innerHTML += createCityCard(data);
    } catch (error) {
      console.error(`Error loading ${city}:`, error);
    }
  }

  citiesList.querySelectorAll(".city-card").forEach((card) =>
    card.addEventListener("click", () => {
      fetchWeatherData(card.dataset.city);
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
  );
}

function createCityCard(data) {
  const icon = getWeatherIcon(data.weather[0].main);
  return `
    <div class="city-card fade-in" data-city="${data.name}">
      <div class="country">${data.sys.country}</div>
      <div class="city-name">${data.name}</div>
      <div class="condition">${data.weather[0].main}</div>
      <div class="city-temp">${Math.round(data.main.temp)}°C ${icon}</div>
    </div>`;
}

function getWeatherIcon(condition) {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "🌫️",
    Haze: "🌫️",
    Dust: "🌫️",
    Fog: "🌫️",
    Sand: "🌫️",
    Ash: "🌫️",
    Squall: "💨",
    Tornado: "🌪️",
  };
  return icons[condition] || "🌤️";
}

function getWeatherDescription({ main, weather, wind }) {
  const { temp, humidity } = main;
  const windSpeed = wind.speed;
  const condition = weather[0].main;

  const windDesc =
    windSpeed < 3
      ? "Light winds"
      : windSpeed < 7
      ? "Moderate winds"
      : "Strong winds";
  const tempDesc = temp > 25 ? "warm" : temp > 15 ? "pleasant" : "cool";
  const timeOfDay = new Date().getHours() < 12 ? "morning" : "day";
  const skyDesc = /Rain/i.test(condition)
    ? "Rain expected."
    : /Cloud/i.test(condition)
    ? "Cloudy skies."
    : "Clear skies.";
  const humidityDesc =
    humidity > 70 ? "Humidity remains high." : "Comfortable humidity.";

  return `${windDesc} and a ${tempDesc} ${timeOfDay}. ${skyDesc} ${humidityDesc}`;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function showLoading() {
  loading.classList.remove("hidden");
  weatherContent.classList.add("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(msg = "Something went wrong!") {
  if (errorMessage) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove("hidden");
    setTimeout(() => errorMessage.classList.add("hidden"), 3000);
  } else {
    alert(msg);
  }
}

function hideError() {
  if (errorMessage) errorMessage.classList.add("hidden");
}

// auto-update time every minute
setInterval(() => {
  const timeElement = document.getElementById("currentTime");
  if (timeElement) timeElement.textContent = getCurrentTime();
}, 60000);

function setBackgroundByKey(key) {
  const normalized = normalizeWeatherKey(key);
  const url = weatherBackgrounds[normalized] || weatherBackgrounds["Default"];

  document.documentElement.style.setProperty("--bg-image", `url("${url}")`);

  document.body.style.backgroundImage = `url("${url}")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  document.body.style.transition = "background-image 1s ease-in-out";
}

// few names to match the backgrounds map
function normalizeWeatherKey(key) {
  if (!key) return "Default";
  const k = String(key).toLowerCase();
  if (k.includes("clear")) return "Clear";
  if (k.includes("cloud")) return "Clouds";
  if (k.includes("rain")) return "Rain";
  if (k.includes("drizzle")) return "Drizzle";
  if (k.includes("snow")) return "Snow";
  if (k.includes("thunder")) return "Thunderstorm";
  if (["mist", "fog", "haze", "smoke"].some((s) => k.includes(s))) {
    if (k.includes("mist")) return "Mist";
    if (k.includes("fog")) return "Fog";
    if (k.includes("haze")) return "Haze";
    if (k.includes("smoke")) return "Smoke";
    return "Mist";
  }
  if (k.includes("dust") || k.includes("sand") || k.includes("ash"))
    return "Dust";
  return "Default";
}
