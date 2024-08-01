// store.js
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { combineReducers } from 'redux'

// Import slice reducers
import postsReducer from './postsSlice'
import tagsReducer from './tagsSlice'
import messageReducer from './messageSlice'

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
}

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  posts: postsReducer,
  tags: tagsReducer,
  messages: messageReducer,
})

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/REGISTER',
        ],
        ignoredPaths: ['persist'],
      },
    }),
})

// Create a persistor
const persistor = persistStore(store)

console.log('Initial Store State:', store.getState())

export { store, persistor }
