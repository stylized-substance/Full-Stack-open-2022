import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token , setToken] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const client = useApolloClient()
  const localStorageToken = localStorage.getItem('library-user-token')

  if (!token) {
    if (localStorageToken) {
      setToken(localStorageToken)
    }
  }

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
      {token && <Header user={loggedInUser} />}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={logout}>Log out</button>}
      </div>

      <Login setToken={setToken} setPage={setPage} show={page === 'login'} setLoggedInUser={setLoggedInUser} />

      <Authors loggedInUser={loggedInUser} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App