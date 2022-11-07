
const SEND_MESSAGE = 'SEND_MESSAGE';
let initialState = {
    messages: [
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
        {id: 5, name: 'Teesanu'},
        {id: 6, name: 'Nicu'}],
};
const dialogsReducer = (state = initialState, action) => {
switch (action.type)
{
    case SEND_MESSAGE:return {
        ...state,
        messages: [...state.messages,{id:7,message:action.newMessageBody}],
    };
    default:return state;
}
}
export default dialogsReducer;