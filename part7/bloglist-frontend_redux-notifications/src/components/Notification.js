import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationState = useSelector((state) => state.notification)
  const message = notificationState.content
  const notificationType = notificationState.type

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  if (notificationType === 'success') {
    return (
      <div style={successStyle} className="success">
        {message}
      </div>
    )
  }

  if (notificationType === 'error') {
    return (
      <div style={errorStyle} className="error">
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  notificationType: PropTypes.string
}

export default Notification
