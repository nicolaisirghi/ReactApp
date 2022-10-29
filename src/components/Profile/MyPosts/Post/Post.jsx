import c from "./Post.module.css"
import userPhoto from "../../../../Assets/Images/pngegg.png";
const Post = (props) => {
    return (
        <div className={c.item}>
            <div><h3><img src={userPhoto}/>{props.message }</h3></div>
            <div><h3>{"Likes:" + props.likesCount}</h3></div>
        </div>)
}
export default Post;