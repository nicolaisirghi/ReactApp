import React from 'react';
import {connect} from "react-redux";
import {
    followSucces,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unFollowSucces,
    getUsers, toggleFollowingInProgress, follow, unFollow
} from "../../redux/usersReducer";
import Users from "./Users";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
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
    withAuthRedirect,
    connect(mapStateToProps, {follow, unFollow,setUsers,
        setCurrentPage, setTotalUsersCount, getUsers,toggleFollowingInProgress}))
    (UsersContainer);
