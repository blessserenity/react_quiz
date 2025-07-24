import '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get_forecast, get_weather } from '../api/api'
export const fetch_weather = createAsyncThunk('weather/fetch', async (city) => {
   const response = await get_weather(city)
   return response.data
})
export const fetch_forecast = createAsyncThunk('forecast/fetch', async (city) => {
   const response = await get_forecast(city)
   return response.data
})
const weather_slice = createSlice({
   name: 'weather',
   initialState: {
      forecast: null,
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
         .addCase(fetch_forecast.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetch_forecast.fulfilled, (state, action) => {
            state.loading = false
            state.forecast = action.payload
         })
         .addCase(fetch_forecast.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})
export default weather_slice.reducer
