import { Menu, Foot } from './components/Basic.jsx'
import Main from './pages/Main.jsx'
import 'react-router-dom'
import './app.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Regeister from './pages/Register.jsx'
import Write from './pages/Write.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './redux/authSlice.js'
import Error from './pages/Error.jsx'
import Detail from './pages/Detail.jsx'
import Edit from './pages/edit.jsx'
function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, member } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   return (
      <div>
         <Menu isAuthenticated={isAuthenticated} member={member}></Menu>
         <div className="contents">
            <Routes>
               <Route path="/" element={<Main></Main>}></Route>
               <Route path="/login" element={<Login></Login>}></Route>
               <Route path="/register" element={<Regeister></Regeister>}></Route>
               <Route path="/write" element={<Write></Write>}></Route>
               <Route path="/detail" element={<Detail></Detail>}></Route>
               <Route path="/edit" element={<Edit></Edit>}></Route>
               <Route path="/*" element={<Error></Error>}></Route>
            </Routes>
         </div>
         <Foot></Foot>
      </div>
   )
}

export default App
