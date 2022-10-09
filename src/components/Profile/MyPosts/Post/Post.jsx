import c from "./Post.module.css"

const Post = (props) => {
    return (
        <div className={c.item}><img
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"/>
            <div><h3>{props.message + " "}<img className={c.im}
                                               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWyptTjQFHopCvb35malGYZabivkcJdu3kVEH-45Vdvs4O4UQjPXpKX_NKT_DscHvBto&usqp=CAU"/>{props.likesCount}
            </h3></div>


        </div>)
}
export default Post;