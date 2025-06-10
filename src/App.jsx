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
      else if (input.value == '크랩') src = 9801
      else if (input.value == '탕구리') src = 10401
      else if (input.value == '럭키') src = 11301
      else if (input.value == '잉어킹') src = 12901
      else if (input.value == '라프라스') src = 13101
      else if (input.value == '메타몽') src = 13201
      else if (input.value == '이브이') src = 13301
      else if (input.value == '잠만보') src = 14301
      else if (input.value == '프리져') src = 14401
      else if (input.value == '미뇽') src = 14701
      else if (input.value == '뮤츠') src = 15001
      else if (input.value == '뮤') src = 15101
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
            if (data[i].origin_src == 101) data[i].name = '이상해씨'
            else if (data[i].origin_src == 201) data[i].name = '이상해풀'
            else if (data[i].origin_src == 301) data[i].name = '이상해꽃'
            else if (data[i].origin_src == 401) data[i].name = '파이리'
            else if (data[i].origin_src == 501) data[i].name = '리자드'
            else if (data[i].origin_src == 601) data[i].name = '리자몽'
            else if (data[i].origin_src == 701) data[i].name = '꼬부기'
            else if (data[i].origin_src == 801) data[i].name = '어니부기'
            else if (data[i].origin_src == 901) data[i].name = '거북왕'
            else if (data[i].origin_src == 1001) data[i].name = '캐터피'
            else if (data[i].origin_src == 1101) data[i].name = '단데기'
            else if (data[i].origin_src == 1201) data[i].name = '버터플'
            else if (data[i].origin_src == 1301) data[i].name = '뿔충이'
            else if (data[i].origin_src == 1401) data[i].name = '딱충이'
            else if (data[i].origin_src == 1501) data[i].name = '독침붕'
            else if (data[i].origin_src == 1601) data[i].name = '구구'
            else if (data[i].origin_src == 1701) data[i].name = '피죤'
            else if (data[i].origin_src == 1801) data[i].name = '피죤투'
            else if (data[i].origin_src == 1901) data[i].name = '꼬렛'
            else if (data[i].origin_src == 2001) data[i].name = '레트라'
            else if (data[i].origin_src == 2101) data[i].name = '깨비참'
            else if (data[i].origin_src == 2201) data[i].name = '깨비드릴조'
            else if (data[i].origin_src == 2301) data[i].name = '아보'
            else if (data[i].origin_src == 2401) data[i].name = '아보크'
            else if (data[i].origin_src == 2501) data[i].name = '피카츄'
            else if (data[i].origin_src == 2601) data[i].name = '라이츄'
            else if (data[i].origin_src == 2701) data[i].name = '모래두지'
            else if (data[i].origin_src == 2801) data[i].name = '고지'
            else if (data[i].origin_src == 2901) data[i].name = '니드런♀'
            else if (data[i].origin_src == 3001) data[i].name = '니드리나'
            else if (data[i].origin_src == 3101) data[i].name = '니드퀸'
            else if (data[i].origin_src == 3201) data[i].name = '니드런♂'
            else if (data[i].origin_src == 3301) data[i].name = '니드리노'
            else if (data[i].origin_src == 3401) data[i].name = '니드킹'
            else if (data[i].origin_src == 3501) data[i].name = '삐삐'
            else if (data[i].origin_src == 3601) data[i].name = '픽시'
            else if (data[i].origin_src == 3701) data[i].name = '식스테일'
            else if (data[i].origin_src == 3801) data[i].name = '나인테일'
            else if (data[i].origin_src == 3901) data[i].name = '푸린'
            else if (data[i].origin_src == 4001) data[i].name = '푸크린'
            else if (data[i].origin_src == 4101) data[i].name = '주뱃'
            else if (data[i].origin_src == 4201) data[i].name = '골뱃'
            else if (data[i].origin_src == 4301) data[i].name = '뚜벅초'
            else if (data[i].origin_src == 4401) data[i].name = '냄새꼬'
            else if (data[i].origin_src == 4501) data[i].name = '라플레시아'
            else if (data[i].origin_src == 4601) data[i].name = '파라스'
            else if (data[i].origin_src == 4701) data[i].name = '파라섹트'
            else if (data[i].origin_src == 4801) data[i].name = '콘팡'
            else if (data[i].origin_src == 4901) data[i].name = '도나리'
            else if (data[i].origin_src == 5001) data[i].name = '디그다'
            else if (data[i].origin_src == 5101) data[i].name = '닥트리오'
            else if (data[i].origin_src == 5201) data[i].name = '나옹'
            else if (data[i].origin_src == 5301) data[i].name = '페르시온'
            else if (data[i].origin_src == 5401) data[i].name = '고라파덕'
            else if (data[i].origin_src == 5501) data[i].name = '골덕'
            else if (data[i].origin_src == 5601) data[i].name = '망키'
            else if (data[i].origin_src == 5701) data[i].name = '성원숭'
            else if (data[i].origin_src == 5801) data[i].name = '가디'
            else if (data[i].origin_src == 5901) data[i].name = '윈디'
            else if (data[i].origin_src == 6001) data[i].name = '발챙이'
            else if (data[i].origin_src == 6101) data[i].name = '슈륙챙이'
            else if (data[i].origin_src == 6201) data[i].name = '강챙이'
            else if (data[i].origin_src == 6301) data[i].name = '캐이시'
            else if (data[i].origin_src == 6401) data[i].name = '윤겔라'
            else if (data[i].origin_src == 6501) data[i].name = '후딘'
            else if (data[i].origin_src == 6601) data[i].name = '알통몬'
            else if (data[i].origin_src == 6701) data[i].name = '근육몬'
            else if (data[i].origin_src == 6801) data[i].name = '괴력몬'
            else if (data[i].origin_src == 6901) data[i].name = '모다피'
            else if (data[i].origin_src == 7001) data[i].name = '우츠동'
            else if (data[i].origin_src == 7101) data[i].name = '우츠보트'
            else if (data[i].origin_src == 7201) data[i].name = '왕눈해'
            else if (data[i].origin_src == 7301) data[i].name = '독파리'
            else if (data[i].origin_src == 7401) data[i].name = '꼬마돌'
            else if (data[i].origin_src == 7501) data[i].name = '데구리'
            else if (data[i].origin_src == 7601) data[i].name = '딱구리'
            else if (data[i].origin_src == 7701) data[i].name = '포니타'
            else if (data[i].origin_src == 7801) data[i].name = '날쌩마'
            else if (data[i].origin_src == 7901) data[i].name = '야돈'
            else if (data[i].origin_src == 8001) data[i].name = '야도란'
            else if (data[i].origin_src == 8101) data[i].name = '코일'
            else if (data[i].origin_src == 8201) data[i].name = '레어코일'
            else if (data[i].origin_src == 8301) data[i].name = '파오리'
            else if (data[i].origin_src == 8401) data[i].name = '두두'
            else if (data[i].origin_src == 8501) data[i].name = '두트리오'
            else if (data[i].origin_src == 8601) data[i].name = '쥬쥬'
            else if (data[i].origin_src == 8701) data[i].name = '쥬레곤'
            else if (data[i].origin_src == 8801) data[i].name = '질퍽이'
            else if (data[i].origin_src == 8901) data[i].name = '질뻐기'
            else if (data[i].origin_src == 9001) data[i].name = '셸러'
            else if (data[i].origin_src == 9101) data[i].name = '파르셀'
            else if (data[i].origin_src == 9201) data[i].name = '고오스'
            else if (data[i].origin_src == 9301) data[i].name = '고우스트'
            else if (data[i].origin_src == 9401) data[i].name = '팬텀'
            else if (data[i].origin_src == 9501) data[i].name = '롱스톤'
            else if (data[i].origin_src == 9601) data[i].name = '슬리프'
            else if (data[i].origin_src == 9701) data[i].name = '슬리퍼'
            else if (data[i].origin_src == 9801) data[i].name = '크랩'
            else if (data[i].origin_src == 9901) data[i].name = '킹크랩'
            else if (data[i].origin_src == 10001) data[i].name = '찌리리공'
            else if (data[i].origin_src == 10101) data[i].name = '붐볼'
            else if (data[i].origin_src == 10201) data[i].name = '아라리'
            else if (data[i].origin_src == 10301) data[i].name = '나시'
            else if (data[i].origin_src == 10401) data[i].name = '탕구리'
            else if (data[i].origin_src == 10501) data[i].name = '텅구리'
            else if (data[i].origin_src == 10601) data[i].name = '시라소몬'
            else if (data[i].origin_src == 10701) data[i].name = '홍수몬'
            else if (data[i].origin_src == 10801) data[i].name = '내루미'
            else if (data[i].origin_src == 10901) data[i].name = '또가스'
            else if (data[i].origin_src == 11001) data[i].name = '또도가스'
            else if (data[i].origin_src == 11101) data[i].name = '뿔카노'
            else if (data[i].origin_src == 11201) data[i].name = '코뿌리'
            else if (data[i].origin_src == 11301) data[i].name = '럭키'
            else if (data[i].origin_src == 11401) data[i].name = '덩쿠리'
            else if (data[i].origin_src == 11501) data[i].name = '캥카'
            else if (data[i].origin_src == 11601) data[i].name = '쏘드라'
            else if (data[i].origin_src == 11701) data[i].name = '시드라'
            else if (data[i].origin_src == 11801) data[i].name = '콘치'
            else if (data[i].origin_src == 11901) data[i].name = '왕콘치'
            else if (data[i].origin_src == 12001) data[i].name = '별가사리'
            else if (data[i].origin_src == 12101) data[i].name = '아쿠스타'
            else if (data[i].origin_src == 12201) data[i].name = '마임맨'
            else if (data[i].origin_src == 12301) data[i].name = '스라크'
            else if (data[i].origin_src == 12401) data[i].name = '루주라'
            else if (data[i].origin_src == 12501) data[i].name = '에레브'
            else if (data[i].origin_src == 12601) data[i].name = '마그마'
            else if (data[i].origin_src == 12701) data[i].name = '쁘사이저'
            else if (data[i].origin_src == 12801) data[i].name = '켄타로스'
            else if (data[i].origin_src == 12901) data[i].name = '잉어킹'
            else if (data[i].origin_src == 13001) data[i].name = '갸라도스'
            else if (data[i].origin_src == 13101) data[i].name = '라프라스'
            else if (data[i].origin_src == 13201) data[i].name = '메타몽'
            else if (data[i].origin_src == 13301) data[i].name = '이브이'
            else if (data[i].origin_src == 13401) data[i].name = '샤미드'
            else if (data[i].origin_src == 13501) data[i].name = '쥬피썬더'
            else if (data[i].origin_src == 13601) data[i].name = '부스터'
            else if (data[i].origin_src == 13701) data[i].name = '폴리곤'
            else if (data[i].origin_src == 13801) data[i].name = '암나이트'
            else if (data[i].origin_src == 13901) data[i].name = '암스타'
            else if (data[i].origin_src == 14001) data[i].name = '투구'
            else if (data[i].origin_src == 14101) data[i].name = '투구푸스'
            else if (data[i].origin_src == 14201) data[i].name = '프테라'
            else if (data[i].origin_src == 14301) data[i].name = '잠만보'
            else if (data[i].origin_src == 14401) data[i].name = '프리져'
            else if (data[i].origin_src == 14501) data[i].name = '썬더'
            else if (data[i].origin_src == 14601) data[i].name = '파이어'
            else if (data[i].origin_src == 14701) data[i].name = '미뇽'
            else if (data[i].origin_src == 14801) data[i].name = '신뇽'
            else if (data[i].origin_src == 14901) data[i].name = '망나뇽'
            else if (data[i].origin_src == 15001) data[i].name = '뮤츠'
            else if (data[i].origin_src == 15101) data[i].name = '뮤'
            else if (data[i].origin_src == 15201) data[i].name = '치코리타'
            else if (data[i].origin_src == 15301) data[i].name = '베이리프'
            else if (data[i].origin_src == 15401) data[i].name = '메가니움'
            else if (data[i].origin_src == 15501) data[i].name = '브케인'
            else if (data[i].origin_src == 15601) data[i].name = '마그케인'
            else if (data[i].origin_src == 15701) data[i].name = '블레이범'
            else if (data[i].origin_src == 15801) data[i].name = '리아코'
            else if (data[i].origin_src == 15901) data[i].name = '엘리게이'
            else if (data[i].origin_src == 16001) data[i].name = '장크로다일'
            else if (data[i].origin_src == 17001) data[i].name = '꼬리선'
            else if (data[i].origin_src == 18001) data[i].name = '다꼬리'
            else if (data[i].origin_src == 18101) data[i].name = '부우부'
            else if (data[i].origin_src == 18201) data[i].name = '야부엉'
            else if (data[i].origin_src == 18301) data[i].name = '레디바'
            else if (data[i].origin_src == 18401) data[i].name = '레디안'
            else if (data[i].origin_src == 18501) data[i].name = '페이검'
            list.push(data[i])
         }
      }
      set_data(list)
   })
   const del = useCallback((e) => {
      let list = []
      for (let i = 0; i < data.length; i++) {
         if (data[i].id != e) list.push(data[i])
      }
      set_data(list)
   })
   const list = useMemo(() => {
      let out = []
      for (let i = 0; i < data.length; i++) {
         out.push(
            <li class={data[i].checked} id={data[i].id} onDoubleClick={() => double_remove(data[i].id)}>
               <img src={data[i].src}></img>
               <div style={{ display: 'flex' }}>
                  <p style={{ marginRight: '10px' }}>{data[i].name}</p>
                  <button onClick={() => del(data[i].id)}>삭제</button>
               </div>
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
