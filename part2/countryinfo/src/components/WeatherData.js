import axios from "axios"
import { useState, useEffect } from 'react'

const WeatherData = ({ country} ) => {
    const [weatherData, setWeatherData] = useState(null)

    const weatherAPIKey = 'ad0533cd7466b6d00153e73297374f28'
    const weatherAPICall = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${weatherAPIKey}`

    useEffect(() => {
        axios.get(`${weatherAPICall}`)
            .then(response => {
                setWeatherData(response.data)
            })
        }, [])
        console.log(weatherData)

        // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    
    if (weatherData != null) {
        return (
            <div>Temperature: {weatherData.main.temp}</div>
        )
    }
}

export default WeatherData