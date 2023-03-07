const CountryList = ({ countriesToShow }) => {
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

  export default CountryList