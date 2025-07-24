import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchGenre } from '../../features/movieSlice'

function GenreList() {
   const dispatch = useDispatch()
   const { GenreList, loading, error } = useSelector((state) => state.movies)
   //    const st = useSelector((state) => state.movies.GenreList)
   useEffect(() => {
      dispatch(fetchGenre())
   }, [dispatch])
   if (loading) return <p>로딩중...</p>
   if (error) return <p>Error: {error}</p>
   //    const set = st
   //    console.log(set)
   return (
      <div style={{ padding: '20px' }}>
         {GenreList && (
            <div>
               <h1>장르 목록</h1>
               <ul>
                  {GenreList.map((genre) => (
                     <li>{genre.name}</li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   )
}

export default GenreList
