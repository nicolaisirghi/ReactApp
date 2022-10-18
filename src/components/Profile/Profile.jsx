import c from "./Profile.module.css"
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
const Profile = (props) =>{
    return(
        <div>
        <ProfileInfo/>
            <MyPost
                posts={props.profilePage.posts}
                newPostText = {props.profilePage.newPostText}
                dispatch={props.dispatch}
                ></MyPost>
        </div>)


}
export default Profile;