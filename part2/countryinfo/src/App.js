import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [searchText, setSearchText] = useState('')
  const [allCountryData, setAllCountryData] = useState(null)
  const [countriesToShow, setCountriesToShow] = useState(null)


  let id = 0
  const IncrementId = () => {
    return id++
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const idsAdded = response.data.map(country => ({
          ...country, id: IncrementId()
        }))
        setAllCountryData(idsAdded)
        setCountriesToShow(idsAdded)
      })
  }, [])

  const handleSearchChange = (event) => {
    console.log('input change:', event);
    setSearchText(event.target.value)
    setCountriesToShow(countriesToShow.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase())))
    // setCountriesToShow(allCountryData)
  }

  const CountryList = ({ countriesToShow }) => {
    if (countriesToShow === null) {
      return null
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

    if (countriesToShow.length >= 1 && countriesToShow.length <= 10) {
      return (
        <ul>
          {countriesToShow.map((country) =>
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
      <CountryList countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;
