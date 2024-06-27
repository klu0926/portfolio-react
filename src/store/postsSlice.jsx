import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.data = action.payload
      state.status = 'success'
    },
    setLoading: (state) => {
      state.status = 'loading'
    },
    setError: (state, action) => {
      state.status = 'error'
      state.error = action.payload
    },
  },
})
export const { setPosts, setLoading, setError } = postsSlice.actions
export default postsSlice.reducer
