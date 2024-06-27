import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './postsSlice'

const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
})

console.log('Initial Store State:', store.getState())

export default store
