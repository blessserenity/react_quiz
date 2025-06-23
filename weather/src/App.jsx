import './App.css'
import { Provider } from 'react-redux'
import One from './pages/one'
import Store from './logic/store'
function App() {
   return (
      <Provider store={Store}>
         <One></One>
      </Provider>
   )
}

export default App
