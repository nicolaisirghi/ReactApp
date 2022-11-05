import {profileAPI, usersAPI} from "../API/api";

const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
let initialState = {
    posts: [{id: 1, message: "Hi", likesCount: 10}, {id: 2, message: "You are so beautiful", likesCount: 13}],
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
        default:
            return state;
    }
}

export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
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
export default profileReducer;