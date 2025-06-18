import { Route, Routes } from 'react-router-dom'
import MovieList from './components/UseRedux/MovieList'
import MovieDetail from './components/UseRedux/MovieDetail'
import NotFound from './components/UseRedux/NotFound'
import Ganrelist from './components/UseRedux/GenreList'
function App() {
   return (
      <Routes>
         <Route path="/" element={<MovieList />} />
         <Route path="/detail/:movieId" element={<MovieDetail />} />
         <Route path="/genre" element={<Ganrelist />} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App
