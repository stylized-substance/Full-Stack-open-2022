import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [searchText, setSearchText] = useState('')
  const [allCountryData, setallCountryData] = useState(null)

  let id = 0
  const IncrementId = () => {
    return id++
  }

  useEffect(() => {
    console.log('effect running');
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const idsAdded = response.data.map(country => ({
          ...country, id: IncrementId()
        }))
        setallCountryData(idsAdded)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
    setallCountryData(allCountryData.filter(country => country.name.common.toLowerCase().includes(event.target.value)))
  }

  const CountryList = ({ allCountryData }) => {
    if (allCountryData === null) {
      return null
    }

    console.log(allCountryData.length);

    if (allCountryData.length > 10) {
      return (
        <p>
          Too many matches, write a more specific query
        </p>
      )      
    }

    allCountryData.sort(function (a, b) {
      return a.name.common.localeCompare(b.name.common)
    })

    if (allCountryData.length >= 1 && allCountryData.length <= 10) {
      return (
        <ul>
          {allCountryData.map((country) =>
            <li key={country.id}>
              {country.name.common} {country.id}
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
      <CountryList allCountryData={allCountryData} />
    </div>
  )
}

export default App;
