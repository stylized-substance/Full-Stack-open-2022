import { createSlice } from '@reduxjs/toolkit'

const initialState = 'test message'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  // reducers: {
    // showNotification(state, action) {
    //   return state
    // }
  // }
})

export default notificationSlice.reducer