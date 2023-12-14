import { useState } from 'react'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Button from 'react-bootstrap/Button'

const Blog = ({ blog, handleRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const RemoveButton = ({ blog, handleRemove, title }) => {
    if (blog.user.username === user) {
      return (
        // <button
        //   className="remove-button"
        //   onClick={() => handleRemove(blog, title)}
        // >
        //   Remove
        // </button>
        <Button
          size="sm"
          variant="light"
          className="remove-button"
          onClick={() => handleRemove(blog, title)}
        >
          Remove
        </Button>
      )
    }
  }
  return (
    <div className="blog" style={blogStyle}>
      <div className="title">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
      <div className="author">{blog.author}</div>
      <div className="moreinfo">
        <div className="url">{blog.url}</div>
        <div className="likes">Likes: {blog.likes}</div>
        <div>Added by: {blog.user.name}</div>
        <div>
          <LikeButton blog={blog} />
          <RemoveButton
            blog={blog}
            id={blog.id}
            handleRemove={handleRemove}
            title={blog.title}
          />
        </div>
      </div>
    </div>
  )
}

export default Blog
