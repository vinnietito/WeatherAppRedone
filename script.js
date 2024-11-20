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

function getLocalTime() {
    // Create a new Date Object
    const currentDate =  new Date();

    // Get the hours, minutes and seconds
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    //Adding leading zero to minutes and seconds if they are less than 10
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // Determine AM or PM
    const ampm = hours >=12 ? 'PM' : 'AM';

    //Convert 24-hour format ro 12 hour format
    hours = hours % 12 || 12; //If hour equals 0, set it to 12

    //Format the time
    const localTime = `${hours}:${minutes} ${ampm}`;

    return localTime;
}