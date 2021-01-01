import "./App.css";
import React, { useState } from "react";
const api = {
  key: "89634cf0b914a338a1606e2417ed00d3",
  base: "https://api.openweathermap.org/data/2.5/",
};

document.body.style.background =
  "linear-gradient(45deg, #efefbb, #faaca8) no-repeat";
function App() {
  let date = new Date().toLocaleDateString();
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
      console.log(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };
  return (
    <div>
      <main className="sub-container">
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{date}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main} </div>
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
