import store, {sendMessageCreator} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }


    }

}
export default compose(connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)
(Dialogs);
