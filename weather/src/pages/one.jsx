import { useDispatch } from 'react-redux'
import { Button, ButtonGroup } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetch_weather } from '../logic/slice'
import { Menu } from '../contents/contents'
const One = () => {
   const dispatch = useDispatch()
   const { weather, loading, error } = useSelector((state) => state.weather)
   useEffect(() => {
      dispatch(fetch_weather())
   }, [dispatch])
   if (loading) return <p>로딩중..</p>
   if (error) return <p>Error:{error}</p>
   console.log(weather)
   return (
      <div className="one">
         <Menu></Menu>
         <h1>날씨</h1>
         <div>
            <ButtonGroup color="black" variant="contained">
               <Button color="success">인천</Button>
               <Button>인천</Button>
            </ButtonGroup>
         </div>
         <img src="https://openweathermap.org/img/wn/04d@4x.png"></img>
         <p>{weather.name}</p>
      </div>
   )
}
export default One
