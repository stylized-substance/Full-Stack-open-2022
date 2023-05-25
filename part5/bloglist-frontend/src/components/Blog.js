import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const LikeButton = ({ id, handleLike }) => {
    return (
      <button onClick={() => handleLike(id)}>
        Like
      </button>
    )
  }

  const RemoveButton = ({ id, handleRemove, title }) => {
    if (blog.user.username === user) {
      return (
        <button onClick={() => handleRemove(id, title)}>
        Remove
        </button>
      )
    }
  }

  return (
    <div style={blogStyle}>
      <div style={showWhenVisible}>
        <div className="title">
          {blog.title}
        </div>
        <div className="author">
          {blog.author}
        </div>
        <div className="url">
          {blog.url}
        </div>
        <div className="likes">
          Likes: {blog.likes}
        </div>
        <div>
          <button onClick={toggleVisibility}>
            Less
          </button>
        </div>
        <div>
          <LikeButton id={blog.id} handleLike={handleLike} />
          <RemoveButton id={blog.id} handleRemove={handleRemove} title={blog.title} />
        </div>
      </div>

      <div style={hideWhenVisible}>
        <div className="title">
          {blog.title}
        </div>
        <div className="author">
          {blog.author}
        </div>
        <div>
          <button onClick={toggleVisibility}>
            More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog