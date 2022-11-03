import c from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../Assets/Images/pngegg.png";
import ProfileStatus from "./ProfileStatus.jsx";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
const ProfileInfo = (props) => {
    if (!props.profile)
        return <Preloader/>
    return (
        <div>
            <div className={c.postsBlock}>
                <div className={c.desciption}>
                    <ProfileStatusWithHooks status = {props.status}
                    updateStatus = {props.updateStatus}
                    />
                    <img src={props.profile.photos.large ? props.profile.photos.large: userPhoto}/>
                    <div>Full Name : {props.profile.fullName}</div>

                </div>
            </div>

        </div>)



}
export default ProfileInfo;