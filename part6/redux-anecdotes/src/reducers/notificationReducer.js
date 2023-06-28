import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      state = initialState
      return state
    }
  }
})

export const notificationCreator = (message, delaySeconds) => {
  return async dispatch => {
    dispatch(setNotification(message))
    let delayMilliSeconds = delaySeconds * 1000
    setTimeout(() => {
      dispatch(setNotification(null))
    }, delayMilliSeconds)
  }
}

export const { setNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer