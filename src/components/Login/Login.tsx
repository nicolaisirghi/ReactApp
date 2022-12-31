import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validator";
import {login} from "../../redux/authReducer";
import {connect} from "react-redux";
// @ts-ignore
import style from "../common/FormsControls/FormsControls.module.css";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps={
    captchaUrl:string|null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKey = keyof LoginFormValuesType

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType , LoginFormOwnProps>& LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKey>("Email...", "email", [required], Input)}
            {createField<LoginFormValuesTypeKey>("Password...", "password", [required], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKey>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesTypeKey>("Symbols from image", "captcha", [required], Input)}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}
const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


const Login: React.FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)

    }
    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>

}
const mapStateToProps = (state: AppStateType): MapStateToPropsType =>
    ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    })

export default connect(mapStateToProps, {login})(Login);