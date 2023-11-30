const SingleUserView = ({ user }) => {
  if (user) {
    console.log(user.blogs)
    const blogsMapped = user.blogs.map((blog) =>
      <li key={blog.id}>
        {blog.title}
      </li>
    )

    console.log(blogsMapped)

    return (
      <div>
        <br></br>
        <h2>
          {user.username}
        </h2>
        <div>
          {user.id}
        </div>
        <b>
          Added blogs
        </b>
        <ul>
          {blogsMapped}
        </ul>
      </div>
    )
  } else {
    console.log('user is empty')
  }

}

export default SingleUserView