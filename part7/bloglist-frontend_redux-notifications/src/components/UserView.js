//import React from 'react'

const UserView = ({ props }) => {

  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  const headerStyle = {
    padding: '0px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }

  return (
    <div>
      <div style={headerContainerStyle}>
        <div style={headerStyle}><h3>Users</h3></div>
        <div style={headerStyle}><h3>Blogs created</h3></div>
      </div>
      <div id="user-info">
        <div>
          {props.map((user) => (
            <li key={user.id}>
              {user.username} {user.blogs.length}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserView
