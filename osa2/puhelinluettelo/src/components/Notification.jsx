
const Notification = ({ message, style }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className={style? style : 'notification-success'}>
                {message}
            </div>
        )
    }
}

export default Notification