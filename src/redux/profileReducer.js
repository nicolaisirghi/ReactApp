import {profileAPI, usersAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO';
let initialState = {
    posts: [],
    profile: null,
    status: ""
}
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, message: action.newPost, likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,profile: {...state.profile,photos: action.photos}
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS,photos})
export const getUserProfile = (userID) => async (dispatch) => {
    const response = await usersAPI.getProfile(userID)
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)

    dispatch(setStatus(response.data));

}
export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto= (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile)=>

    async (dispatch,getState)=>
    {
        const userID = getState().auth.userID;
const response = await profileAPI.saveProfile(profile);
if(response.data.resultCode ===0)
{
    dispatch(getUserProfile(userID));
}
else {
    dispatch(stopSubmit("edit-profile",{_error:response.data.messages[0]}))
    return Promise.reject(response.data.messages[0])
}
    }


export default profileReducer;