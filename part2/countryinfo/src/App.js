import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [searchText, setSearchText] = useState('')
  const [allCountryData, setallCountryData] = useState(null)

  useEffect(() => {
    console.log('effect running');
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setallCountryData(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const CountryList = ({ allCountryData }) => {
    if (allCountryData === null) {
      return null
    }

    const countryCommonNames = allCountryData.map(country => country.name.common).sort()

    return (
      <ul>
        {countryCommonNames.map((country, index) =>
          <li key={index}>
            {country} {index}
          </li>
        )}
      </ul>
    )
  }

  return (
    <div>
      <h1>
        Find countries
      </h1>
      <form>
        <input value={searchText} onChange={handleSearchChange} />
      </form>
      <CountryList allCountryData={allCountryData} />
    </div>
  )
}

export default App;
