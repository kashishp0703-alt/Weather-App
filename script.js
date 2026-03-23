const APIKEY = "03beb83b19f0120fbb82a945c7d8798e";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("btn");

const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");

async function checkWeather(city = "Tunisia") {
    if (!city) return;

    try {
        const res = await fetch(URL + city + `&appid=${APIKEY}`);
        const data = await res.json();

        if (data.cod !== 200) {
            alert("City not found");
            return;
        }

        cityEl.innerHTML = data.name;
        tempEl.innerHTML = Math.floor(data.main.temp) + "°C";
        humidityEl.innerHTML = data.main.humidity + "%";
        windEl.innerHTML = Math.round(data.wind.speed * 3.6) + " km/h";

    } catch (err) {
        console.error(err);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});

checkWeather();