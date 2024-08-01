import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      // immer allow mutation, but not new replacement
      // so state = action.payload will not work
      return action.payload
    },
    resetMessages: (state, action) => {
      return []
    },
  },
})
export const { setMessages, resetMessages } = messageSlice.actions
export default messageSlice.reducer
