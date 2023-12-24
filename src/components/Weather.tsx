import { useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
  const [search, setSearch] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [icon, setIcon] = useState<any>("01d")
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

    setCity(data.name)
    setIcon(data.weather[0].icon)   
    setWeather((data.main.temp.toFixed(0)) + "°")
    setHumidity(data.main.humidity)
    setWind(data.wind.speed.toFixed(0))

    setLoading(false)
  }


  return (
    <div className='container'>
      <div className='card-weather'>
        <div className='top-bar'>
          <input type='text' className='cityInput' placeholder='Pesquise uma cidade' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <div className='search-icon' onClick={() => getWeather()}>
            <img src={search_icon} alt=''/>
          </div>
        </div>
        {loading ? (
          <div className='loading-container'>
            <div className='spinner'></div>
          </div>
        ) : (
          <>
            <div className='weather-image'>
              <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt='' className='icon-image'/>
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
          </>
        )}
      </div>
    </div>
  )
}

export default Weather