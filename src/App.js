import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useCallback, useEffect, useState} from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
const apikey = "adf4874664a79865e67278f1ec5bef32"

function App() {

  const cities = ['paris','new york','tokyo','seoul']
  const [city,setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");


  const getWeatherByCurrentLocation = useCallback(async (lat,lon) =>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=kr`
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false)
    }catch (err){
      setAPIError(err.message)
      setLoading(false)
    }

  },[]);

  const getCurrentLocation = useCallback(()=>{
    try {
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat,lon)});
        setCity('')
    }catch (error){
      setCity('seoul')
    }
  },[getWeatherByCurrentLocation]);

  const getWeatherByCity = useCallback(async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=kr`
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false)
    }catch (err){
      setAPIError(err.message);
      setLoading(false)
    }

  }, [city]);

  useEffect(() => {
    if(city===''){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);


  return (
    <div className="App">
      {loading ? (
        <div className={"container"}>
          <ClipLoader color={`#f88c6b`} loading={loading} size={150}></ClipLoader>
        </div>
        ) : !apiError ? (
        <div className={"container"}>
          <WeatherBox weather={weather}></WeatherBox>
          <WeatherButton key={cities} cities={cities} setCity={setCity} selectedCity={city} setCurrent={getCurrentLocation}></WeatherButton>
        </div>) : (
          apiError
        )
      }
    </div>
  );
}

export default App;
