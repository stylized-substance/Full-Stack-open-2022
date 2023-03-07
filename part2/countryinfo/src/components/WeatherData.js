import axios from "axios"
import { useState } from 'react'

const [weatherData, setWeatherData] = useState(null)

const weatherAPIKey = 'ad0533cd7466b6d00153e73297374f28'
const weatherAPICall = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weatherAPIKey}`
console.log(weatherAPICall);

// axios.get(`${weatherAPICall}`)
        //   .then(response => {
        //     setWeatherData(response.data)
        //   })

        // console.log(weatherData);