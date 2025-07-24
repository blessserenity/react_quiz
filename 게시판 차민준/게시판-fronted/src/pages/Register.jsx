import { useEffect, useState } from 'react'
import '../components/Components'
import { Title } from '../components/Components'
import 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, registerMemberThunk } from '../redux/authSlice'

const Register = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false)

   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const onclickRegister = () => {
      if (!email.trim() || !name.trim() || !password.trim()) {
         alert('모두 입력해주세요')
         return
      }
      dispatch(registerMemberThunk({ email, name, password }))
         .unwrap()
         .then(() => {
            setIsSignupComplete(true)
         })
         .catch((error) => {
            console.error('회원가입 에러 : ', error)
            return <div>{Title('회원가입 에러')}</div>
         })
   }
   if (isSignupComplete) {
      return (
         <div>
            {Title('회원가입이 완료되었어요')}
            <a href="/login" className="loginInputRegister">
               로그인 하러 가기
            </a>
         </div>
      )
   }
   return (
      <div>
         {Title('회원가입')}
         <div className="loginInput">
            <ul>
               <li>
                  <label>이메일</label>
               </li>
               <li>
                  <input
                     value={email}
                     onChange={(e) => {
                        setEmail(e.target.value)
                     }}
                     type="email"
                     autoFocus
                     required
                  ></input>
               </li>
               <li>
                  <label>이름</label>
               </li>
               <li>
                  <input
                     value={name}
                     onChange={(e) => {
                        setName(e.target.value)
                     }}
                     type="text"
                     required
                  ></input>
               </li>
               <li>
                  <label>비밀번호</label>
               </li>
               <li>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required></input>
               </li>
               <li>
                  {loading ? (
                     <div>로딩중...</div>
                  ) : (
                     <button onClick={onclickRegister} type="submit" className="registerButton">
                        완료
                     </button>
                  )}
               </li>
            </ul>
         </div>
      </div>
   )
}
export default Register
