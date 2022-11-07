import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import  {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const ProfileContainer = React.lazy(()=>import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(()=>import("./components/Dialogs/DialogsContainer"));
class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }


    render() {
        if(!this.props.initialized)
        {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <React.Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/dialogs' element={
                            <DialogsContainer/>
                        }/>
                        <Route path='/profile/:userID' element={<ProfileContainer/>}/>
                        <Route path='/profile/' element={<ProfileContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                    </Routes>
                    </React.Suspense>
                </div>

            </div>
        )
    }
}
const mapStateToProps=(state)=>(
{
    initialized:state.app.initialized
})
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

 const SamuraiJSApp = (props)=>
{
  return  <HashRouter>
        <Provider store = {store}>
            <AppContainer />
        </Provider>
  </HashRouter>
}
export default SamuraiJSApp;

