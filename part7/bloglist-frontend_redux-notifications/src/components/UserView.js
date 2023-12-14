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
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>
              <h3>User</h3>
            </th>
            <th>
              <h3>Blogs created</h3>
            </th>
          </tr>
        </thead>
        <tbody>{usersMappedToTable}</tbody>
      </Table>
    </div>
  )
}

export default UserView
