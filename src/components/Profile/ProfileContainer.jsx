import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profileReducer"
import {useLocation, useNavigate, useParams,} from "react-router-dom";
import {compose} from "redux";
class ProfileContainer extends React.Component {

    componentDidMount() {

        let profileId = this.props.router.params.userID ;
        console.log(this.props.isAuth)
        if(!profileId)
        {

            profileId=this.props.authorizedUserId
        }

        this.props.getUserProfile(profileId)
        this.props.getStatus(profileId);
    }

    render() {

        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status = {this.props.status}
            updateStatus = {this.props.updateStatus}/>)
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}
let mapStateToProps = (state)=>
    ({
        profile:state.profilePage.profile,
        status:state.profilePage.status,
        authorizedUserId:state.auth.userID,
        isAuth:state.auth.isAuth
    });

export default compose(
    connect(mapStateToProps, {getUserProfile,getStatus,updateStatus}),
    withRouter)
(ProfileContainer);
