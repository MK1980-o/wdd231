const API_KEY = 'a5ef9f1f27774723dc444e3ccbd4bf60';
const CITY = 'Harare,ZW';

// Load current weather
async function loadCurrent() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  document.getElementById("currentWeather").innerHTML = `
    <strong>${Math.round(data.main.temp)}°C</strong> — ${data.weather[0].description}
    <div style="font-size:0.9rem;color:var(--muted)">
      Feels like ${Math.round(data.main.feels_like)}°C | Humidity ${data.main.humidity}%
    </div>
  `;
}

// Load 3-day forecast using free 5-day API
async function loadForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  // pick one forecast per day (12:00)
  const dailyMap = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (item.dt_txt.includes("12:00:00")) {
      dailyMap[date] = item;
    }
  });

  const days = Object.keys(dailyMap).slice(0, 3);

  days.forEach(date => {
    const item = dailyMap[date];
    const dt = new Date(item.dt_txt);
    const label = dt.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    const box = document.createElement("div");
    box.style.minWidth = "110px";
    box.style.padding = "8px";
    box.style.borderRadius = "8px";
    box.style.background = "#fff";
    box.style.boxShadow = "0 1px 2px rgba(2,6,23,0.04)";

    box.innerHTML = `
      <div style="font-weight:600">${label}</div>
      <div style="font-size:0.95rem">${Math.round(item.main.temp)}°C</div>
      <div style="font-size:0.85rem;color:var(--muted)">
        ${item.weather[0].main}
      </div>
    `;

    forecastDiv.appendChild(box);
  });
}

loadCurrent();
loadForecast();
