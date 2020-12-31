import './App.css';
import React, {useState} from 'react';
import DefaultWeather from './Components/defaultWeather';

const api ={
  key: "9f23490722d48947305d975a9a428ef3",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [imgPath, setImgPath] = useState('');

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(result => {
          let nightMode = result.dt > result.sys.sunset ? "nt_" : "";
          let path = "/weather-icons/svg/"+nightMode+result.weather[0].main.toLowerCase()+".svg"
          setQuery('');
          setWeather(result);
          setImgPath(path);
          console.log(result);
        })
        .catch(error => {
          alert("failure to read");
          console.log(error);
        })
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className="App">
      <div className="search-box">
        <input
          type = "text"
          className = "search-bar"
          placeholder = "Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>

      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="image-box">
          <img src={imgPath} alt="null"/> 
        </div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
        </div>

        <div className="weather-description">
          {weather.weather[0].main}
        </div>
      </div>
      
      ) : ( // default case aka on inital load, when no search has been done yet 
        <DefaultWeather date={dateBuilder(new Date())} />
      )}

    </div>
  );
}

export default App;
