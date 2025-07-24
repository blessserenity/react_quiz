import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import boardReducer from './boardSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      boards: boardReducer,
   },
})

export default store
