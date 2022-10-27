import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer"
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";

;

class ProfileContainer extends React.Component {

    componentDidMount() {

        let profileId = this.props.router.params.userID;
        this.props.getUserProfile(profileId)
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}/>)
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
        profile:state.profilePage.profile
    });

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect)(ProfileContainer);
