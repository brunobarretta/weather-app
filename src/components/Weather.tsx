import { useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const iconMappings:any = {
  "11d": rain_icon,
  "10d": rain_icon,
  "09d": drizzle_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": cloud_icon,
  "04n": cloud_icon,
  "01d": clear_icon,
  "01n": clear_icon,
  "13d": snow_icon,
};

const Weather = () => {
  const [search, setSearch] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [icon, setIcon] = useState<any>(cloud_icon)
  const [weather, setWeather] = useState<string>("")
  const [humidity, setHumidity] = useState<string>("")
  const [wind, setWind] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  let api_key = "f4f48f2f9cdf818da9362c1a8a01cc5c"

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&units=metric`

  const getWeather = async () => {
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()

    console.log(data)

    setCity(data.name)
    setIcon(iconMappings[data.weather[0].icon] || cloud_icon)   
    setWeather((data.main.temp.toFixed(0)) + "°")
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)

    // setLoading(false)
  }


  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Pesquise uma cidade' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className='search-icon' onClick={() => getWeather()}>
          <img src={search_icon} alt=''/>
        </div>
      </div>
      <div className='weather-image'>
        <img src={icon} alt=''/>
      </div>
      <div className='weather-temp'>{weather || "-"}</div>
      <div className='weather-location'>{city || "-"}</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>{humidity || "- "}%</div>
            <div className='text'>Humidade</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='' className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>{wind || "- "}km/h</div>
            <div className='text'>Velocidade do Vento</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather