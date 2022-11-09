import friends from "../components/Users/Friends/FriendsContainer";
import {usersAPI} from "../API/api";
import {followUnfollowFlow, updateObjectInArray} from "../utils/objectHelper";
import {unFollowSucces} from "./usersReducer";

const SET_FRIENDS = "SET_FRIENDS"
const UNFRIEND = "UNFRIEND";
let initialState= {
    friends:[],
}
export const friendsReducer = (state = initialState,action)=>
{
    switch (action.type) {
        case SET_FRIENDS:
            return {...state, friends: action.friends};
        case UNFRIEND:
            return {
                ...state,
                friends:state.friends.filter(el=>el.id!=action.userID)}
        default:
            return state;
    }

}

export const setFriends = (friends)=>
{
    return {type:SET_FRIENDS,friends}
}
export const unFriendSuccess = (userID) => {
    return {
        type: UNFRIEND, userID
    }
};

// export const
export const getFriends = ()=>
{
    return async (dispatch)=>
    {
       const response =  await usersAPI.getFriends();
       dispatch(setFriends(response.items));

    }
}

export const unFriend = (userID)=> async (dispatch)=>
    {
        followUnfollowFlow(dispatch, userID, usersAPI.unFollowUser.bind(usersAPI), unFriendSuccess)
        dispatch(unFriendSuccess(userID))
    }

