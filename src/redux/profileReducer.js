const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
let initialState =   {
    posts: [
        {id: 1, message: "Hi", likesCount: 10},
        {id: 2, message: "You are so beautiful", likesCount: 13}],
    newPostText: 'Nicolai'
}
const profileReducer = (state=initialState,action )=>{
    if(action.type===ADD_POST)
    {

        let newPost = {
            id: 5,
            message: state.newPostText,
            likesCount: 0
        };
        state.posts.push(newPost);
        state.newPostText = '';
    }
    else if(action.type ===UPDATE_NEW_POST)
    {
       state.newPostText = action.newText;
    }

    return state;
}


// export const addPostActionCreator = ()=> ({type:ADD_POST})
//
//
//
// export const updateNewPostTextCreator =(text)=>({
//     type: UPDATE_NEW_POST,newText:text
// })

export default profileReducer;