import React from 'react';
import {connect} from "react-redux";
import {
    follow , requestUsers,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingInProgress,
    unFollow
} from "../../redux/usersReducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getUsersSuper
} from "../../redux/usersSelectors";

let mapStateToProps = (state) => {
    return {
        users:getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {

        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      isFetching={this.props.isFetching}
                      followingInProgress={this.props.followingInProgress}
                      follow={this.props.follow}
                      unFollow ={this.props.unFollow}

        />

    }

}


export default compose(
   // withAuthRedirect,
    connect(mapStateToProps, {follow, unFollow,setUsers,
        setCurrentPage, setTotalUsersCount, requestUsers,toggleFollowingInProgress}))
    (UsersContainer);
