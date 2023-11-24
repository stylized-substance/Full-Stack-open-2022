const initialState = {}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'update':
    return action.payload
  case 'reset':
    return initialState
  default:
    return state
  }
}

export const updateNotification = (content, type) => {
  return {
    type: 'update',
    payload: {
      content,
      type
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'reset',
  }
}

export default notificationReducer