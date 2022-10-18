import c from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import store, {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";



let mapStateToProps = (state)=>{
    return {
        dialogsPage: state.dialogsPage

    }
}
let mapDispatchToProps = (dispatch )=>{
    return {
        updateNewMessageBodyCreator:(body)=>{
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage:()=>{
            dispatch(sendMessageCreator());
        }


    }
}
const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);
export default DialogsContainer;