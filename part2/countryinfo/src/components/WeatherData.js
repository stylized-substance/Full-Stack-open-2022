import axios from "axios"
import { useState, useEffect } from 'react'

const WeatherData = ({ country} ) => {
    const [weatherData, setWeatherData] = useState(null)

    const weatherAPIKey = 'ad0533cd7466b6d00153e73297374f28'
    const weatherAPICall = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weatherAPIKey}`

    useEffect(() => {
        axios.get(`${weatherAPICall}`)
            .then(response => {
                setWeatherData(response.data)
            })
        }, [])
        console.log(weatherData)

    return (
        <div>Temperature: {weatherData.main.temp}</div>
    )
}

export default WeatherData