/* Global Variables */
// Please note if country is not specified then the search works for USA as a default.
const apiKey = 'aaa38ea47b5def605e7b21575095068d';
// api call to get current weather data for one location By ZIP code
const apiBaseUrl = (zipCode, countryCode='us') => `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`;
const serverUrl = 'http://localhost:3000';
// Create a new date instance dynamically with JS
let d = () => new Date();
let newDate = () => d().getMonth()+'.'+ d().getDate()+'.'+ d().getFullYear();

/* async function to get Current weather data  */
async function getCurrentWeather (zipCode) {
    const response = await fetch(apiBaseUrl(zipCode));
    return await response.json();
}

/* async function to add data to our server */
async function addData (path, data) {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

/* async function to get latest data from our server */
async function getData () {
    const response = await fetch(`${serverUrl}/latest`);
    return await response.json();
}

/* async function to update UI */
async function updateUI() {
    getData().then((data) => {
        console.log(data);
        document.querySelector('#entryHolder #date').innerText = data.date;
        document.querySelector('#entryHolder #temp').innerText = data.temperature;
        document.querySelector('#entryHolder #content').innerText = data.userResponse;
    });
}

document.addEventListener('DOMContentLoaded', main);

function main() {
    const genButton = document.getElementById('generate');
    genButton.addEventListener('click', generate);
    function generate() {
        const userZipCode = document.getElementById('zip').value;
        const userFeelings = document.getElementById('feelings').value;
        if (!userZipCode) {
            alert('please enter a valid zip code!');
            return;
        }
        getCurrentWeather(userZipCode).then(data => {
            newData = {
                temperature: data.main.temp,
                date: newDate(),
                userResponse: userFeelings
            }
            addData(`${serverUrl}/add`, newData).then(updateUI);
        });        
    }
}