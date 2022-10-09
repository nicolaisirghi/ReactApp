import c from "./MyPost.module.css"
import Post from "./Post/Post";
import post from "./Post/Post";

const MyPost = (props) => {

    // let PostData=[
    //
    //     {id:1,message:"Hi",likesCount:10},
    //     {id:2,message:"You are so beautiful",likesCount:13}
    //
    //
    // ]
    let postsElements = props.posts.map( p=> <Post message={p.message} likesCount = {p.likesCount}/>)

    return (
        <div className={c.postsBlock}>
            <div><h3>My posts</h3></div>
            <div>
                <div><textarea></textarea></div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div>New post</div>

            <div className={c.posts}>
                {postsElements}
            </div>
        </div>)


}
export default MyPost;