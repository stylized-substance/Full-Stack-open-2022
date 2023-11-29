import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeAction(state, action) {
      const blogToLike = [...state].find(blog => blog.id === action.payload.id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blog => blog.id !== blogToLike.id ? blog : likedBlog)
    }
    // TODO: write logic for removing blogs
  }
})

export const { setBlogs, appendBlog, likeAction } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    console.log(blog, newBlog, dispatch)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const blogToLike = await blogService.getOne(blog.id)
    await blogService.update(blogToLike.id, { likes: blog.likes + 1 })
    dispatch(likeAction(blog))
  }
}


export default blogSlice.reducer