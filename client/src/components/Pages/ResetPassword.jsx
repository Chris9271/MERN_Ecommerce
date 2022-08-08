import React, {useEffect} from 'react';
import {Formik, Form, useField} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import {useSelector, connect} from 'react-redux';
import {showPassword} from '../Store/Action/auth';
import { API_URL } from '../../utils/config';

// 此頁面不可透過非連結進入
const ResetPassword = ({match, displayPassword}) => {
    const {resetString} = match.params;
    const {authBoolean} = useSelector(state => state.auth);
    const verifyStr = resetString.split('=')[1];
    const history = useHistory();

    const checkIsUpdate = async() => {
        // const isUpdate = await axios.post("http://localhost:5000/api/verify", {verifyStr}, {withCredentials: true});
        const isUpdate = await axios.post(`${API_URL}/verify`, {verifyStr}, {withCredentials: true});
        if(isUpdate.data.code === 30009){
            history.push('/')
            Swal.fire({
                icon: 'info',
                html: isUpdate.data.message,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                focusConfirm: false,    
            })
        }
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    })

    const resetPasswordInitValue = {
        // email: email,
        password: '',
        confirmpassword: ''
    }

    const resetPasswordValidateSchema = Yup.object({
        password: Yup.string()
        .min(6, 'Password has to be longer or equal to 6 characters')
        .required('Password is required')
        .matches(/^(?=.*\d)(?=.*[A-Za-z]).{6,}$/, "Should contain at least one letter and one number"),
        confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password is not match')
        .required('Please enter password again')
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

    const resetPasswordSubmitHandler = async(values) => {
        const {password} = values;
        try{
            // const updateUserInfo = await axios.post('http://localhost:5000/api/verify/reset', {password, verifyStr}, {withCredentials: true})
            const updateUserInfo = await axios.post(`${API_URL}/verify/reset`, {password, verifyStr}, {withCredentials: true})
            const updatedUser = updateUserInfo.data;
            if(updateUserInfo.status === 200 && updatedUser.code < 30000){
                Swal.fire({
                    icon: 'success',
                    html: updatedUser.message,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    focusConfirm: false,    
                }).then((result) => {
                    if(result.isConfirmed){
                        history.push('/');
                    }
                })
            }else{
                Toast.fire({
                    icon: 'error',
                    html: updatedUser.message
                }).then((result) => {
                    if(!result.isDismissed){
                        history.push('/');
                    }
                })
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        checkIsUpdate();
    }, [])
    
    return (
    <div className="l-signup container">
        <Formik
            initialValues={resetPasswordInitValue}
            validationSchema={resetPasswordValidateSchema}
            onSubmit={(values, {resetForm, setSubmitting})=>{
                setSubmitting(false);
                resetPasswordSubmitHandler(values);
                resetForm();
            }}
        >
        {(props)=>{
            return(
            <div className="c-signup">
                <h4 className="c-signup__title">Reset Password</h4>
                <Form className="c-form">
                    {/* <CustomInput
                        label="E-mail"
                        type="email"
                        name="email"
                        id="email"
                        defaultvalue={email}
                        readOnly
                        className="form-control c-form__email"
                    /> */}
                    <CustomInput
                        label="Password"
                        type={!authBoolean.passwordField ? "password" : "text"}
                        name="password"
                        id="password"
                        placeholder="Please type your password"
                        className="form-control c-form__password"
                    />
                    <CustomInput
                        label="ConfirmPassword"
                        type={!authBoolean.confirmpasswordField ? "password" : "text"}
                        name="confirmpassword"
                        id="confirmpassword"
                        placeholder="Please type your password again"
                        className="form-control c-form__confirmpassword"
                    />
                    <button 
                        type="submit" 
                        className="c-signup__btn"
                        disabled={props.isSubmitting}
                    >
                        Submit
                    </button>
                </Form>
            </div>
            )}}
        </Formik>
    </div> 
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        displayPassword: (e) => dispatch(showPassword(e))
    }
}

export default connect(null, mapDispatchToProps)(ResetPassword);