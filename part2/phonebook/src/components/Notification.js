const Notification = ({ message, notificationType }) => {
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

    let notificationStyle

    if(notificationType === 'success') {
        notificationStyle = successStyle
    }

    if(notificationType === 'error') {
        notificationStyle = errorStyle
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}



export default Notification