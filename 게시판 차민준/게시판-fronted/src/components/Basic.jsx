import '../css/basic.css'
import '../assets/root.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutMemberThunk } from '../redux/authSlice'
import { Title } from './Components'
export const Menu = ({ isAuthenticated, member }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onClickLogout = () => {
      dispatch(logoutMemberThunk())
         .unwrap()
         .then(() => {
            // navigate('/')
         })
         .catch((error) => {
            alert('로그아웃 실패 : ', error)
         })
   }
   return (
      <div className="menu">
         <ul>
            <li>
               <a href="/">
                  <img src="https://cdn-icons-png.flaticon.com/512/5493/5493668.png"></img>
               </a>
            </li>
            <li className="right">
               {isAuthenticated ? (
                  <a className="write" href="/write">
                     글쓰기
                  </a>
               ) : (
                  <div></div>
               )}
            </li>
            <li className="login">
               {isAuthenticated ? (
                  <a className="loginA" onClick={onClickLogout} style={{ cursor: 'pointer' }}>
                     로그아웃
                  </a>
               ) : (
                  <a className="loginA" href="/login">
                     로그인
                  </a>
               )}
            </li>
         </ul>
      </div>
   )
}

export const Foot = () => {
   return <div className="foot">footer</div>
}
