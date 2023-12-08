import { useState, useEffect, useRef } from 'react'
import Menu from './components/Menu'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import UserView from './components/UserView'
import SingleUserView from './components/SingleUserView'
import SingleBlogview from './components/SingleBlogView'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from 'react-router-dom'

import { updateNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addBlog,
  likeBlog,
  removeBlog
} from './reducers/blogReducer'
import { setLoggedInUser, resetUser } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import useHandleLogin from './utils/useHandleLogin'

const App = () => {
  const [userInfo, setUserInfo] = useState([])
  const createFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const loggedOnUserLocalStorage = JSON.parse(
    window.localStorage.getItem('loggedOnUser')
  )
  const dispatch = useDispatch()
  const handleLogin = useHandleLogin()

  console.log('app rendering')

  useEffect(() => {
    if (loggedOnUserLocalStorage) {
      dispatch(setLoggedInUser(loggedOnUserLocalStorage))
      blogService.setToken(loggedOnUserLocalStorage.token)
    }
  }, [])

  useEffect(() => {
    userService.getAll().then((response) => {
      setUserInfo(response)
    })
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedOnUser')
    dispatch(resetUser())
  }

  const handleRemove = (blog, title) => {
    if (window.confirm('Remove blog ' + title + '?')) {
      dispatch(removeBlog(blog))
      dispatch(
        updateNotification({
          content: `Removed blog ${title}`,
          type: 'success'
        })
      )
      setTimeout(() => {
        dispatch(updateNotification({}))
      }, 5000)
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

  const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={() => handleLogin(event, username, password)}>
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
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create blog" ref={createFormRef}>
      <CreateForm createBlog={createBlog} />
    </Togglable>
  )

  const BlogsDisplay = ({ blogs }) => {
    return (
      <div id="blogs-display">
        <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleRemove={handleRemove}
              user={user.username}
            />
          ))}
      </div>
    )
  }

  const Home = () => {
    if (!loggedOnUserLocalStorage) {
      return <Navigate replace to="/login" />
    }
    return (
      <>
        <p>{loggedOnUserLocalStorage.username} logged in</p>
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
        {blogForm()}
        <BlogsDisplay blogs={blogs} />
      </>
    )
  }

  return (
    <div className="container">
      <Notification />
      <Menu />
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserView props={userInfo} />} />
        <Route path="/blogs" element={<BlogsDisplay blogs={blogs} />} />
        <Route
          path="/users/:id"
          element={<SingleUserView users={userInfo} />}
        />
        <Route path="/blogs/:id" element={<SingleBlogview blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App
