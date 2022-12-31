import './App.css';
import {withRouter} from "./components/Profile/ProfileContainer";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import 'antd/dist/antd';
import {NotificationOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from 'antd';
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import FriendsContainer from "./components/Users/Friends/FriendsContainer";
import MyHeader from "./components/Header/Header";
import HeaderContainer from "./components/Header/HeaderContainer";
const { Header, Content, Footer, Sider } = Layout;

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const ChatPages= React.lazy(() => import("./pages/Chat/ChatPage"));


const items1: MenuProps['items'] = ['1'].map((key) => ({
    key,
    label:<HeaderContainer style={{color:"white"} }/>
}));

const iconsArray = [UserOutlined,TeamOutlined,NotificationOutlined]
const profileOptions   = [<NavLink to="/login">Profile</NavLink>,<NavLink to="/chat">Chat</NavLink>,<NavLink to="/friends" >Friends</NavLink>]
const usersOptions  = [<NavLink to="/users" >Developers</NavLink>]
const loginOptions = [<NavLink to="/login" >Login</NavLink>]
const allOptions = [profileOptions,usersOptions,loginOptions]
const titleOption = ["User","Users","Login"]
const item :MenuProps['items']= iconsArray.map(

    (icon,index)=>
    {
        const key = String(index+1);
        return {
            key:key,
            icon:React.createElement(icon),
            label:`${titleOption[index]}`,
            children:allOptions[iconsArray.indexOf(icon)].map((el,j)=>
                {
                    const subkey = index*allOptions[iconsArray.indexOf(icon)].length+1+j
                    return {
                        key:subkey,
                        label:el
                    }
                }
            )
        }
    }

)

class App extends Component {
    catchAllUnhandledErrors = (promiseRejectionEvent:any)=>
    {
        alert("Some error occured");
    }

    componentDidMount() {
        // @ts-ignore
        this.props.initializeApp();
        window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors);
    }

    render() {
        // @ts-ignore
        if (!this.props.initialized) {
            return <Preloader/>
        }

        // @ts-ignore
        return <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            defaultOpenKeys={['1']}
                            style={{ height: '100%' }}
                            items={item}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <React.Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path='/chat' element={
                                    <ChatPages/>
                                }/>
                                <Route path='/profile/:userID' element={<ProfileContainer/>}/>
                                <Route path='/profile/' element={<ProfileContainer/>}/>
                                <Route path = '/friends' element={<FriendsContainer/>}></Route>
                                <Route path='/users' element={<UsersContainer/>}/>
                                <Route path='/login' element={<Login/>}/>
                            </Routes>
                        </React.Suspense>

                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>SocialNetwork 2022</Footer>
        </Layout>



    }
}

const mapStateToProps = (state:any) => (
    {
        initialized: state.app.initialized
    })
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props:any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp;

