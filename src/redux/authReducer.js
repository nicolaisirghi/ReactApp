import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'
let initialState = {
    userID: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.payload, isAuth: action.isAuth
            }
        default:
            return state;
    }
}
export const getAuthUserData = () => (dispatch) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    });
}
export const setAuthUserData = (userID, email, login, isAuth) =>
    (
        {type: SET_USER_DATA, payload: {userID, email, login}, isAuth}
    )

export const login = (email, password, rememberMe) => (dispatch) => {


    authAPI.loginUser(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {

            dispatch(getAuthUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            console.log(message)
            dispatch(stopSubmit("login", {_error: message}));
        }
    });
}

export const logout = () => (dispatch) => {
    authAPI.logoutUser().then(response => {
        if (response.data.resultCode === 0) {

            dispatch(setAuthUserData(null, null, null, false));
        }
    });
}
export default authReducer;