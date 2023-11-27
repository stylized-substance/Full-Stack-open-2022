import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      state = action.payload
    }
  }
})