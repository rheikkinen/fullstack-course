import '../index.css'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    if (notification.type === 'success') {
        return (
            <div className="notification success">
                {notification.message}
            </div>
        )
    } else if (notification.type === 'error') {
        return (
            <div className="notification error">
                {notification.message}
            </div>
        )
    }

}

export { Notification }