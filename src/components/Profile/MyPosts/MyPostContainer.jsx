import React from "react";
import {addPostActionCreator, updateNewPostTextCreator} from "../../../redux/store";
import MyPost from "./MyPost";
import {connect} from "react-redux";
const mapStateToProps = (state)=>
{
    return {
       posts: state.profilePage.posts,
        newPostText : state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch)=>
{
return {
    updateNewPostText :(text)=>
    {
        dispatch(updateNewPostTextCreator(text))

    },
    addPost:(newPost)=>
    {
        dispatch(addPostActionCreator(newPost));

    }
}
}
const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(MyPost);
export default MyPostContainer;