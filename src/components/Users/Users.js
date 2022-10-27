import React from 'react'
import styles from "./users.module.css";
import userPhoto from "../../Assets/Images/pngegg.png";
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../API/api";

let Users = (props) => {
    //debugger;
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (i > 20) break;
        pages.push(i);
    }
    return <div className={styles.cont}>

        <div>
            {pages.map(p => {
                return <span className={styles.numberPage}><span className={props.currentPage === p && styles.selectedPage}  onClick={(e) => {
                    props.onPageChanged(p)
                }}>{p + " "}</span></span>
            })}
        </div>
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
                        <div className={styles.info}>Country: {"u.location.country"}</div>
                            <div className={styles.info}>City: {"u.location.city"}</div>
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