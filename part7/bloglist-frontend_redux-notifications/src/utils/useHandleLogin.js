import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setLoggedInUser } from '../reducers/userReducer'
import { updateNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const useHandleLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (username, password) => {
    try {
      const loginResult = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedOnUser', JSON.stringify(loginResult))

      blogService.setToken(loginResult.token)
      dispatch(setLoggedInUser(loginResult))
      navigate('/')
    } catch (exception) {
      console.log('exception', exception)
      dispatch(
        updateNotification({ content: 'Invalid credentials', type: 'error' })
        )
        setTimeout(() => {
          dispatch(updateNotification({}))
        }, 5000)
      }
    console.log('useHandleLogin', username, password)
  }
  return handleLogin
}

export default useHandleLogin