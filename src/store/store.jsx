// store.js
import { configureStore } from '@reduxjs/toolkit'

// Import slice reducers
import postsReducer from './postsSlice'
import tagsReducer from './tagsSlice'
import messageReducer from './messageSlice'

// Configure the store with individual slice reducers
const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
    messages: messageReducer,
  },
})

console.log('Initial Store State:', store.getState())

export { store }
