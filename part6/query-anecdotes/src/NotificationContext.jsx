import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return null
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useSetNotification = () => {
  const dispatch = useContext(NotificationContext)[1]

  return (message, timeout) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => dispatch({ type: 'RESET' }), timeout * 1000)
  }
}

export default NotificationContext