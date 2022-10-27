import c from "./Dialogs.module.css";
import {Navigate, NavLink} from "react-router-dom";
import Message   from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
    let messagesElements = state.messages.map(message => <Message  key={message.id} message={message.message}/>)
    let newMessageBody = state.newMessageBody;
    const onSendMessageClick = () =>{
     props.sendMessage();
    }
    const onMessageChange=(event)=>{
        let body = event.target.value;
        props.updateNewMessageBodyCreator(body);
    }


    return (
        <div className={c.dialogs}>
            <div className={c.dialogsItems}>
                {dialogElements}
            </div>
            <div className={c.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody} onChange={onMessageChange} placeholder='Enter message'></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}
export default Dialogs;