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

    if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
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

    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        const languageValues = Object.values(country.languages)
        const languageList = languageValues.map(value =>
          <li>
            {value}
          </li>
        )

        return (
            <div>
                <h2>
                    {country.name.common}
                </h2>
                <b>Capital:</b> {country.capital}
                <br></br>
                <b>Area:</b> {country.area}
                <hr></hr>
                <b>Languages:</b>
                <ul>
                  {languageList}
                </ul>
            </div>
        )
    }
  }

  export default CountryList