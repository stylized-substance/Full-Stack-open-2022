import Table from 'react-bootstrap/Table'
import SingleUserView from './SingleUserView'
import { Routes, Route, Link } from 'react-router-dom'

const UserView = ({ props }) => {
  const usersMappedToTable = props.map((user) => (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  ))

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>
              <h2>User</h2>
            </th>
            <th>
              <h2>Blogs created</h2>
            </th>
          </tr>
        </thead>
        <tbody>{usersMappedToTable}</tbody>
      </Table>
    </div>
  )
}

export default UserView
