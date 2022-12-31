import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    getUser,
    requestUsers,
    setCurrentPage,
    setSearch,
    setTotalUsersCount, setTotalUsersCountActionType,
    setUsers, setUsersActionType,
    toggleFollowingInProgress, toggleFollowingInProgressActionType,
    unFollow
} from "../../redux/usersReducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getSearch,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {userType} from "../../../types/types";
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
    currentPage:number
    pageSize:number
    isFetching:boolean
    totalUsersCount:number
    followingInProgress:Array<number>
    users:Array<userType>
    search:string
}
type MapDispatchToPropsType= {
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    setSearch: (e: any) => void
    getUser: (e: any) => void
     setUsers:(users: Array<userType>)=>setUsersActionType,
    setTotalUsersCount:(totalUsersCount:number)=>setTotalUsersCountActionType,
    toggleFollowingInProgress:(followingInProgress: boolean, userID: number)=>toggleFollowingInProgressActionType,
}
type OwnPropsType = {

}

let mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        search: getSearch(state)
    }

}
type PropsType =  MapStateToPropsType & MapDispatchToPropsType & OwnPropsType




class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }


    onTextChange = (e:any) => {
        this.props.setSearch(e.currentTarget.value);
        this.props.getUser(e.currentTarget.value)

    }
    render() {

        return <div>
            <input type={"text"} placeholder={"Search user..."} onChange={this.onTextChange} value={this.props.search}/>
            {// @ts-ignore

                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}

                />
            }

        </div>
    }

}


export default compose(
    // withAuthRedirect,
    connect<MapStateToPropsType,MapDispatchToPropsType,OwnPropsType,AppStateType>(mapStateToProps, {
        follow, unFollow, setUsers,
        setCurrentPage, setTotalUsersCount, requestUsers, toggleFollowingInProgress, getUser,setSearch
    }))
(UsersContainer);
