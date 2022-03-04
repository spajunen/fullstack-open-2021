import { useSelector } from 'react-redux'


const Notification = () => {
  const notifications = useSelector(state => {
    console.log(state)
    return state.notifications 
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notifications !== '' ?
    <div style={style}>
      You voted {notifications}
    </div> :
    null
  )
}

export default Notification