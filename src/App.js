import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Post from "./components/Profile/MyPosts/Post/Post";
import MyPost from "./components/Profile/MyPosts/MyPost";
import Dialogs from "./components/Dialogs/Dialogs";
import { Route, Routes} from "react-router-dom";


const App = (props) => {

    return (

            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/dialogs' element={<Dialogs store={props.store} state = {props.state.dialogsPage}/>}/>
                        <Route path='/profile' element={<Profile profilePage = {props.state.profilePage}
                                                                 dispatch={props.dispatch}  />}/>
                    </Routes>
                </div>

            </div>


    )
}


export default App;
