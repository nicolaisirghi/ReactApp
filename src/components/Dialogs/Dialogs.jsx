import c from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";
import Message   from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = (props) => {
    let dialogElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    let messagesElements = props.state.messages.map(message => <Message message={message.message}/>)
    return (
        <div className={c.dialogs}>
            <div className={c.dialogsItems}>
                {dialogElements}
            </div>
            <div className={c.messages}>
                {messagesElements}
            </div>
        </div>
    )
}
export default Dialogs;