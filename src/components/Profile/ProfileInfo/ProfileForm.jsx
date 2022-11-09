import React from "react";
import c from "./ProfileInfo.module.css";
import userPhoto from "../../../Assets/Images/pngegg.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import profile from "../Profile";
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileForm = ({handleSubmit,profile,error}) => {
    return <form onSubmit={handleSubmit}>
        <button>Save</button>
        {error && <div className={style.formSummaryError}>
            {error}</div>}
        <div><b>Full name :</b> {createField("Full name...", "fullName", [], Input)}</div>
        <div><b>Looking for a job :{createField("", "lookingForAJob", [], Input, {type: "checkbox"})}</b></div>
        <div>
            <b>My professional skills
                : </b>{createField("My professional skills...", "lookingForAJobDescription", [], Textarea)}

        </div>
        <div>
            <b>About me: </b>{createField("About me..", "aboutMe", [], Textarea)}
        </div>
        <h2>Contacts:</h2> {Object.keys(profile.contacts).map(key=>
            <div key={key}><b>{key}{createField(key,"contacts."+key,[],Input)}</b></div>
    )}



    </form>


}
const ProfileDataReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileForm)
export default ProfileDataReduxForm;