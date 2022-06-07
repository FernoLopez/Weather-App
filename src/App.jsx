import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [latLon, setLatLon] = useState({})
  const [weather, setWeather] = useState()
  const [changeTemp, setChangeTemp] = useState(true);

useEffect(() => {
  const success=pos=> {
    const lat= pos.coords.latitude
    const lon= pos.coords.longitude
    setLatLon({lat, lon})
  }

  navigator.geolocation.getCurrentPosition(success)
}, [])

useEffect(() => {
    if(latLon !== undefined) {
      const API_KEY = 'ccd259c18f7179e690b218fb5627e556'
   const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon?.lat}&lon=${latLon?.lon}&appid=${API_KEY}&units=metric` 
    axios.get(URL)
      .then(res => 
        setWeather(res.data))
        .catch(error=> console.log(error));
      }
      }, [latLon])
  
    console.log(weather)

    let iconUrl = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`

  return (
    <div className='App'>
            <div className='card box'>
                <h1>Weather App</h1>
                <p id="location">
                <h1>{weather?.name},&nbsp;
                {weather?.sys.country}</h1> 
                <div>
                <h2 className='objects-style'>{
              changeTemp ? `${Math.round(weather?.main.temp)} ºC`:
              `${Math.round((weather.main?.temp *9/5) + 32)} ºF` }</h2>
              </div>
                <h3 className='objects-style'><b>Clouds:</b>{weather?.clouds.all}%</h3>
                <div className='objects-style' >
                  <img src={iconUrl} alt="weather icon"></img>
               </div>    
            </p>
                
            <button class='btn-style'
            onClick={() => setChangeTemp(!changeTemp)}>Degrees ºF / ºC
            </button>
              </div>
            </div>
        
  )}

export default App
