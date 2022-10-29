import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validator";
import {login} from "../../redux/authReducer";
import {connect} from "react-redux";
import style from "../common/FormsControls/FormsControls.module.css";
import {Navigate} from "react-router-dom";
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Email..."}
                    name={"email"}
                    validate={[required]}
                    component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password..."}
                       name={"password"}
                       validate={[required]}
                       type={"password"}
                       component={Input}/>
            </div>
            <div><Field component={Input}  name={"rememberMe"} type={"checkbox"}/>Remember me</div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}
const LoginReduxForm = reduxForm({
    form:'login'
})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData)=>{
        console.log(formData)
        props.login(formData.email,formData.password,formData.rememberMe)

    }
    if(props.isAuth)
    {
        return <Navigate to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
       <LoginReduxForm onSubmit={onSubmit}/>
    </div>

}
const mapStateToProps = (state)=>
    ({
        isAuth:state.auth.isAuth
    })

export default connect(mapStateToProps,{login})(Login);