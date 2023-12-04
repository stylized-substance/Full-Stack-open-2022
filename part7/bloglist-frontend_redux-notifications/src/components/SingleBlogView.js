import { useParams } from 'react-router-dom'
import LikeButton from "./LikeButton"

const SingleBlogView = ({ blogs }) => {
  const blogId = useParams().id
  const blog = blogs.find((blog) => blog.id === blogId)

  if (!blog) {
    return null
  }

  return (
    <div>
      <br></br>
      <h1>
        {blog.title}
      </h1>
      {blog.likes} likes
      <br></br>
      <a href={blog.url}>
        {blog.url}
      </a>
      <br></br>
      Added by {blog.user.username}
      <LikeButton blog={blog} />
    </div>
  )
}

export default SingleBlogView