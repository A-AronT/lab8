import React from 'react';
const apiKey : string | undefined  = process.env.REACT_APP_API_KEY

console.log(apiKey);

let lati = 0;
let long = 0;

function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    lati = position.coords.latitude;
    long = position.coords.longitude;
    });
}}

function getWeather() {
  console.log(lati, long);
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lati + '&lon=' + long + '&exclude=minutely,hourly,alerts,current&appid=' + apiKey)
  .then(res => res.json())
  .then(data => showWeather(data))
  .catch(console.error)
}

function showWeather(resp: any) {
  console.log(resp)
}

function App() {
  return (
    <div><p>hello sirs</p>
    <button onClick={getLocation}>get location</button>
    <button onClick={getWeather}>show location weather</button>
    <table></table>
    </div>
  );
}

export default App;
