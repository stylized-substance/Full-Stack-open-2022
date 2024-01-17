import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from "../queries"
import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState()
  const [year, setYear] = useState()
  const [ changeBirthYear ] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })
  const result = useQuery(ALL_AUTHORS)

  const submit = async (event) => {
    event.preventDefault()
    
    changeBirthYear({ variables: { name, year }})
    setName('')
    setYear('')
  }

  
  if (result.loading) {
    return <div>loading..</div>
  }
  
  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const options = authors.map(
    (author) => ({value: author.name, label: author.name}))

  console.log(options)

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
            onChange={({ target }) => setYear(Number(target.value))}
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

export default Authors
