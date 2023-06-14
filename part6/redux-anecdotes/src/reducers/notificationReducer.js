import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    voteNotification(state, action) {
      state = `Voted for \"${action.payload}\"`
      return state
    },
    addNotification(state, action) {
      state = `Added blog \"${action.payload}\"`
      return state
    },
    hideNotification(state, action) {
      state = initialState
      return state
    }
  }
})

export const { voteNotification, addNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer