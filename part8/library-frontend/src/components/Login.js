import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from '../queries'

const Login = ({ setToken, setPage, show, setLoggedInUser, setFavoriteGenre }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ loginMutation, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setLoggedInUser(username)
      localStorage.setItem('library-user', username)
      setFavoriteGenre(result.data.login.favoritegenre)
    }
  }, [result.data])
  
  const login = async (event) => {
    event.preventDefault()
    loginMutation({ variables: { username, password } })
    setPage('authors')
  }
  
  if (show) {
    return (
      <div>
      <h2>Login</h2>
        <form onSubmit={login}>
          <div>
            Username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <br></br>
          <button onClick={login} type="button">
            Log in
          </button>
        </form>
      </div>
    )
  }
}

export default Login