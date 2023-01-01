import {connect} from "react-redux";
import {getFriends, unFriend} from "../../../redux/friendsReducer";
import React, {Component} from "react";
import Friends from "./Friends";

let mapStateToProps = (state) => {

    return {
        friends: state.friendsPage.friends,
        followingInProgress:state.usersPage.followingInProgress
    }
}

const requestFriends = () => {
    return getFriends();
}

const requestUnFriend = (id) => {
    return unFriend(id);
}

class FriendsContainer extends Component {
    componentDidMount() {
        this.props.requestFriends();
    }


    render() {

        return <Friends friends={this.props.friends}  unFriend = {this.props.requestUnFriend}/>
    }
}
export default connect(mapStateToProps, {requestFriends,requestUnFriend})(FriendsContainer)

