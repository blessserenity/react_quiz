import { Foot, Menu } from '../contents/contents'
import './two.css'
import { NavLink } from 'react-router-dom'
const two = () => {
   return (
      <div className="two">
         <Menu></Menu>
         <ul className="two_list">
            <li>
               <NavLink to={'/incheon'}>인천</NavLink>
            </li>
            <li>
               <NavLink to={'/seoul'}>서울</NavLink>
            </li>
            <li>
               <NavLink to={'/busan'}>부산</NavLink>
            </li>
            <li>
               <NavLink to={'/daegu'}>대구</NavLink>
            </li>
            <li>
               <NavLink to={'/ulsan'}>울산</NavLink>
            </li>
            <li>
               <NavLink to={'/daejeon'}>대전</NavLink>
            </li>
            <li>
               <NavLink to={'/gwangju'}>광주</NavLink>
            </li>
         </ul>
         <Foot></Foot>
      </div>
   )
}
export default two
