import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
const MyHeader = (props) =>{
    return (
        <div className={classes.loginBlock}>
            {
                props.isAuth ? <div><img src={props.photo} style={{width:"36px"}}/> {props.login} - <button className={classes.btn} onClick={props.logout}>Log out</button></div>:
                    <NavLink to={'/login'}>Login</NavLink>

            }
        </div>
   );
}
export default MyHeader;