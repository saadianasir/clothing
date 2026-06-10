const API_KEY = "";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function loadWeather(city) {
    if (!city || !city.trim()) {
        throw new Error("City name is required");
    }

    const url = `${BASE_URL}?q=${encodeURIComponent(city.trim())}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 404) {
            throw new Error("City not found");
        }
        throw new Error(errorData.message || `Weather request failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: `${Math.round(data.wind.speed * 3.6)} km/h`,
    };
}

export function initWeather() {
    const form = document.getElementById("weather-form");
    const cityInput = document.getElementById("weather-city");
    const container = document.getElementById("weather-content");

    function render(data) {
        const { city, temperature, condition, humidity, wind } = data;
        container.innerHTML = `
            <div class="weather-info">
                <p class="weather-city">${city}</p>
                <p class="weather-temp">${temperature}°C</p>
                <p class="weather-condition">${condition}</p>
                <div class="weather-details">
                    <span>Humidity: ${humidity}%</span>
                    <span>Wind: ${wind}</span>
                </div>
            </div>
        `;
    }

    function showError(message) {
        container.innerHTML = `<p class="weather-error">${message}</p>`;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            if (!API_KEY) {
                showError("OpenWeather API key not configured");
                return;
            }
            const data = await loadWeather(city);
            render(data);
        } catch (error) {
            showError(error.message);
        }
    });
}
