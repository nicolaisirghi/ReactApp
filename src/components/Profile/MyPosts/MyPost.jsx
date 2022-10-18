import c from "./MyPost.module.css"
import Post from "./Post/Post";
import React from "react";
import {addPostActionCreator, updateNewPostTextCreator} from "../../../redux/state";



const MyPost = (props) => {


    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
    let newPostElement = React.createRef();
    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewPostTextCreator(text))
        console.log(props.newPostText);
    }
    return (
        <div className={c.postsBlock}>
            <div><h3>My posts</h3></div>
            <div>
                <div><textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/></div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div>New post</div>

            <div className={c.posts}>
                {postsElements}
            </div>
        </div>)


}
export default MyPost;