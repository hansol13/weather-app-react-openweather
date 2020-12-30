import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

const api ={
  key: "9f23490722d48947305d975a9a428ef3",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [defaultWeather, setDefaultWeather] = useState({});



  const getDefault = () => {
    // debugger;
    const success = (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log("position at componentWillMount:");
      console.log(`Lattitude: ${lat}\n` + `Longitude: ${long}`);

      fetch(`${api.baseUrl}weather?lat=${lat}&lon=${long}&units=metric&APIKEY=${api.key}`)
        .then(response => response.json())
        .then(result => {
          setDefaultWeather(result);
          console.log(result);
        })
        .catch(error =>{
          alert("failure to read default location");
          console.log("caught from default load");
          console.log(error);
        })
    }

    const errorMessage = () => {alert("Cannot find current location - please enable location services")}

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, errorMessage);
    } else {
        alert("Geolocation not authorized");
    }
  }

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(result => {
          setQuery('');
          setWeather(result);
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

      ) : ( // onload
        // <div onClick={getDefault}>
        <div>
          <div className="image-box">

          </div>
          <div className="location-box">
            {/* <div className="location">your current location</div> */}
            <div className="location">Please enter your city above</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {/* {Math.round(defaultWeather.main.temp)}°C */}
            </div>
          </div>

          <div className="weather-description">
            {/* {defaultWeather.weather[0].main} */}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
