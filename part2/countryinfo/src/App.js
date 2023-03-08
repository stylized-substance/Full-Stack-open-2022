import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

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
      .catch(function (error) {
        console.log(error.toJSON());
      });
  }, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
    setCountriesToShow(allCountryData.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase())))
  }

  return (
    <div>
      <h1>
        Find countries
      </h1>
      <form>
        <input value={searchText} onChange={handleSearchChange} />
      </form>
      <CountryList countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow} />
    </div>
  )
}

export default App;
