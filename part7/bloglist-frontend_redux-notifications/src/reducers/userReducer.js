import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload
    },
    resetUser: () => initialState
  }
})

export const { setLoggedInUser, resetUser } = userSlice.actions

export default userSlice.reducer
