import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.note.note)
  const visible = useSelector(state => state.note.visible)

  const style = {
    border: 'solid',
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div>
      {visible && 
        <div id='notification-div' style={style}>
          {notification}
        </div>    
      }
    </div>
  )
}

export default Notification