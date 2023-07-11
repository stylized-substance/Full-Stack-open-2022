import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  console.log('state:', state, 'action:', action)
  switch (action.type) {
    case 'CREATE':
      return `anecdote '${action.payload}' created`
    case 'VOTE':
      return `voted for '${action.payload}'`
    case 'ERROR':
      return 'Error adding blog'
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer,'')
  
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const NotificationAndDispatch = useContext(NotificationContext)
  return NotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext