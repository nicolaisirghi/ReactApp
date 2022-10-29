import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
const Header = (props) =>{
    return (<header className={classes.header}>
        <img src="https://i.pinimg.com/474x/21/01/58/21015874e0f1f8964da0ce60f0e93f66--logodesign-behance-net.jpg"/>
        <div className={classes.loginBlock}>
            {
                props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>:
                    <NavLink to={'/login'}>Login</NavLink>

            }
        </div>
    </header>);
}
export default Header;