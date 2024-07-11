import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './postsSlice'
import tagsSlice from './tagsSlice'

const store = configureStore({
  reducer: {
    posts: postsSlice,
    tags: tagsSlice
  },
})
console.log('Initial Store State:', store.getState())

export default store
