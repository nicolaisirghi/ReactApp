import {authAPI} from "../API/api";
import {resolvePath} from "react-router-dom";

const SET_USER_DATA ='SET_USER_DATA'
let initialState = {
    userID:null,
    email:null,
    login:null,
    isFetching:false,
    isAuth :false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,...action.data,isAuth: true
            }
        default:
            return state;
            }
}
export const getAuthUserData = ()=>(dispatch)=>
{
    authAPI.me().then(response=>
    {
        if(response.data.resultCode ===0){
            let {id,login,email} = response.data.data;
            dispatch(setAuthUserData(id,email,login));
        }
    });
}
export const setAuthUserData = (userID,email,login)=>
    (
        {type:SET_USER_DATA,data:{userID,email,login}}
    )
export default authReducer;