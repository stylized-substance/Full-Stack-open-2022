import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogsNeedReload, setblogsNeedReload] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const createFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="Create blog" ref={createFormRef}>
      <CreateForm createBlog={createBlog} />
    </Togglable>
  )

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log('Getting blogs..')
      setBlogs( blogs )
      setblogsNeedReload(false)
    })
  }, [blogsNeedReload])

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

  const handleLike = (id) => {
    blogService.getOne(id)
      .then((blog) => {
        const newLikes = blog.likes + 1
        const updateObject = {
          likes: newLikes
        }
        blogService.update(id, updateObject)
          .then(() => {
            setblogsNeedReload(true)
          })
      })
  }

  const handleRemove = (id, title) => {
    if (window.confirm('Remove blog ' + title + '?')) {
      blogService.remove(id)
        .then(setblogsNeedReload(true))
    }
  }

  const createBlog = (blogObject) => {
    createFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
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
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          type="submit"
          id="login-button">
            Login
        </button>
      </form>
    </div>
  )

  const sortedByLikes = blogs.sort((a, b) => a.likes - b.likes)

  const blogsDisplay = () => (
    <div id="blogs-display">
      <h2>blogs</h2>
      {sortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user.username}/>
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
        {blogForm()}
        {blogsDisplay()}
      </div>
      }
    </div>
  )
}

export default App