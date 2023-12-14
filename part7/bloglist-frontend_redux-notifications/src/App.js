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
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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
    console.log(username, password)
    return (
      <div>
        <br></br>
        <h2>Log in to application</h2>
        <br></br>
        <Form onSubmit={() => handleLogin(event, username, password)}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username-input"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></Form.Control>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password-input"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" id="login-button">
            Login
          </Button>
        </Form>
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
        <p style={{ color: 'red' }}>
          {loggedOnUserLocalStorage.username} logged in
        </p>
        <Button
          size="sm"
          variant="light"
          id="logout-button"
          onClick={handleLogout}
        >
          Logout
        </Button>
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
