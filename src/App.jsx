import { useState } from 'react'
import './App.css'
import { useMemo } from 'react'
import { useCallback } from 'react'
function App() {
   const [data, set_data] = useState([{ id: 0, name: '꼬부기', src: 'https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000701.png', origin_src: 701 }])
   const [input, set_value] = useState({
      id: 1,
      value: '',
   })
   const on_change = useCallback((e) => {
      set_value({ ...input, value: e.target.value })
   })
   const regist_src = useCallback((src) => {
      if (src < 1000) src = `000${src}`
      else if (src < 10000) src = `00${src}`
      else if (src < 100000) src = `0${src}`
      return `https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/${src}.png`
   })
   const on_click = useCallback(() => {
      let src = ''
      if (input.value == '이상해씨') src = 101
      else if (input.value == '파이리') src = 401
      else if (input.value == '꼬부기') src = 701
      else if (input.value == '캐터피') src = 1001
      else if (input.value == '뿔충이') src = 1301
      else if (input.value == '구구') src = 1601
      else if (input.value == '꼬렛') src = 1901
      else if (input.value == '깨비참') src = 2101
      else if (input.value == '아보') src = 2301
      else if (input.value == '피카츄') src = 2501
      else if (input.value == '모래두지') src = 2701
      else if (input.value == '니드런') src = 2901
      else if (input.value == '삐삐') src = 3501
      else if (input.value == '식스테일') src = 3701
      else if (input.value == '푸린') src = 3901
      else if (input.value == '주뱃') src = 4101
      else if (input.value == '뚜벅초') src = 4301
      else if (input.value == '파라스') src = 4601
      else if (input.value == '콘팡') src = 4801
      else if (input.value == '디그다') src = 5001
      else if (input.value == '나옹') src = 5201
      else if (input.value == '고라파덕') src = 5401
      else if (input.value == '망키') src = 5601
      else if (input.value == '가디') src = 5801
      else if (input.value == '발챙이') src = 6001
      else if (input.value == '캐이시') src = 6301
      else if (input.value == '알통몬') src = 6601
      else if (input.value == '모다피') src = 6901
      else if (input.value == '왕눈해') src = 7201
      else if (input.value == '꼬마돌') src = 7401
      else if (input.value == '포니타') src = 7701
      else if (input.value == '야돈') src = 7901
      else if (input.value == '코일') src = 8101
      else if (input.value == '파오리') src = 8301
      else if (input.value == '두두') src = 8401
      else if (input.value == '쥬쥬') src = 8601
      else if (input.value == '질뻑이') src = 8801
      else if (input.value == '셀러') src = 9001
      else if (input.value == '고오스') src = 9201
      else if (input.value == '롱스톤') src = 9501
      else if (input.value == '슬리프') src = 9601
      else return
      const next = data.concat({
         id: input.id,
         name: input.value,
         src: regist_src(src),
         checked: 'unchecked',
         origin_src: src,
      })
      set_data(next)
      set_value({
         id: input.id + 1,
         value: '',
      })
   })
   const remove = useCallback((e) => {
      let list = []
      for (let i = 0; i < data.length - 1; i++) {
         list.push(data[i])
      }
      console.log(list)
      set_data(list)
   })
   const double_remove = useCallback((e) => {
      let list = []
      for (let i = 0; i < data.length; i++) {
         if (data[i].id != e) list.push(data[i])
         else {
            data[i].origin_src = data[i].origin_src + 100
            data[i].src = regist_src(data[i].origin_src)
            if (data[i].checked == 'checked') data[i].checked = 'unchecked'
            else data[i].checked = 'checked'
            list.push(data[i])
         }
      }
      set_data(list)
   })
   const list = useMemo(() => {
      let out = []
      for (let i = 0; i < data.length; i++) {
         out.push(
            <li class={data[i].checked} id={data[i].id} onDoubleClick={() => double_remove(data[i].id)}>
               <img src={data[i].src}></img>
               <p>{data[i].name}</p>
            </li>
         )
      }
      return out
   }, [data])
   const key_down = useCallback((e) => {
      if (e.key == 'Enter') on_click()
   })
   return (
      <div class="temp">
         <input onKeyDown={key_down} onChange={on_change} value={input.value} placeholder="이름을 입력해주세요"></input>
         <button onClick={on_click}>등록할래요</button>
         <button onClick={remove}>삭제할래요</button>
         <div class="pic">
            <ul>{list}</ul>
         </div>
      </div>
   )
}
export default App
