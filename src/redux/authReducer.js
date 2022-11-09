import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = "/auth/GET_CAPTCHA_URL_SUCCESS"
let initialState = {
    userID: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.payload,isAuth: action.isAuth
            }

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
}
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const setAuthUserData = (userID, email, login, isAuth) =>
    (
        {type: SET_USER_DATA, payload: {userID, email, login}, isAuth}
    )


export const getCaptchaUrlSucces = (captchaUrl) =>
    (
        {
            type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
        })
export const login = (email, password, rememberMe,captcha) => async (dispatch) => {


    let response = await authAPI.loginUser(email, password, rememberMe,captcha);
    if (response.data.resultCode === 0) {

        dispatch(getAuthUserData());
    } else
    {
        if(response.data.resultCode === 10)
        {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}));
    }



}


export const logout = () => async (dispatch) => {
    let response = await authAPI.logoutUser()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSucces(captchaUrl));

}
export default authReducer;