import c from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const Message = (props) => {
    return <div className={c.message}>{props.message}</div>

}

export default Message;