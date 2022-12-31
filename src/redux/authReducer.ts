import {authAPI, ResultCodeEnum, ResultCodeForCaptcha, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = "/auth/GET_CAPTCHA_URL_SUCCESS"
export type InitialStateType = {
    userID:number |null
    email : string|null
    login: string | null
    isAuth :boolean,
    captchaUrl :string | null,
    isFetching :boolean
}
let initialState :InitialStateType  = {
    userID: null as number |null,
    email: null as string |null,
    login: null as string | null,
    isFetching: false ,
    isAuth: false,
    captchaUrl: null
}
// export type InitialStateType1 = typeof initialState
const authReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.payload
            }

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
}
export const getAuthUserData = () => async (dispatch:any) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

type SetAuthUserDataActionPayloadType ={
    userID:number | null,
    email:string|null,
    login:string|null,
    isAuth:boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload:SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userID:number|null  , email:string|null, login:string|null, isAuth:boolean) :SetAuthUserDataActionType=>
    (
        {type: SET_USER_DATA, payload: {userID, email, login, isAuth}}
    )


type getCaptchaUrlSuccesActionType={
    type:typeof GET_CAPTCHA_URL_SUCCESS,
    payload:{captchaUrl:string}
}
export const getCaptchaUrlSucces = (captchaUrl:string) :getCaptchaUrlSuccesActionType=>
    (
        {
            type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
        })
export const login = (email:string, password:string, rememberMe:boolean,captcha:string) => async (dispatch:any) => {


    let response = await authAPI.loginUser(email, password, rememberMe,captcha);
    if (response.resultCode === ResultCodeEnum.Success) {

        dispatch(getAuthUserData());
    } else
    {
        if(response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired)
        {
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}));
    }



}


export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logoutUser()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSucces(captchaUrl));

}
export default authReducer;