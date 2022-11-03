import c from "./MyPost.module.css"
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validator";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10= maxLengthCreator(10);
const ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} placeholder={"Post message..."} validate={[required,maxLength10]} name={"newPost"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const ReduxProfileForm = reduxForm({
    form: "postForm"
})(ProfileForm)

const  MyPost = React.memo(props => {
    console.log("Render");
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
    let onAddPost = (values) => {
        props.addPost(values.newPost);
    }
    return (
        <div className={c.postsBlock}>
            <div><h3>My posts</h3></div>
            <div>
                <ReduxProfileForm onSubmit={onAddPost}/>
            </div>
            <div className={c.posts}>
                {postsElements}
            </div>
        </div>)


})

export default MyPost;