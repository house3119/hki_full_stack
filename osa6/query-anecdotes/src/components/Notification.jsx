import { useContext } from "react"
import NotificationContext from "../context/NotificationContext"

const Notification = () => {
  const styleShow = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const styleHide = {
    display: 'None'
  }

  const [notification, dispatch] = useContext(NotificationContext)

  return (
    <div>
    {notification.show &&
      <div style={styleShow}>
        {notification.message}
      </div>
    }
    </div>


  )
}

export default Notification
