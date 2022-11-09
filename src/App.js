import './App.css';
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import FriendsContainer from "./components/Users/Friends/FriendsContainer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

class App extends Component {
    catchAllUnhandledErrors = (promiseRejectionEvent)=>
    {
        alert("Some error occured");
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors);
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route exact path="/" element={<Navigate to={"/profile"}/>}/>
                            <Route path='/dialogs' element={
                                <DialogsContainer/>}/>
                            <Route path='/profile/:userID' element={<ProfileContainer/>}/>
                            <Route path='/profile/' element={<ProfileContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/friends' element={<FriendsContainer/>}/>
                        </Routes>
                    </React.Suspense>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        initialized: state.app.initialized
    })
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp;

