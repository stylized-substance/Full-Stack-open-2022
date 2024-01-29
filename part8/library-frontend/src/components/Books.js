import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import Select from 'react-select'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [booksToShow, setBooksToShow] = useState([])
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
      setBooksToShow(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (!booksByGenre.loading) {
      setBooksToShow(booksByGenre.data.allBooks)
    }
    // setBooksToShow(books.filter((book) => book.genres.includes(genre)))
  }, [genre, booksByGenre])
  
  if (result.loading) {
    return <div>loading..</div>
  }

  if (!props.show) {
    return null
  }

  const genres = [...new Set(books.map((book) => book.genres).flat())]

  const options = genres.map((genre) => ({value: genre, label: genre}))

  return (
    <div>
      <h2>Books</h2>
      <h4>
        Filter by genre:
      </h4>
      <form>
        <Select options={options} onChange={opt => setGenre(opt.value)} />
      </form>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
