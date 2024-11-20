const submitBtn = document.querySelector('#submit');
const searchedWord = document.querySelector('#search');
const cityTitle = document.querySelector('.city-title');
const cityDate = document.querySelector('.city-date');
const localTime =  document.querySelector('.local-time');
const weatherDegree = document.querySelector('.weather-degree');
const weatherIcon = document.querySelector('#weather-icon');
const windDirection = document.querySelector('#wind-direction');
const windSpeed = document.querySelector('#wind-speed');
const airHumidity = document.querySelector('#air-humidity');
const dew = document.querySelector('#dew');

const currentDate = new Date();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = daysOfWeek[currentDate.getDay()]
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

function getLocalTime() {
   // Create a new Date object
   const currentDate = new Date();

   // Get the hours, minutes, and seconds
   let hours = currentDate.getHours();
   let minutes = currentDate.getMinutes();
   let seconds = currentDate.getSeconds();

   // Add leading zeros to minutes and seconds if they are less than 10
   minutes = minutes < 10 ? `0${minutes}` : minutes;
   seconds = seconds < 10 ? `0${seconds}` : seconds;

   // Determine AM or PM
   const ampm = hours >= 12 ? 'PM' : 'AM';

   // Convert 24-hour format to 12-hour format
   hours = hours % 12 || 12;  // If hour equals 0, set it to 12

   // Format the time
   const localTime = `${hours}:${minutes} ${ampm}`;

   return localTime;
}


async function fetchWeather(locationName) {
   try{
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?key=5TJ24EHEMB5B7V7VEBJH8H3WZ`, {mode: 'cors'});

      const weatherData = await response.json()
      const processedData = processWeatherInfo(weatherData)
      cityTitle.textContent = processedData.resolvedAddress;
      cityDate.textContent = `${today}, ${month} ${year}`;
      localTime.textContent = getLocalTime()
      weatherDegree.textContent = `${processedData.currentConditions.temp} °F`;
      weatherIcon.src = `icons/${processedData.currentConditions.icon}.png`;
      windDirection.textContent = `${processedData.currentConditions.winddir} NW`;
      windSpeed.textContent = `${processedData.currentConditions.windspeed} Km/h`;
      airHumidity.textContent = `${processedData.currentConditions.humidity} %`;
      dew.textContent = processedData.currentConditions.dew;
   } catch (error) {
      weatherDegree.textContent = error;
   }
    
}


function processWeatherInfo(data) {
   return {
      address: data.address, 
      currentConditions: data.currentConditions,
      days: data.days,
      resolvedAddress: data.resolvedAddress
   }
}

submitBtn.addEventListener('click', () => {
   event.preventDefault();
   fetchWeather(searchedWord.value)
})

fetchWeather('Nairobi');