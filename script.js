const submitBtn = document.querySelector('#submit');
const searchedWord = document.querySelector('#search');
const cityTitle = document.querySelector('.city-title');
const cityDate = document.querySelector('.city-date');
const localTime = document.querySelector('.local-time');
const weatherDegree = document.querySelector('.weather-degree');
const weatherIcon = document.querySelector('#weather-icon');
const windDirection = document.querySelector('#wind-direction');
const windspeed = document.querySelector('#wind-speed');
const airHumidty = documen.querySelector('#air-humidity');
const dew = document.querySelector('#dew');

const currentDate = new Date();
const  dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = dayOfWeek[currentDate.getDay()]
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();