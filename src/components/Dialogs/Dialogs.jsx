import c from "./Dialogs.module.css";
import Message   from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validator";
const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
    let messagesElements = state.messages.map(message => <Message  key={message.id} message={message.message}/>)

    let addNewMessage = (values)=>{
        console.log(values.newMessageBody)
        props.sendMessage(values.newMessageBody)
    }


    const maxLength100 = maxLengthCreator(100);
    const AddMessageForm = (props)=>{
        return (
            <form onSubmit={props.handleSubmit}>
                <div className={c.messages+ " " +c.message }>
                    <Field  component={Textarea} name={"newMessageBody"} validate={[required,maxLength100]} placeholder={'Enter your message...'}/>
                    <div><button>Send</button></div>
                </div>
            </form>
        )
    }

    const AddMessageFormRedux = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm)

    return (
        <div className={c.dialogs}>
            <div className={c.dialogsItems}>
                {dialogElements}
            </div>
            <div className={c.messages}>
                <div>{messagesElements}</div>

            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}
export default Dialogs;