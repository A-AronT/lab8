import React, { useState } from 'react';
import './App.css';
const apiKey: string | undefined = process.env.REACT_APP_API_KEY

console.log(apiKey);



function App() {

  let lati = 0;
  let long = 0;
  let [weatherData, setWeatherData]: any = useState([]);

  let getLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        lati = position.coords.latitude;
        long = position.coords.longitude;
      }, () => { alert("User location is required for this app to function") });
    }
  }

  let getWeather = function () {
    console.log(lati, long);
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lati + '&lon=' + long + '&units=metric&exclude=minutely,hourly,alerts,current&appid=' + apiKey)
      .then(res => res.json())
      .then(data => setWeatherData(data))
      .catch(console.error)
  }

  let showTemp = function (index: number) {
    if (weatherData.daily !== undefined && weatherData.daily.length > 0) {
      return weatherData.daily[index].temp.day;
    }
  }

  let showWeather = function (index: number) {
    if (weatherData.daily !== undefined && weatherData.daily.length > 0) {
      return weatherData.daily[index].weather[0].main;
    }
  }
  console.log(weatherData)

  return (
    <div><p>hello sirs</p>
      <button onClick={getLocation}>get location</button>
      <button onClick={getWeather}>show location weather</button>
      <table>
        <tbody>
          <tr>
            <th>Day</th>
            <th>Temp</th>
            <th>Weather</th>
          </tr>
          <tr>
            <td>Day 1</td>
            <td>{showTemp(0)}</td>
            <td>{showWeather(0)}</td>
          </tr>
          <tr>
            <td>Day 2</td>
            <td>{showTemp(1)}</td>
            <td>{showWeather(1)}</td>
          </tr>
          <tr>
            <td>Day 3</td>
            <td>{showTemp(2)}</td>
            <td>{showWeather(2)}</td>
          </tr>
          <tr>
            <td>Day 4</td>
            <td>{showTemp(3)}</td>
            <td>{showWeather(3)}</td>
          </tr>
          <tr>
            <td>Day 5</td>
            <td>{showTemp(4)}</td>
            <td>{showWeather(4)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
