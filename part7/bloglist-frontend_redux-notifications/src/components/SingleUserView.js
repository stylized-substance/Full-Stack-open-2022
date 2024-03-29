import Table from 'react-bootstrap/Table'
import { useParams } from 'react-router-dom'

const SingleUserView = ({ users }) => {
  const userId = useParams().id
  const user = users.find((user) => user.id === userId)

  if (!user) {
    return null
  }

  const blogsMapped = user.blogs.map((blog) => (
    <tr key={blog.id}>
      <td>{blog.title}</td>
    </tr>
  ))

  return (
    <div>
      <br></br>
      <h2>{user.username}</h2>
      <Table>
        <thead>
          <tr>
            <th>
              <h3>Added blogs</h3>
            </th>
          </tr>
        </thead>
        <tbody>{blogsMapped}</tbody>
      </Table>
    </div>
  )
}

export default SingleUserView
