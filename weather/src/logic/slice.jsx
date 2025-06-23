import '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import get_weather from '../api/api'
export const fetch_weather = createAsyncThunk('', async () => {
   const response = await get_weather()
   return response.data
})
const weather_slice = createSlice({
   name: 'weather',
   initialState: {
      weather: null,
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetch_weather.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetch_weather.fulfilled, (state, action) => {
            state.loading = false
            state.weather = action.payload
         })
         .addCase(fetch_weather.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})
export default weather_slice.reducer
