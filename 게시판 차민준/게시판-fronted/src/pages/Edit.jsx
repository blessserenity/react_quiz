import { Title } from '../components/Components'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBoardsThunk, fetchBoardsThunk, updateBoardThunk } from '../redux/boardSlice'
import { checkAuthStatusThunk } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Edit = () => {
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)
   const { member, isAuthenticated } = useSelector((state) => state.auth)
   const queryDetail = window.location.search.substring(1)
   const navigate = useNavigate()

   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState('')
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
      dispatch(checkAuthStatusThunk())
   }, [dispatch, page])
   useEffect(() => {
      if (boards.length > 0 && queryDetail && boards[queryDetail]) {
         console.log(boards[queryDetail])
         setTitle(boards[queryDetail].title)
         setContent(boards[queryDetail].content)
         setImgUrl(`${import.meta.env.VITE_APP_API_URL}${boards[queryDetail].img}`)
         console.log(imgUrl)
      }
   }, [boards, queryDetail])

   if (loading) {
      return <>{Title('로딩중')}</>
   }
   if (!isAuthenticated) {
      return <>{Title('로그인 되어 있지 않습니다')}</>
   }

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
   const onBoardEdit = (boardData) => {
      const id = boards[queryDetail].id
      dispatch(updateBoardThunk({ id, boardData }))
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => {
            console.error('게시물 등록 에러 : ', error)
            alert(`게시물 등록에 실패했습니다 ${error}`)
         })
   }

   const onClickEdit = (e) => {
      e.preventDefault()

      if (!title.trim()) {
         alert('제목이 비어있어요')
         return
      }
      if (!content.trim()) {
         alert('내용이 비어있어요')
         return
      }

      const formData = new FormData()

      formData.append('title', title)
      formData.append('content', content)

      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
         formData.append('img', encodedFile)
      }
      onBoardEdit(formData)
   }

   const onClickDelete = (id) => {
      dispatch(deleteBoardsThunk(id))
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => {
            console.error('게시물 삭제 중 오류 발생: ', error)
            alert('게시물 삭제에 실패했습니다.' + error)
         })
   }

   return (
      <div>
         {Title('수정')}
         {boards[queryDetail].member_id == member.id ? (
            <div>
               <textarea value={title} autoFocus onChange={(e) => setTitle(e.target.value)} style={{ resize: 'none', width: '500px', padding: '10px' }} placeholder="제목을 입력해주세요"></textarea>
               <br></br>
               <label style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
                  이미지 업로드
                  <input type="file" name="img" accept="image/*" hidden onChange={onChangeImageInput}></input>
               </label>
               <br></br>
               {imgUrl && <img src={`${imgUrl}`} style={{ width: '500px', padding: '10px' }}></img>}
               <br></br>
               <textarea placeholder="내용을 입력해주세요" style={{ resize: 'none', width: '500px', height: '500px', padding: '10px' }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
               {!loading ? (
                  <>
                     <input value="수정" type="submit" onClick={onClickEdit} style={{ cursor: 'pointer', marginLeft: '420px' }}></input>
                     <input onClick={() => onClickDelete(boards[queryDetail].id)} value="삭제" style={{ cursor: 'pointer', border: '1px solid red', width: '30px' }}></input>
                  </>
               ) : (
                  <></>
               )}
            </div>
         ) : (
            <h1>유저가 일치하지 않아요</h1>
         )}
      </div>
   )
}
export default Edit
