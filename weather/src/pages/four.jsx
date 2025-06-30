import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetch_forecast, fetch_weather } from '../logic/slice'
import { Foot, Menu } from '../contents/contents'
import { useParams } from 'react-router-dom'
import './four.css'
import './one.css'
const Four = () => {
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
   const list = () => {
      let out = []
      for (let i = 8; i < forecast.list.length; i += 8) {
         const src = `https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@4x.png`
         let time = ''
         if (i == 8) time = '내일'
         else if (i == 16) time = '모레'
         else if (i == 24) time = '글피'
         else if (i == 32) time = '그글피'
         out.push(
            <div key={i} className="content2_forecast_list">
               <img src={src}></img>
               <span className="jungan">{time}</span>
               <span className="jungan">{forecast.list[i].main.temp}°C</span>
               <span className="jungan">구름 : {forecast.list[i].clouds.all}</span>
               <span className="jungan">체감 온도 : {forecast.list[i].main.feels_like}°C</span>
               <span className="jungan">습도 : {forecast.list[i].main.humidity}</span>
               <span className="jungan">기압 : {forecast.list[i].main.pressure}</span>
               <span className="jungan">최대 온도 : {forecast.list[i].main.temp_max}°C</span>
               <span className="jungan">최소 온도 : {forecast.list[i].main.temp_min}°C</span>
            </div>
         )
      }
      return out
   }
   return (
      <div className="four">
         <Menu></Menu>
         <div className="contents">
            <h1>내일의 날씨 : {weather.name}</h1>
         </div>
         <div className="content1">
            <ul className="content1_list">{list()}</ul>
         </div>
         <Foot></Foot>
      </div>
   )
}
export default Four
