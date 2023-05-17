import { useState } from 'react'

const Blog = ({ blog }) => {
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
  
  return (
    <div style={blogStyle}>
      <div style={showWhenVisible}>
        {blog.title}
        <br/>
        {blog.author}
        <br/>
        {blog.url}
        <br/>
        {blog.likes}
        
        <button onClick={toggleVisibility}>
          Less
        </button>
      </div>

      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          More
        </button>
      </div>
    </div>
  )
}

export default Blog