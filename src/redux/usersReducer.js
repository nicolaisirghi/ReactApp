import {usersAPI} from "../API/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_COUNT = 'SET_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'
let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true}
                        }
                        return u;
                    }
                ),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: false}
                        }
                        return u;
                    }
                ),
            }
        case SET_USERS:
            return {
                ...state, users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING: {
            return {
                ...state,
                followingInProgress: action.followingInProgress ? [...state.followingInProgress, action.userID] :
                    state.followingInProgress.filter(id => id != action.userID)
            }
        }
        default:
            return state;
    }
}
export const followSucces = (userID) => {
    return {
        type: FOLLOW, userId: userID
    }
};
export const unFollowSucces = (userID) => {
    return {
        type: UNFOLLOW, userId: userID
    }
};
export const setUsers = (Users) => {
    return {type: SET_USERS, users: Users}
}
export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage};
};
export const setTotalUsersCount = (totalUsersCount) => {
    return {type: SET_USERS_COUNT, totalUsersCount: totalUsersCount};
}
export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}
export const toggleFollowingInProgress = (followingInProgress,userID) => {
    return {type: TOGGLE_IS_FOLLOWING, followingInProgress,userID}
}
export const requestUsers = (page,pageSize)=>{
    return (dispatch) =>
    {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(page,pageSize)
        .then(
            response => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(response.items));
                dispatch(setTotalUsersCount(response.totalCount));
            }

        );}
}


export const follow = (userID)=>{
    return (dispatch) =>
    {
        //debugger

        dispatch(toggleFollowingInProgress(true,userID))
        usersAPI.followUser(userID).then(
                response => {
                    if(response.resultCode==0)
                    dispatch(followSucces(userID));
                    dispatch(toggleFollowingInProgress(false,userID));
                }

            );}
}

export const unFollow = (userID)=>{
    return (dispatch) =>
    {

        dispatch(toggleFollowingInProgress(true,userID))
        usersAPI.unFollowUser(userID).then(
                response => {
                    if(response.resultCode==0)
                        dispatch(unFollowSucces(userID));
                    dispatch(toggleFollowingInProgress(false,userID));
                }

            );}
}




export default usersReducer;