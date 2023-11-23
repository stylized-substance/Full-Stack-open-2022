const initialState = []

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'update':
    return [...state, action.payload]
  case 'reset':
    return initialState
  default:
    return state
  }
}

export const updateNotification = (content, notificationType) => {
  return {
    type: 'update',
    payload: {
      content,
      notificationType
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'reset',
  }
}

export default notificationReducer