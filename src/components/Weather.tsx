import React, { useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
  const [search, setSearch] = useState<string>("")

  let api_key = "f4f48f2f9cdf818da9362c1a8a01cc5c"

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&units=metric`

  const getWeather = async () => {

    let response = await fetch(url)
    let data = await response.json()

    console.log(data)
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
        <img src={cloud_icon} alt=''/>
      </div>
      <div className='weather-temp'>24c</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidade</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='' className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>18 km/h</div>
            <div className='text'>Velocidade do Vento</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather