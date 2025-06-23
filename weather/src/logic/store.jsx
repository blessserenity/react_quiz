import { configureStore } from '@reduxjs/toolkit'
import weather_reducer from './slice'
const store = configureStore({
   reducer: {
      weather: weather_reducer,
   },
})
export default store
