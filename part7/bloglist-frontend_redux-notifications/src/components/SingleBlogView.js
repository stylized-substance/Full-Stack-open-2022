import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LikeButton from './LikeButton'
import blogService from '../services/blogs'

const SingleBlogView = ({ blogs }) => {
  const blogId = useParams().id

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    blogService.getComments(blogId)
    .then((result) => setComments(result))
  }, [])
  const blog = blogs.find((blog) => blog.id === blogId)
  if (!blog) {
    return null
  }

  const commentsList = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.content}
      </li>
    )
  })

  const submitComment = async () => {
    event.preventDefault()
    const commentObject = { content: comment }
    const response = await blogService.submitComment(blogId, commentObject)
    setComments(comments.concat(response))
  }

  return (
    <div>
      <br></br>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
      {blog.likes} likes
      <br></br>
      Added by {blog.user.username}
      <br></br>
      <LikeButton blog={blog} />
      <br></br>
      <br></br>
      <h2>Comments</h2>
      <form onSubmit={submitComment}>
        <input onChange={(event) => setComment(event.target.value)}></input>
        <button>Send</button>
      </form>
      <ul>
        {commentsList}
      </ul>
    </div>
  )
}
export default SingleBlogView
