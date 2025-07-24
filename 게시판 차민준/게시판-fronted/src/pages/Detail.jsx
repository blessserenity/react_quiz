import { Title } from '../components/Components'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardsThunk } from '../redux/boardSlice'

const Detail = () => {
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])

   const queryDetail = window.location.search.substring(1)
   let detailNumber = ''

   for (let i = 0; i < boards.length; i++) {
      if (boards[i].id == queryDetail) detailNumber = i
   }
   return (
      <div>
         {Title('자세히')}
         {!loading ? (
            <>
               {console.log(boards)}
               <h2 style={{ width: '500px', padding: '10px' }}>{boards[detailNumber].title}</h2>
               <br></br>
               <img style={{ width: '500px', padding: '10px' }} src={`${import.meta.env.VITE_APP_API_URL}${boards[detailNumber].img}`}></img>
               <p style={{ width: '500px', padding: '10px' }}>{boards[detailNumber].content}</p>
               <a href={`edit?${detailNumber}`}>
                  <input style={{ cursor: 'pointer', marginLeft: '470px' }} type="button" value="수정"></input>
               </a>
            </>
         ) : (
            <>로딩중</>
         )}
      </div>
   )
}
export default Detail
