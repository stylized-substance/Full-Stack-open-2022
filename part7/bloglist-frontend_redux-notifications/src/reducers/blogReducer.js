import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.push(action.payload)
      state.sort((a, b) => b.likes - a.likes)
    },
    resetBlogs: () => initialState
  }
})

export const { setBlogs, resetBlogs } = blogSlice.actions

export default blogSlice.reducer