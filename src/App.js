import React, { useState } from "react";
import $ from 'jquery'
const api = {
  key: "89634cf0b914a338a1606e2417ed00d3",
  base: "https://api.openweathermap.org/data/2.5/",
};

document.body.style.background = "black";

function App() {
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  window.onload = () => {
    fetch(`${api.base}weather?q=san jose&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
  };
  const search = (evt) => {
    if (evt.key === "Enter") {
      $.ajax({
      type: 'HEAD',
      url: `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`,
      success: function() {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
      },
      error: function () {
        console.clear()
        window.location.reload();
      }
      });
    }
  }

  return (
    <div>
      <main className="container">

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            style={{textTransform: "capitalize"}}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
              </div>
              <div className="location-box" id='location-box'>
                <div className="location" id='data'>
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className='info'>
                    <div className="time">{time}</div>
                    <div className="date">{date}</div>
                </div>
              </div>           
          </div>
        ) : (
          " "
        )}
      </main>
    </div>
  );
}

export default App;
