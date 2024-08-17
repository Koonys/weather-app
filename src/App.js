import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
const apikey = "adf4874664a79865e67278f1ec5bef32"

function App() {

  const [weather, setWeather] = useState(null);
  const getCurrentLocation=()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat,lon)
      });
  }

  const getWeatherByCurrentLocation = async (lat,lon) =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation]);
  return (
    <div className="App">
      <div className={"container"}>
        <WeatherBox weather={weather}></WeatherBox>
        <WeatherButton></WeatherButton>
      </div>
    </div>
  );
}

export default App;
