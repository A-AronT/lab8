import L, { LeafletMouseEvent } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css';

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

  // useEffect(() => {



  //   let current_lat = 28.625789;
  //   let current_long = 77.0547899;
  //   let current_zoom = 16;
  //   let center_lat = current_lat;
  //   let center_long = current_long;
  //   let center_zoom = current_zoom;




  //   // The <div id="map"> must be added to the dom before calling L.map('map')
  //   let map = L.map('map', {
  //     center: [center_lat, center_long],
  //     zoom: center_zoom
  //   });

  //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(map);



  // });

  return (
    <div>
      <div id='map'>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <p>hello sirs</p>
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
