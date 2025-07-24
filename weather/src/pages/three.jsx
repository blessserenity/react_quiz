import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetch_forecast, fetch_weather } from '../logic/slice'
import { Foot, Menu } from '../contents/contents'
import { useParams } from 'react-router-dom'
import './three.css'
import './one.css'
const Three = () => {
   const { city } = useParams()
   let id = null
   if (city == null) id = 'incheon'
   else id = city
   const dispatch = useDispatch()
   const { forecast, weather, loading, error } = useSelector((state) => state.weather)
   useEffect(() => {
      dispatch(fetch_weather(id))
      dispatch(fetch_forecast(id))
   }, [dispatch, id])
   if (loading) return <p>로딩중..</p>
   if (error) return <p>Error:{error}</p>
   if (!weather || !weather.weather || !forecast || !forecast.list) {
      return <p>날씨 데이터를 불러오는 중입니다...</p>
   }
   const weather_img = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
   return (
      <div className="three">
         <Menu></Menu>
         <div className="contents">
            <h1>오늘의 날씨 : {weather.name}</h1>
         </div>
         <div className="content1">
            <div className="content1_picture">
               <img src={weather_img}></img>
            </div>
            <div className="content1_text">
               <span className="content1_text_weather">{weather.weather[0].description}</span>
               <br></br>
               <span className="content1_text_temp">온도 : {weather.main.temp}°C</span>
               <br></br>
               <span className="content1_text_temp">구름 : {weather.clouds.all}</span> <br></br>
               <span className="content1_text_temp">체감 온도 : {weather.main.feels_like}°C</span> <br></br>
               <span className="content1_text_temp">습도 : {weather.main.humidity}</span> <br></br>
               <span className="content1_text_temp">기압 : {weather.main.pressure}</span> <br></br>
               <span className="content1_text_temp">최대 온도 : {weather.main.temp_max}°C</span> <br></br>
               <span className="content1_text_temp">최소 온도 : {weather.main.temp_min}°C</span> <br></br>
            </div>
         </div>
         <Foot></Foot>
      </div>
   )
}
export default Three
