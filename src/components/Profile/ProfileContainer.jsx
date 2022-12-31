import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profileReducer"
import {Navigate, useLocation, useNavigate, useParams,} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let profileId = this.props.router.params.userID;
        if (!profileId) {
            profileId = this.props.authorizedUserId||2;
        }
        this.props.getUserProfile(profileId)
        this.props.getStatus(profileId);

    }

    componentDidMount() {

        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userID !== prevProps.router.params.userID)
            this.refreshProfile();
    }

    render() {

        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.userID}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>

        )
    }
}

export function withRouter(Component) {
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

let mapStateToProps = (state) =>
    ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userID,
        isAuth: state.auth.isAuth
    });

export default compose(
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus,savePhoto,saveProfile}))
(ProfileContainer);
