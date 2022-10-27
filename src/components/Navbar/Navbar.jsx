import classes from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (<nav className={classes.nav}>
            <div className={`${classes.item} `}>
                <NavLink to="/profile" activeClassName = {classes.activeLink}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/dialogs" activeClassName = {classes.activeLink}>Dialogs</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/users" activeClassName = {classes.activeLink}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/login" activeClassName = {classes.activeLink}>Login</NavLink>
            </div>
            <div className={classes.item} activeClassName = {classes.activeLink}>
                <a>News</a>
            </div>
            <div className={classes.item} activeClassName = {classes.activeLink}>
                <a>Music</a>
            </div>
            <div className={classes.item} activeClassName = {classes.activeLink}>
                <a>Settings</a>
            </div>
        </nav>
    )
}
export default Navbar;