import React from 'react'
import styles from "./users.module.css";
import userPhoto from "../../Assets/Images/pngegg.png";
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
let Users = ({currentPage ,onPageChanged,totalUsersCount,pageSize,...props}) => {
    return <div className={styles.cont}>
       <Paginator currentPage={currentPage} onPageChanged ={onPageChanged} totalItemsCount={totalUsersCount} pageSize = {pageSize}/>
        {props.isFetching ? <Preloader/> : null}
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </NavLink>
                        <span className={styles.name}>Name: {u.name}</span>
                        <div className={styles.info}>Status: {u.status}</div>
                        {
                            u.followed
                                ? <div className={styles.btn}>
                                    <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=>{
                                        props.unFollow(u.id)
                                        } }>Unfollow</button>
                                </div>
                                : <div className={styles.btn}>
                                    <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=> {
                                       props.follow(u.id)
                                    } }>Follow</button>
                                </div>
                        }
                    </div>

                </span>


            </div>)


        }
    </div>

}

export default Users;