import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setTags: (state, action) => {
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

export const { setTags, setLoading, setError } = tagsSlice.actions
export default tagsSlice.reducer