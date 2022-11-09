import {NavLink} from "react-router-dom";
import userPhoto from "../../../Assets/Images/pngegg.png";
import styles from "../users.module.css";
import React from "react";

const Friends = (props) => {
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
            <div className={styles.btn}>
                        <button  onClick={()=>{
                            props.unFriend(u.id)
                        } }>Unfollow</button>
                    </div>

        </div></span></div>))
}
export default Friends;