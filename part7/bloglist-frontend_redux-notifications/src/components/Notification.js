import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notificationState = useSelector((state) => state.notification)
  const message = notificationState.content
  const notificationType = notificationState.type

  if (notificationType === 'success') {
    return (
      <Alert key="success" variant="success">
        {message}
      </Alert>
    )
  }

  if (notificationType === 'error') {
    return (
      <Alert key="danger" variant="danger">
        {message}
      </Alert>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  notificationType: PropTypes.string
}

export default Notification
