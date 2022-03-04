import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = ['']

//const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (notification) => {
    return {
      content: notification
    }
  }
  
  //const initialState = notificationAtStart.map(asObject)
  const initialState = ''

  const notificationSlice = createSlice({
      name: 'notifications',
      initialState,
      reducers: {
        createNotification(state, action) {
            const content = action.payload.content
            state = content
            return state
        },
      }
  })
  
  export const {createNotification} = notificationSlice.actions
  export default notificationSlice.reducer