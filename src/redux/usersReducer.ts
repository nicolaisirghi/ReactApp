import {usersAPI} from "../API/api";
import {followUnfollowFlow, updateObjectInArray} from "../utils/objectHelper";
import {userType} from "../../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_COUNT = 'SET_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'
const SET_SEARCH = 'SET_SEARCH'

let initialState = {
    users: [] as Array<userType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    search: ""
}
type InitialState = typeof initialState;
const usersReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case FOLLOW:
            debugger;
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true}),

            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false}),
                // : updateObjectInArray(state.users,action.userID,"id",{followed:false})

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
        case SET_SEARCH: {
            return {
                ...state,
                search: action.search
            }
        }
        default:
            return state;
    }
}
type ActionsType = FollowSuccesActionType | unFollowSuccesActionType | setUsersActionType
|toggleFollowingInProgressActionType|toggleIsFetchingActionType|setCurrentPageActionType|setSearchActionType
|setTotalUsersCountActionType
type FollowSuccesActionType = {
    type: typeof FOLLOW
    userID: number
}
export const followSucces = (userID: number): FollowSuccesActionType => {
    return {
        type: FOLLOW, userID
    }
};

type unFollowSuccesActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unFollowSucces = (userID: number): unFollowSuccesActionType => {
    return {
        type: UNFOLLOW, userID
    }
};
export type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<userType>
}
export const setUsers = (users: Array<userType>): setUsersActionType => {
    return {type: SET_USERS, users}
}
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage};
};

export type setTotalUsersCountActionType = {
    type: typeof SET_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => {
    return {type: SET_USERS_COUNT, totalUsersCount: totalUsersCount};
}
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export type toggleFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING
    followingInProgress: boolean
    userID: number
}
export const toggleFollowingInProgress = (followingInProgress: boolean, userID: number): toggleFollowingInProgressActionType => {
    return {type: TOGGLE_IS_FOLLOWING, followingInProgress, userID}
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsType>

export const requestUsers = (page: number, pageSize: number):ThunkType => {
    return async (dispatch,getState) => {
        dispatch(toggleIsFetching(true));
        const response = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}

type setSearchActionType = {
    type: typeof SET_SEARCH
    search: string
}
export const setSearch = (search: string): setSearchActionType => {
    return {type: SET_SEARCH, search}
}
export const getUser = (name: string):ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        const response = await usersAPI.getProfileByName(name)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}


export const follow = (userID: number) :ThunkType=> {
    return async (dispatch) => {

        followUnfollowFlow(dispatch, userID, usersAPI.followUser.bind(usersAPI), followSucces);
    }
}
export const unFollow = (userID: number) :ThunkType=> {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userID, usersAPI.unFollowUser.bind(usersAPI), unFollowSucces);
    }
}


export default usersReducer;