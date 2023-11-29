import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import UserView from './components/UserView'

import { updateNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, likeBlog } from './reducers/blogReducer'
import { setLoggedInUser, resetUser } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState([])
  const createFormRef = useRef()
  const blogs = useSelector((state => state.blogs))
  const user = useSelector((state => state.user))
  const dispatch = useDispatch()

  useEffect(() => {
    userService.getAll().then((response) => {setUserInfo(response)})
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogForm = () => (
    <Togglable buttonLabel="Create blog" ref={createFormRef}>
      <CreateForm createBlog={createBlog} />
    </Togglable>
  )

  useEffect(() => {
    const loggedOnUserLocalStorage = JSON.parse(window.localStorage.getItem('loggedOnUser'))
    if (loggedOnUserLocalStorage) {
      dispatch(setLoggedInUser(loggedOnUserLocalStorage))
      blogService.setToken(loggedOnUserLocalStorage.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginResult = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedOnUser', JSON.stringify(loginResult))

      blogService.setToken(loginResult.token)
      dispatch(setLoggedInUser(loginResult))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        updateNotification({ content: 'Invalid credentials', type: 'error' })
      )
      setTimeout(() => {
        dispatch(updateNotification({}))
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedOnUser')
    dispatch(resetUser())
  }

  const handleLike = (blog, title) => {
    dispatch(likeBlog(blog))
    dispatch(
      updateNotification({ content: `Liked blog ${title}`, type: 'success' })
    )
    setTimeout(() => {
      dispatch(updateNotification({}))
    }, 5000)
  }

  const handleRemove = (id, title) => {
    if (window.confirm('Remove blog ' + title + '?')) {
      blogService.remove(id).then(() => {
        dispatch(
          updateNotification({
            content: `Removed blog ${title}`,
            type: 'success'
          })
        )
        setTimeout(() => {
          dispatch(updateNotification({}))
        }, 5000)
        //setblogsNeedReload(true)
      })
    }
  }

  const createBlog = (blogObject) => {
    createFormRef.current.toggleVisibility()
    dispatch(addBlog(blogObject))
    dispatch(
      updateNotification({
        content: `Added blog ${blogObject.title}`,
        type: 'success'
      })
    )
    setTimeout(() => {
      dispatch(updateNotification({}))
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
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
        <button type="submit" id="login-button">
          Login
        </button>
      </form>
    </div>
  )

  const blogsDisplay = () => (
    <div id="blogs-display">
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          user={user.username}
        />
      ))}
    </div>
  )

  return (
    <div className="container">
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.username} logged in</p>
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
          {blogForm()}
          {blogsDisplay()}
          <UserView props={userInfo} />
        </div>
      )}
    </div>
  )
}

export default App
