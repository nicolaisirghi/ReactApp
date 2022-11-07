import React from 'react';
import {connect} from "react-redux";
import s from "./users.module.css"
import {
    follow, getUser,
    requestUsers,
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
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

class UsersContainer extends React.Component {
    state = {
        search: ""
    }

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.search !== this.props.search)
            this.setState({
                search: this.props.search
            })
    }

    onTextChange = (e) => {
        this.setState({
            search: e.currentTarget.value
        })

        this.props.getUser(this.state.search)

    }

    render() {

        return <div>
            <input type={"text"} placeholder={"Search user..."} value={this.state.search} onChange={this.onTextChange}

            />

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


        </div>
    }

}


export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {
        follow, unFollow, setUsers,
        setCurrentPage, setTotalUsersCount, requestUsers, toggleFollowingInProgress, getUser
    }))
(UsersContainer);
