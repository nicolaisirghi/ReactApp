import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';
let store = {
    _state: {
        id:7,
        profilePage:
            {
                posts: [
                    {id: 1, message: "Hi", likesCount: 10},
                    {id: 2, message: "You are so beautiful", likesCount: 13}],
                newPostText: 'Nicolai'
            }
        ,
        dialogsPage: {
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
                {id: 5, name: 'Pizdabol Teesanu'},
                {id: 6, name: 'Nicu'}],
            newMessageBody:""

        },sideBar:{}
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('State changed');

    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action)
    {

        this._state.profilePage = profileReducer(this._state.profilePage,action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action)
        //this._state.sideBar = profileReducer(this._state.sideBar,action)
            this._callSubscriber(this._state);

        }
    }
export const addPostActionCreator = ()=> ({type:ADD_POST})



export const updateNewPostTextCreator =(text)=>({
    type: UPDATE_NEW_POST,newText:text
})

export const sendMessageCreator = () =>({type:SEND_MESSAGE})
export const updateNewMessageBodyCreator=(body)=>({type:UPDATE_NEW_MESSAGE_BODY,body:body})
export default store;