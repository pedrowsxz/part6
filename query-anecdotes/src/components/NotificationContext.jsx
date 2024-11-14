import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `anecdote ${action.payload.content} created`
    case 'VOTE':
      return `anecdote ${action.payload.content} voted`
    case 'CLEAR':
      return ''
    case 'ERROR':
      return action.payload.message
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) =>{
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext