import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetch_forecast, fetch_weather } from '../logic/slice'
import { Foot, Menu } from '../contents/contents'
import { NavLink, useParams } from 'react-router-dom'
import './one.css'
import '../contents/root.css'

const One = () => {
   const dispatch = useDispatch()
   const { forecast, weather, loading, error } = useSelector((state) => state.weather)
   const { city } = useParams()
   let id = null
   if (city == null) id = 'incheon'
   else id = city
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
   const list = () => {
      let out = []
      for (let i = 8; i < forecast.list.length; i += 8) {
         const src = `https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png`
         let time = ''
         if (i == 8) time = '내일'
         else if (i == 16) time = '모레'
         else if (i == 24) time = '글피'
         else if (i == 32) time = '그글피'
         out.push(
            <li key={i} className="content2_forecast_list">
               <img src={src}></img>
               <span className="jungan">{time}</span>
               <span className="jungan">{forecast.list[i].main.temp}°C</span>
            </li>
         )
      }
      return out
   }
   return (
      <div className="one">
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
            </div>
            <NavLink to={'/daily_detail/' + id} className="content1_detail">
               자세히
            </NavLink>
         </div>
         <div className="contents">
            <h1>내일의 날씨</h1>
         </div>

         <div className="content2">
            <ul className="content2_forecast">{list()}</ul>
            <NavLink to={'/week_detail/' + id} className="content1_detail">
               자세히
            </NavLink>
         </div>
         <Foot></Foot>
      </div>
   )
}
export default One
