import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedOnUserJSON = window.localStorage.getItem('loggedOnUser')
    if (loggedOnUserJSON) {
      const user = JSON.parse(loggedOnUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginResult = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedOnUser', JSON.stringify(loginResult)
      )

      blogService.setToken(loginResult.token)
      setUser(loginResult)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Invalid credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedOnUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const createResult = await blogService.create(newBlog)
    setBlogs(blogs.concat(createResult))
    
    setTitle('')
    setAuthor('')
    setUrl('')

    setNotificationMessage(`Added blog titled "${createResult.title}" `)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
  }

  const loginForm = () => (
    <div>
      <h2>
        Log in to application
      </h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const blogsDisplay = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} notificationType={notificationType} />
      {!user && loginForm()}
      {user &&
      <div>
        <p>
          {user.name} logged in
        </p>
        <button onClick={handleLogout}>Logout</button>
        <CreateForm
          title={title}
          author={author}
          url={url}
          handleCreate={handleCreate}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
        {blogsDisplay()}
      </div>
      }
    </div>
  )
}

export default App