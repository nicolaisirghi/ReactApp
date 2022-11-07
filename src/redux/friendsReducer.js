import friends from "../components/Users/Friends/Friends";
import {usersAPI} from "../API/api";

const SET_FRIENDS = "GET_FRIENDS"
let initialState= {
    friends:[]
}
export const friendsReducer = (state = initialState,action)=>
{
    switch (action.type) {
        case SET_FRIENDS:
            return {...state, friends: action.friends};
        default:
            return state;
    }

}
export const setFriends = (friends)=>
{
    return {type:SET_FRIENDS,friends}
}

export const getFriends = ()=>
{
    return async (dispatch)=>
    {
       const response =  await usersAPI.getFriends();
       dispatch(setFriends(response.items));
    }
}
