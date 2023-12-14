import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Menu = () => {

  return (
    <>
      <Navbar>
        <Navbar.Brand href="/">
          Bloglist app
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/">
            Home
          </Nav.Link>
          <Nav.Link href="/blogs">
            Blogs
          </Nav.Link>
          <Nav.Link href="/users">
            Users
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  )
}

export default Menu
