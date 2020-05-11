import React, { useEffect, useState } from 'react'

const Weather = (props) => {

 const API_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
 const API_KEY = ',us&appid=fba0ff0095bb2923a9c322e7570df02b'
  // Your useState definitions here
  let [zipcode, setZipcode] = useState()
  let [weather, setWeather] = useState()
  let [query, setQuery] = useState('')

  const handleSubmit = (e)=>{
   e.preventDefault()
   setQuery(zipcode)
  }

    let weatherInfo = <div>Search below for weather info</div>

    // The commented useEffect causes problem in calling the weather object and its properties to display in the div
   /*  useEffect(() => {
                fetch(API_URL+query+API_KEY)
                .then(response=>response.json())
                .then(result=>{
                    console.log(result)
                    setWeather(result)
                })
        
        }, [query])   */

        useEffect(() => { // called everytime query changes (user submits the form)
          const fetchData = async () => {
              fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${query},us&appid=fba0ff0095bb2923a9c322e7570df02b`)
              .then(result => result.json())
              .then(result => {
                setWeather(result)
              })
          }
          if(query.length > 0) {
            fetchData()
          }
        }, [query])

  console.log('weather',weather)
  if(weather) {
    weatherInfo = 
      <div>
          <h1>Location: {weather.name}</h1>
          <h2>Current Temperature: {weather.main.temp} Kelvin</h2>
          <small>High Temp: {weather.main.temp_max} Kelvin, Low Temp: {weather.main.temp_min} Kelvin</small>
          <p>Description: {weather.weather[0].description} </p> 
      </div>
      }



  return (
    <div>
      <form onSubmit = {handleSubmit} >
      <p>
        { weatherInfo }
      </p>
      <label>
        Please enter your zip code for the weather:
        <input type="text" value={zipcode}  onChange={ e => setZipcode(e.target.value)} />
      </label>
      <input type="submit" value="Get my forecast!" />
    </form>

    </div>
  )
}


export default Weather


