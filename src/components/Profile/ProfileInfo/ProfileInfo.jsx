import c from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../Assets/Images/pngegg.png";

const ProfileInfo = (props) => {
    if (!props.profile)
        return <Preloader/>
    return (
        <div>
            <div>
                <img src="https://static.sadhguru.org/d/46272/1633199491-1633199490440.jpg"/></div>

            <div className={c.postsBlock}>
                <div className={c.desciption}>
                    <img src={props.profile.photos.large ? props.profile.photos.large: userPhoto}/>
                    <div>Full Name : {props.profile.fullName}</div>
                    <div>Status : {props.profile.aboutMe}</div>
                    <div>Ищу
                        работу, {props.profile.lookingForAJob == true ? props.profile.lookingForAJobDescription : null}</div>

                </div>
            </div>

        </div>)


    // {
    //     "aboutMe": "я круто чувак 1001%",
    //     "contacts": {
    //     "facebook": "facebook.com",
    //         "website": null,
    //         "vk": "vk.com/dimych",
    //         "twitter": "https://twitter.com/@sdf",
    //         "instagram": "instagra.com/sds",
    //         "youtube": null,
    //         "github": "github.com",
    //         "mainLink": null
    // },
    //     "lookingForAJob": true,
    //     "lookingForAJobDescription": "не ищу, а дурачусь",
    //     "fullName": "samurai dimych",
    //     "userId": 2,
    //     "photos": {
    //     "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
    //         "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
    // }
    // }


}
export default ProfileInfo;