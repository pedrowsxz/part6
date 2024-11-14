import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationSetter(state, action) {
      state = action.payload.content
      return state
    },
    notificationRemover(state, action) {
      return ''
    }
  }
})

export const { notificationSetter, notificationRemover } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return async (dispatch) => {
    console.log(content)
    dispatch(notificationSetter({content})),
    setTimeout(() => { dispatch(notificationRemover()) }, timeout * 1000)
  }
}

export default notificationSlice.reducer