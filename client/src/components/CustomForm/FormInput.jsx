import React from 'react';
import {Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import {useSelector, connect} from 'react-redux';
import {setModalForm, showPassword, changeLoginMode} from '../Store/Action/auth';

const FormInput = ({authSubmitHandler, showModalForm, displayPassword, loginModeSwitch}) => {
    const {authBoolean} = useSelector(state => state.auth);

    // 登入或註冊初值
    const initSignupValue = {
        // username: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    const initLoginValue = {
        email: '',
        password: '',
        confirmpassword: ''
    }

    // 登入或註冊模板
    const signupValidateSchema = Yup.object({
        // username: Yup.string()
        // .min(3, 'Username should longer than 3 characters')
        // .concat(!isLoginMode ? Yup.string().required('Please enter your username') : null),
        // .required('Please enter your username'),
        email: Yup.string()
        .email('Email is in valid')
        .required('Email is required'),
        password: Yup.string()
        .min(6, 'Password has to be longer or equal to 6 characters')
        .required('Password is required')
        .matches(/^(?=.*\d)(?=.*[A-Za-z]).{6,}$/, "Should contain at least one letter and one number"),
        confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password is not match')
        // .concat(!isLoginMode ? Yup.string().required('Please enter password again') : null)
        .required('Please enter password again')
    })

    const loginValidateSchema = Yup.object({
        email: Yup.string()
        .email('Email is in valid')
        .required('Email is required'),
        password: Yup.string()
        .min(6, 'Password has to be longer or equal to 6 characters')
        .required('Password is required')
        .matches(/^(?=.*\d)(?=.*[A-Za-z]).{6,}$/, "Should contain at least one letter and one number"),
    })

    const CustomInput = ({label, ...props}) => {
        const [field, meta] = useField(props);
        // field get value and name
        // meta get value, error, touched, initialValue, initialTouched, initialError
        return(
            <div className="form-floating">
                <label htmlFor={props.id || props.name} className="c-form__label">{label}</label>
                <input {...field}{...props}/>
                <i className={props.type === "email" ? "fas fa-envelope" : "fas fa-lock"}></i>
                {  
                    props.name === "password" ?
                    <i className={!authBoolean.passwordField ? "fas fa-eye" : "fas fa-eye-slash"} id="password" onClick={(e) => displayPassword(e)}></i>
                    :
                    props.name === "confirmpassword" ?
                    <i className={!authBoolean.confirmpasswordField ? "fas fa-eye" : "fas fa-eye-slash"} id="confirmpassword" onClick={(e) => displayPassword(e)}></i>
                    :
                    null
                }
                {meta.touched && meta.error ? (
                    <div className="error-msg">{meta.error}</div>
                ): null}
            </div>
        )
    }

    return (
        <>
            <Formik
                initialValues={!authBoolean.isLoginMode ? initSignupValue : initLoginValue}
                validationSchema={!authBoolean.isLoginMode ? signupValidateSchema : loginValidateSchema}
                onSubmit={(values, {resetForm, setSubmitting})=>{
                    setSubmitting(false);
                    authSubmitHandler(values);
                    resetForm();
                }}
            >
            {(props)=>{
                return(
                    <Form className="c-form">
                        {/* {!isLoginMode && (
                            <CustomInput
                                label="Username"
                                type="text"
                                name="username"
                            />
                        )
                        } */}
                        <CustomInput
                            label="E-mail"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Please type your email address"
                            className="form-control c-form__email"
                        />
                        <CustomInput
                            label="Password"
                            type={!authBoolean.passwordField ? "password" : "text"}
                            name="password"
                            id="password"
                            placeholder="Please type your password"
                            className="form-control c-form__password"
                        />
                        {
                            !authBoolean.isLoginMode && 
                            (
                            <CustomInput
                                label="ConfirmPassword"
                                type={!authBoolean.confirmpasswordField ? "password" : "text"}
                                name="confirmpassword"
                                id="confirmpassword"
                                placeholder="Please type your password again"
                                className="form-control c-form__confirmpassword"
                            />
                            )
                        }
                            {!authBoolean.isLoginMode ? 
                                <div className="c-switch">
                                    <p 
                                        onClick={() => {
                                            loginModeSwitch();
                                            props.resetForm();
                                        }}>Already register?
                                    </p>
                                    <p onClick={showModalForm}>Request verify email</p>
                                </div>
                                : 
                                <div className="c-switch">
                                    <p 
                                        onClick={() => {
                                            loginModeSwitch();
                                            props.resetForm();
                                        }}>Don't have an account?
                                    </p>
                                    <p onClick={showModalForm}>Forget password</p>
                                </div>
                            }
                        <button 
                            type="submit" 
                            className="c-signup__btn"
                            disabled={props.isSubmitting}
                        >
                            {!authBoolean.isLoginMode ? "Sign Up" : "Sign In"}
                        </button>
                    </Form>
                )
            }}
            </Formik>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        showModalForm: () => dispatch(setModalForm(true)), // 顯示Modal表單
        loginModeSwitch: () => dispatch(changeLoginMode()), // 切換為註冊/登入
        displayPassword: (e) => dispatch(showPassword(e)) // 顯示/隱藏用戶輸入之密碼
    }
}

export default connect(null, mapDispatchToProps)(FormInput)