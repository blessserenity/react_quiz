import './App.css'
import { Provider } from 'react-redux'
import One from './pages/one'
import Null1 from './pages/null'
import Store from './logic/store'
import Two from './pages/two'
import Three from './pages/three'
import Four from './pages/four'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
   return (
      <Provider store={Store}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<One></One>}></Route>
               <Route path="/:city" element={<One></One>}></Route>
               <Route path="/map" element={<Two></Two>}></Route>
               <Route path="/*" element={<Null1></Null1>}></Route>
               <Route path="/daily_detail/:city" element={<Three></Three>}></Route>
               <Route path="/week_detail/:city" element={<Four></Four>}></Route>
            </Routes>
         </BrowserRouter>
      </Provider>
   )
}

export default App
