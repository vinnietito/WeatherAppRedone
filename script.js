const submitBtn = document.querySelector('#submit');
const searchedWord = document.querySelector('#search');
const cityTitle = document.querySelector('.city-title');
const cityDate = document.querySelector('.city-date');
const localTime = document.querySelector('.local-time');
const weatherDegree = document.querySelector('.weather-degree');
const weatherIcon = document.querySelector('#weather-icon');
const windDirection = document.querySelector('#wind-direction');
const windSpeed = document.querySelector('#wind-speed');
const airHumidity = document.querySelector('#air-humidity');
const dew = document.querySelector('#dew');

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDate = new Date();
const today = daysOfWeek[currentDate.getDay()];
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

function getLocalTime() {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

async function fetchWeather(locationName = 'Kenya') {
    try {
        // Use "unitGroup=metric" to get temperatures in Celsius
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=metric&key=5TJ24EHEMB5B7V7VEBJH8H3WZ`, { mode: 'cors' });

        if (!response.ok) throw new Error(`Location "${locationName}" not found`);

        const weatherData = await response.json();
        const processedData = processWeatherInfo(weatherData);

        // Update UI with weather data in Celsius
        cityTitle.textContent = processedData.resolvedAddress;
        cityDate.textContent = `${today}, ${month}/${currentDate.getDate()}/${year}`;
        localTime.textContent = getLocalTime();
        weatherDegree.textContent = `${processedData.currentConditions.temp.toFixed(1)} °C`; // Display temp in Celsius
        weatherIcon.src = `icons/${processedData.currentConditions.icon}.png`;
        windDirection.textContent = `${processedData.currentConditions.winddir}°`;
        windSpeed.textContent = `${processedData.currentConditions.windspeed} Km/h`;
        airHumidity.textContent = `${processedData.currentConditions.humidity}%`;
        dew.textContent = `${processedData.currentConditions.dew} °C`;
    } catch (error) {
        // Display error in the UI
        cityTitle.textContent = 'Error';
        weatherDegree.textContent = error.message || 'An unexpected error occurred.';
    }
}

function processWeatherInfo(data) {
    return {
        resolvedAddress: data.resolvedAddress,
        currentConditions: data.currentConditions,
    };
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    const location = searchedWord.value.trim();
    fetchWeather(location || 'Kenya'); // Default to "Kenya" if input is empty
});

// Fetch default weather for Kenya on page load
fetchWeather();
