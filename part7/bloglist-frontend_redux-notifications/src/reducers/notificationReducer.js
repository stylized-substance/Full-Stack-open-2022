const notificationReducer = (state = [], action) => {
  switch (action.type) {
  case 'update':
    return [...state, action.payload]
  case 'reset':
    state = null
    return state
  }
}

export const updateNotification = (content) => {
  return {
    type: 'update',
    payload: {
      content
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'reset'
  }
}

export default notificationReducer