import c from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../Assets/Images/pngegg.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile,status,updateStatus,isOwner,savePhoto}) => {
    if (!profile)
        return <Preloader/>
    const onMainPhotoSelected = (e)=>
    {
        if(e.target.files.length)
        {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={c.postsBlock}>
                <div className={c.desciption}>
                    <ProfileStatusWithHooks status = {status}
                    updateStatus = {updateStatus}
                    />
                    <div className={c.displ}>
                        <img src={profile.photos.large ? profile.photos.large: userPhoto}/>
                        {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/> }
                    </div>
                        <div>Full Name : {profile.fullName}</div></div>


            </div>

        </div>)



}
export default ProfileInfo;