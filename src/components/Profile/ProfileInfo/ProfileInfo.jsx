import c from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../Assets/Images/pngegg.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React, {useState} from "react";
import ProfileDataReduxForm from "./ProfileForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);
    if (!profile)
        return <Preloader/>
        const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit =  (formData) => {
      saveProfile(formData).then(
           ()=>
           {
               setEditMode(false)
           }
       );
    }
    return (
        <div>
            {editMode ? <ProfileDataReduxForm initialValues = {profile} onSubmit={onSubmit}
                profile = {profile}
                /> :
                <ProfileData profile={profile} onMainPhotoSelected={onMainPhotoSelected}
                             isOwner={isOwner} status={status} updateStatus={updateStatus}
                             goToEditMode={() => {
                                 setEditMode(true)
                             }}

                />}
            <div>
            </div>
        </div>)


}

const ProfileData = ({profile, onMainPhotoSelected, isOwner, status, updateStatus, goToEditMode}) => {
    return <div className={c.postsBlock}>
        {isOwner && <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>}
        <div className={c.desciption}>
            <div className={c.displ}>
                <img src={profile.photos.large ? profile.photos.large : userPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

            </div>
            <div>Info:</div>
            <div>Name : {profile.fullName}</div>
            <div><ProfileStatusWithHooks status={status}
                                         updateStatus={updateStatus}/></div>
            <div>About : {profile.aboutMe}</div>
            <div>Looking for a job : {profile.lookingForAJob ? "yes" : "no"}</div>
            <div>{
                profile.lookingForAJob && <div>My skills : {profile.lookingForAJobDescription}</div>
            }</div>

            <div><b>Contacts:</b>{Object.keys(profile.contacts).map(
                key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>

                }
            )}</div>


        </div>

    </div>

}
const Contact = ({contactTitle, contactValue}) => {
    if (contactValue)
        return <div className={c.contact}><b>{contactTitle}:</b>{contactValue}</div>
    else return <div></div>
}
export default ProfileInfo;