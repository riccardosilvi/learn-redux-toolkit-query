import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath] : apiSlice.reducer
  },
  // thunk middleware is "on by default"
  // we need to add the apiSlice middleware
  // it manages cache lifetimes and expiration
  // it should be placed after thunk and other middlewares
  middleware : getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware)
})
