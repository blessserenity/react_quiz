import { NavLink } from 'react-router-dom'
import '../contents/contents.css'
import '../contents/root.css'
import { useParams } from 'react-router-dom'
export const Menu = () => {
   const { city } = useParams()
   let id = null
   if (city == null) id = 'incheon'
   else id = city
   return (
      <div className="menu">
         <ul>
            <li className="menu_list1">
               <NavLink to={'/' + id}>
                  <div className="menu_logo">Weather</div>
               </NavLink>
            </li>
            <li className="menu_list2">
               <NavLink to="/map" className="menu_map">
                  Map
               </NavLink>
            </li>
            <li className="menu_right">
               <NavLink to="/errororor?">
                  <div className="login">Login</div>
               </NavLink>
            </li>
         </ul>
      </div>
   )
}
export const Foot = () => {
   return <div className="foot">Weather</div>
}
