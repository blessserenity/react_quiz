import axios from 'axios'
const key = import.meta.env.VITE_WEATHER_API_KEY
const base_url = `https://api.openweathermap.org/data/2.5/weather?q=incheon&appid=${key}&units=metric&lang=kr`
const weather_api = axios.create({
   baseURL: base_url,
   headers: {
      Accept: 'application/json',
   },
})
export const get_weather = async () => {
   const response = await weather_api.get()
   return response
}
export default get_weather
