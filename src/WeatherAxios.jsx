import React, { useEffect, useState } from 'react'
import axios from 'axios' // npm i axios
const WeatherAxios = (props) => {
  // Your useState definitions here
  let [zipcode, setZipcode] = useState() // updated everytime i type into input
  let [query, setQuery] = useState() // query is only changed when i submit my form
  let [weather, setWeather] = useState() // stores the information we get back from the API! used to display to user on page
  const handleChange = (event) => { // updating the zipcode state!
    setZipcode(event.target.value)
    console.log(zipcode)
  }
  const handleSubmit = (event) => {
    event.preventDefault() // prevent refresh! IMPORTANT!
    setQuery(zipcode) // update the query state that the user wants to use to make the API call
  }
  useEffect((event) => { // called everytime query changes (user submits the form)
    const fetchData = async () => {
        const result = await axios(`http://api.openweathermap.org/data/2.5/weather?zip=${query},us&appid=fba0ff0095bb2923a9c322e7570df02b`)
        setWeather(result.data)
    }
    fetchData()
  }, [query])
  let weatherInfo = <div><h1>Search below to get your weather info here! :)</h1></div>
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
      <form onSubmit={handleSubmit}>
        {weatherInfo}
      <label>
        Please enter your zip code for the weather:
        <input type="text" onChange={handleChange} style={{border: '1px solid black'}} value={zipcode} />
      </label>
      <input type="submit" value="Get my forecast!" />
    </form>
    </div>
  )
}
export default WeatherAxios