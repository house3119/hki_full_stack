
const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="notification-div">
                {message}
            </div>
        )
    }
}

export default Notification