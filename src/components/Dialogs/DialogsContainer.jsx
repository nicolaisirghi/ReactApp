import c from "./Dialogs.module.css";
import {Navigate, NavLink} from "react-router-dom";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import store, {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBodyCreator: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }


    }

}
export default compose(connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs);
