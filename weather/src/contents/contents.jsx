import '../contents/contents.css'
import '../contents/root.css'
export const Menu = () => {
   return (
      <div className="menu">
         <ul>
            <li>
               <div className="menu_logo">Weather</div>
            </li>
            <li>
               <div className="menu_map">Map</div>
            </li>
            <li className="login">Login</li>
         </ul>
      </div>
   )
}
