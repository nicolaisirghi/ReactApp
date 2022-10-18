const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';
const dialogsReducer = (state,action )=>{
    if(action.type ===UPDATE_NEW_MESSAGE_BODY)
    {
        state.newMessageBody = action.body;

    }
    else if(action.type ===SEND_MESSAGE)
    {

        state.messages.push({id:7, message: state.newMessageBody});
        state.newMessageBody = "";

    }
    return state;
}

export default dialogsReducer;