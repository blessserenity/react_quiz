import { useState } from 'react'
import { Title } from '../components/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createWriteThunk } from '../redux/boardSlice'

const Write = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const onBoardWrite = (writeData) => {
      dispatch(createWriteThunk(writeData))
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => {
            console.error('게시물 등록 에러 : ', error)
            alert('게시물 등록에 실패했습니다')
         })
   }

   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState('')
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')

   const onChangeImageInput = (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      setImgFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }

   const onClickSubmit = (e) => {
      e.preventDefault()

      if (!title.trim()) {
         alert('제목이 비어있어요')
         return
      }
      if (!imgFile) {
         alert('이미지가 비어있어요')
         return
      }
      if (!content.trim()) {
         alert('내용이 비어있어요')
         return
      }

      const formData = new FormData()

      if (imgFile) {
         formData.append('title', title)
         formData.append('content', content)
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
         formData.append('img', encodedFile)
      }
      onBoardWrite(formData)
   }

   const { isAuthenticated } = useSelector((state) => state.auth)
   if (!isAuthenticated) return <div>{Title('로그인이 안되어있어요')}</div>

   return (
      <div>
         {Title('글쓰기')}
         <textarea autoFocus onChange={(e) => setTitle(e.target.value)} style={{ resize: 'none', width: '500px', padding: '10px' }} placeholder="제목을 입력해주세요"></textarea>
         <br></br>
         <label style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={onChangeImageInput}></input>
         </label>

         <br></br>
         {imgUrl && <img src={imgUrl} style={{ width: '500px', padding: '10px' }}></img>}
         <br></br>
         <textarea placeholder="내용을 입력해주세요" style={{ resize: 'none', width: '500px', height: '500px', padding: '10px' }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
         {!loading ? <input type="submit" onClick={onClickSubmit} style={{ cursor: 'pointer', marginLeft: '475px' }}></input> : <></>}
      </div>
   )
}
export default Write
