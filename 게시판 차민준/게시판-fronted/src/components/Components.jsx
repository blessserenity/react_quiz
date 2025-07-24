import { useEffect, useState } from 'react'
import '../css/components.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchBoardsThunk } from '../redux/boardSlice'
import dayjs from 'dayjs'
import { checkAuthStatusThunk } from '../redux/authSlice'

export const Title = (text) => {
   return <h1 className="title">{text}</h1>
}
export const Board = () => {
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)
   const { member } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   const onChangePage = (event, value) => {
      setPage(value)
   }

   console.log(member)

   const table = () => {
      let out = []
      for (let i = 0; i < boards.length; i++) {
         const link = `/detail?${boards[i].id}`
         out.push(
            <tr key={i}>
               <td>
                  <a href={link}>{boards[i].id}</a>
               </td>
               <td>
                  <a href={link}>{boards[i].title}</a>
               </td>
               <td>
                  <a href={link}>{boards[i].member_id}</a>
               </td>
               <td>
                  <a href={link}>{dayjs(boards[i].createdAt).format('YYYY-MM-DD HH:mm:ss')}</a>
               </td>
            </tr>
         )
      }
      return out
   }

   return (
      <table border={1} cellSpacing={0} style={{ border: '0px solid black' }}>
         <tbody>
            <tr>
               <th>번호</th>
               <th>제목</th>
               <th>글쓴이</th>
               <th>시간</th>
            </tr>
            {table()}
         </tbody>
      </table>
   )
}
