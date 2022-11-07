import {connect} from "react-redux";
import {getFriends} from "../../../redux/friendsReducer";
import React, {Component, useState} from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../Assets/Images/pngegg.png";
import styles from "../users.module.css";
import {follow, unFollow} from "../../../redux/usersReducer";

let mapStateToProps = (state) => {

    return {
        friends: state.friendsPage.friends,
        followingInProgress:state.usersPage.followingInProgress
    }
}

const requestFriends = () => {
    return getFriends();
}

class FriendsContainer extends Component {
    componentDidMount() {
        this.props.requestFriends();
    }


    render() {

        return <Friends friends={this.props.friends} follow = {this.props.follow} unFollow = {this.props.unFollow}/>
    }
}

const Friends = (props) => {
    debugger;
    const friends = props.friends;
    return (
        friends.map(u=> <div key={u.id}>
        <span>
        <div>
        <NavLink to={'/profile/' + u.id}>
        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
        </NavLink>
        <span className={styles.name}>Name: {u.name}</span>
        <div className={styles.info}>Status: {u.status}</div>
            {u.followed
                    ? <div className={styles.btn}>
                        <button  onClick={()=>{
                            props.unFollow(u.id)
                        } }>Unfollow</button>
                    </div>
                    : <div className={styles.btn}>
                        <button onClick={()=> {
                            props.follow(u.id)
                        } }>Follow</button>
                    </div>
            }
        </div></span></div>))
}
export default connect(mapStateToProps, {requestFriends,follow,unFollow})(FriendsContainer)

