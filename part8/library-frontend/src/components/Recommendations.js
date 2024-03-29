import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre: props.favoriteGenre }
  })

  useEffect(() => {
    if (!booksByGenre.loading) {
      setBooks(booksByGenre.data.allBooks)
    }
  }, [booksByGenre])

  if (booksByGenre.loading) {
    return <div>loading..</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      Books in your favorite genre <b>{props.favoriteGenre}</b>
      <br></br>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default Recommendations