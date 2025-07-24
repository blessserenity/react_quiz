import { useEffect, useState } from 'react'
import { Title, Board } from '../components/Components'
import '../css/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, loginMemberThunk } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const onClickLogin = (e) => {
      e.preventDefault()
      if (!email.trim() || !password.trim()) {
         alert('입력이 다 안 된 것 같아요')
         return
      }

      dispatch(loginMemberThunk({ email, password }))
         .unwrap()
         .then(() => navigate('/'))
         .catch((error) => {
            console.error('로그인 실패 : ', error)
            return <div>{Title(error)}</div>
         })
   }
   return (
      <div>
         {Title('로그인')}
         <div className="loginInput">
            <ul>
               <li>
                  <label>이메일</label>
               </li>
               <li>
                  <input
                     type="email"
                     autoFocus
                     onChange={(e) => {
                        setEmail(e.target.value)
                     }}
                  ></input>
               </li>
               <li>
                  <label>비밀번호</label>
               </li>
               <li>
                  <input
                     type="password"
                     onChange={(e) => {
                        setPassword(e.target.value)
                     }}
                  ></input>
               </li>
               <li>
                  <a href="/register" className="loginInputRegister">
                     회원가입
                  </a>
                  {loading ? (
                     <div style={{ display: 'inline-block' }}>로딩중</div>
                  ) : (
                     <button type="submit" onClick={onClickLogin}>
                        완료
                     </button>
                  )}
               </li>
            </ul>
         </div>
      </div>
   )
}
export default Login
