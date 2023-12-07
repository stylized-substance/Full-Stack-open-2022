import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 10
  }

  return (
    <>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/blogs">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
    </>
  )
}

export default Menu
