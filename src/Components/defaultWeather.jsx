import React, {Component} from 'react';
import '../App.css';

const api ={
    key: "9f23490722d48947305d975a9a428ef3",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}



class DefaultWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            country: '',
            description: '',
            temp: '',
            high: '',
            low: '',
            sunrise: '',
            sunset: '',
            humidity: '',
            feelsLike: '',
            imgPath: '',
        };
    };

    componentDidMount() {
        const success = (position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            // console.log("position at componentDidMount:");
            // console.log(`Lattitude: ${lat}\n` + `Longitude: ${long}`);
      
            fetch(`${api.baseUrl}weather?lat=${lat}&lon=${long}&units=metric&APIKEY=${api.key}`)
              .then(response => response.json())
              .then(result => {
                  console.log(result);
                let nightMode = result.dt > result.sys.sunset ? "nt_" : "";
                //   console.log(nightMode);

                let sunriseCalc = new Date(result.sys.sunrise*1000).toLocaleTimeString("en-us");
                let sunsetCalc = new Date(result.sys.sunset*1000).toLocaleTimeString("en-us");
                // console.log(ss);

                this.setState({
                    city: result.name,
                    country: result.sys.country,
                    description: result.weather[0].main,
                    temp: result.main.temp,
                    high: result.main.temp_max,
                    low: result.main.temp_min,
                    sunrise: sunriseCalc,
                    sunset: sunsetCalc,
                    humidity: result.main.humidity,
                    feelsLike: result.main.feels_like,
                    imgPath: "/weather-icons/svg/"+nightMode+result.weather[0].main.toLowerCase()+".svg",
                });
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

    

    render(){
        return(
            <div>
                <div className="image-box">
                    <img src={this.state.imgPath} alt="null"/>
                </div>      
                <div className="location-box">
                    <div className="location">{this.state.city}, {this.state.country}</div>
                    <div className="date">{this.props.date}</div>
                </div>

                <div className="weather-box">
                    
                    <div className="temp">
                        {Math.round(this.state.temp)}°C
                    </div>

                    <div className="detailed-info">
                        <table>
                            <tbody>
                            <tr>
                                <td>High/Low</td>
                                <td>{Math.round(this.state.high)}°C/{Math.round(this.state.low)}°C</td>
                            </tr>
                            <tr>
                             <td>Sunrise</td>
                                <td>{this.state.sunrise}</td>
                            </tr>
                            <tr>
                                <td>Sunset</td>
                                <td>{this.state.sunset}</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{this.state.humidity}%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="weather-description">
                    {this.state.description}
                </div>      
            </div>
        )
    }
}

export default DefaultWeather;