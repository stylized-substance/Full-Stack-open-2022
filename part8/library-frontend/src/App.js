import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import toast, { Toaster } from 'react-hot-toast'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token , setToken] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [ favoriteGenre, setFavoriteGenre] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
    setLoggedInUser(localStorage.getItem('library-user'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      toast(`Book "${addedBook.title}" added!`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  const logout = () => {
    setToken(null)
    setLoggedInUser(null)
    localStorage.clear()
    client.resetStore()
  }

  const Header = ({ user }) => {
    return (
      <div>
        <b>
          {loggedInUser} logged in
        </b>
      </div>
    )
  }

  return (
    <div>
      <Toaster />
      
      {token && <Header user={loggedInUser} />}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={logout}>Log out</button>}
      </div>

      <Login setToken={setToken} setPage={setPage} show={page === 'login'} setLoggedInUser={setLoggedInUser} setFavoriteGenre={setFavoriteGenre} />

      <Authors loggedInUser={loggedInUser} show={page === 'authors'} />

      <Books show={page === 'books'} loggedInUser={loggedInUser} />

      <Recommendations show={page === 'recommendations'} favoriteGenre={favoriteGenre} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App