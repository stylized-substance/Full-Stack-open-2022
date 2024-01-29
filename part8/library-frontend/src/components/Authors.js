import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from "../queries"
import { useQuery, useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import Select from 'react-select'

const EditAuthor = ({ year, setYear, setName, submit, options }) => {
  const handleYearChange = (event) => {
    setYear(Number(event.target.value))
  }

  return (
    <div>
      <h2>
        Set author birth year
      </h2>
      <form onSubmit={submit}>
        <div>
          <Select defaultValue={options[0]} options={options} onChange={opt => setName(opt.value)} />
        </div>
        <br></br>
        <div>
          Year:
          <input
            value={year}
            // onChange={({ event }) => setYear(Number(event.target.value))}
            onChange={handleYearChange}
            // onChange={({ event }) => console.log(event)}
          />
        </div>
        <br></br>
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [ changeBirthYear ] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (!result.loading) {
      setName(result.data.allAuthors[0].name)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading..</div>
  }
  
  const authors = result.data.allAuthors
  
  const submit = async (event) => {
    event.preventDefault()
    
    changeBirthYear({ variables: { name, year }})
    setName('')
    setYear('')
  }

  const options = authors.map(
    (author) => ({value: author.name, label: author.name})
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.loggedInUser && <EditAuthor year={year} setYear={setYear} setName={setName} submit={submit} options={options} />}
    </div>
  )
}

export default Authors
