import {usersAPI} from "../API/api";
import {updateObjectInArray} from "../utils/objectHelper";

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
            debugger;
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userID,"id",{followed:true})

            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userID,"id",{followed:false})

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
        type: FOLLOW,userID
    }
};
export const unFollowSucces = (userID) => {
    return {
        type: UNFOLLOW, userID
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
export const toggleFollowingInProgress = (followingInProgress, userID) => {
    return {type: TOGGLE_IS_FOLLOWING, followingInProgress, userID}
}
export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        const response = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}
export const getUser = (name) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        const response = await usersAPI.getProfileByName(name)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.resultCode == 0)
        dispatch(actionCreator(userID));
    dispatch(toggleFollowingInProgress(false, userID));
}

export const follow = (userID) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userID, usersAPI.followUser.bind(usersAPI), followSucces);
    }
}
export const unFollow = (userID) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userID, usersAPI.unFollowUser.bind(usersAPI), unFollowSucces);
    }
}


export default usersReducer;