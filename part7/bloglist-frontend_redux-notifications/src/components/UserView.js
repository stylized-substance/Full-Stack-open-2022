import Table from 'react-bootstrap/Table'

const UserView = ({ props }) => {
  const usersMappedToTable = props.map((user) =>
    <tr key={user.id}>
      <td>
        {user.username}
      </td>
      <td>
        {user.blogs.length}
      </td>
    </tr>
  )

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <h2>
              User
            </h2>
          </th>
          <th>
            <h2>
            Blogs created
            </h2>
          </th>
        </tr>
      </thead>
      <tbody>
        {usersMappedToTable}
      </tbody>
    </Table>
  )
}

export default UserView
