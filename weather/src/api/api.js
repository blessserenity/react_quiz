import axios from 'axios'
const key = import.meta.env.VITE_WEATHER_API_KEY
const base_url = `https://api.openweathermap.org/data/2.5`
const forecast_url = `https://api.openweathermap.org/data/2.5`
const weather_api = axios.create({
   baseURL: base_url,
   headers: {
      Accept: 'application/json',
   },
})
const forecast_api = axios.create({
   baseURL: forecast_url,
   headers: {
      Accept: 'application/json',
   },
})
export const get_weather = async (city) => {
   const response = await weather_api.get(`/weather?q=${city}&appid=${key}&units=metric&lang=kr`)
   return response
}
export const get_forecast = async (city) => {
   const response = await forecast_api.get(`/forecast?q=${city}&appid=${key}&units=metric&lang=kr`)
   return response
}
export default get_weather
