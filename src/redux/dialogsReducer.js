const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';
let initialState = {messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you'},
    {id: 3, message: 'Im fine'},
    {id: 4, message: 'Thx'},
    {id: 5, message: 'Bad'},
    {id: 6, message: 'Ok'}
],
    dialogs: [
    {id: 1, name: 'Bodea'},
    {id: 2, name: 'MihaKun'},
    {id: 3, name: 'Iulik'},
    {id: 4, name: 'Vitea Ak'},
    {id: 5, name: 'Pizdabol Teesanu'},
    {id: 6, name: 'Nicu'}],
    newMessageBody:""
};
const dialogsReducer = (state=initialState,action )=>{
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