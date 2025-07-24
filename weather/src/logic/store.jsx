import { configureStore } from '@reduxjs/toolkit'
import weatherreducer from './slice'
const store = configureStore({
   reducer: {
      weather: weatherreducer,
   },
})
export default store
