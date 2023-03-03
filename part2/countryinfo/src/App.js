import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    console.log('effect running');
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const CountryNamesList = ({countries}) => {
    if(countries != null) {
      return (
        <ul>
          {countries.map(country =>
          <li>
            {country.name.common}
          </li>
          )}
        </ul>
      )
    }
  }

  return (
    <div>
      <h1>
        Find countries
      </h1>
      <form>
        <input value={searchText} onChange={handleSearchChange} />
      </form>
      <CountryNamesList countries={countries} />
    </div>
  )
}

export default App;
