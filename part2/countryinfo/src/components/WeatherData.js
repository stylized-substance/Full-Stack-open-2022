import axios from "axios"
import { useState, useEffect } from 'react'

const WeatherData = ({ country} ) => {
    const [weatherData, setWeatherData] = useState(null)

    const weatherAPIKey = 'ad0533cd7466b6d00153e73297374f28'
    const weatherAPICall = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${weatherAPIKey}`

    useEffect(() => {
        axios.get(`${weatherAPICall}`)
            .then(response => {
                setWeatherData(response.data)
            })
        }, [])
        console.log(weatherData)

    if (weatherData != null) {
        return (
            <div>
                Temperature: {weatherData.main.temp} celsius
                <br></br>
                Wind speed: {weatherData.wind.speed} m/s
            </div>
        )
    }
}

export default WeatherData