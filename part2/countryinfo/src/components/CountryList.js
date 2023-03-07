import axios from "axios"
import WeatherData from './WeatherData'

const CountryList = ({ countriesToShow, setCountriesToShow }) => {

    if (countriesToShow === null) {
      return (
        <p>
          Country data not yet loaded
        </p>
      )
    }

    if (countriesToShow.length > 10) {
      return (
        <p>
          Too many matches, write a more specific query
        </p>
      )      
    }

    countriesToShow.sort(function (a, b) {
      return a.name.common.localeCompare(b.name.common)
    })

    if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
      return (
        <ul>
          {countriesToShow.map((country) =>
            <li key={country.id}>
              {country.name.common} &nbsp;
              <button onClick={() => setCountriesToShow([country])}>Show</button>
            </li>
          )}
        </ul>
      )
    }

    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        const capitals = country.capital.map(value =>
          <li key={value}>
            {value}
          </li>)
        const languageValues = Object.values(country.languages)
        const languageList = languageValues.map(value =>
          <li key={value}>
            {value}
          </li>
        )
        const flagURL = country.flags.png

        return (
            <div>
                <h2>
                    {country.name.common}
                </h2>
                <hr></hr>
                <b>Capital:</b>
                <ul>
                  {capitals}
                </ul>
                <hr></hr>
                <b>Area:</b> {country.area}
                <hr></hr>
                <b>Languages:</b>
                <ul>
                  {languageList}
                </ul>
                <img src={flagURL} alt='Flag image'/>
                <h2>
                  Weather in {country.capital}
                </h2>
                <WeatherData country={country} />
            </div>
        )
    }
  }

  export default CountryList