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
            temp:''
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
                this.setState({
                    city: result.name,
                    country: result.sys.country,
                    description: result.weather[0].main,
                    temp: result.main.temp
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
                <div className="image-box"></div>      
                <div className="location-box">
                    <div className="location">{this.state.city}, {this.state.country}</div>
                    <div className="date">{this.props.date}</div>
                </div>

                <div className="weather-box">
                    <div className="temp">
                        {Math.round(this.state.temp)}°C
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