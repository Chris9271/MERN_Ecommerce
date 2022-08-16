import React from 'react';
import axios from 'axios';
import {useSelector, connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import {getLoginUser, setModalForm} from '../Store/Action/auth';
import FormInput from '../CustomForm/FormInput';
import SocialMedia from '../CustomForm/SocialMedia';
import Modal from '../CustomForm/Modal';
import { API_URL } from '../../utils/config';

const SignIn = ({userLogin, closeModal}) => {
    const {authBoolean, email} = useSelector(state => state.auth)
    const history = useHistory();
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        // 根據isLoginMode來決定後續動作 true-reset password false-request verify
        if(!authBoolean.isLoginMode){
            //申請重新驗證信的申請次數限制 - 可加的
            const requestVerify = await axios.post(`${API_URL}/verify/resend`, {email}, {withCredentials: true});
            const requestResult = requestVerify.data;
            if(requestVerify.status === 200 && requestResult.code < 30000){
                Swal.fire({
                    icon: 'success',
                    html: requestResult.message,
                    showConfirmButton: 'OK',
                    focusConfirm: false
                }).then((result) => {
                    if(result.isConfirmed){
                        closeModal();
                        history.push('/');
                    }
                })
            }else{
                Toast.fire({
                    icon: 'error',
                    html: requestResult.message,
                })
            }
        }else{
            //重置密碼的申請次數限制，修改密碼次數上限 - 可加的
            const resetPassword = await axios.post(`${API_URL}/verify/forget`, {email}, {withCredentials: true});
            const resetResult = resetPassword.data;
            if(resetPassword.status === 200 && resetResult.code < 30000){
                Swal.fire({
                    icon: 'success',
                    html: resetResult.message,
                    showConfirmButton: 'OK',
                    focusConfirm: false
                }).then((result) => {
                    if(result.isConfirmed){
                        closeModal();
                        history.push('/');
                    }
                })
            }else{
                Toast.fire({
                    icon: 'error',
                    html: resetResult.message,
                })
            }
        }
    }

    const authSubmitHandler = async(values) => {
        if(!authBoolean.isLoginMode){
            try{
                const addUser = await axios.post(`${API_URL}/auth/sign`, values, {withCredentials: true})
                const newUser = addUser.data;
                if(addUser.status === 200 && newUser.code < 30000){
                    Swal.fire({
                        icon: 'success',
                        html: newUser.message,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        focusConfirm: false,    
                    }).then((result) => {
                        // console.log(result)
                        if(result.isConfirmed){
                            history.push('/');
                        }
                    })
                }else{
                    Toast.fire({
                        icon: 'error',
                        html: newUser.message
                    })
                }
            }catch(err){
                console.log(err)
            }
        }else{
            try{
                const signUser = await axios.post(`${API_URL}/auth/login`, values, {withCredentials: true})
                const signedUser = signUser.data;
                if(signUser.status === 200 && signedUser.code < 30000){
                    Swal.fire({
                        icon: 'success',
                        html: signedUser.message,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        focusConfirm: false
                    }).then((result) => {
                        if(result.isConfirmed){
                            userLogin(signUser.data._id)
                        }
                    })
                }else{
                    Toast.fire({
                        icon: 'error',
                        html: signedUser.message
                    })
                }
            }catch(err){
                console.log(err)
            }
        }
    }

if(authBoolean.isLogin) return <Redirect to = "/"/>

    return (
        <>
            <div className="l-signup container">
                <div className="c-signup">
                    <h4 className="c-signup__title">{!authBoolean.isLoginMode ? "Sign Up" : "Sign In"}</h4>
                    <FormInput
                        authSubmitHandler={authSubmitHandler}
                    />             
                    {authBoolean.isLoginMode &&
                        <SocialMedia/>
                    }
                </div>
            </div>
            <Modal handleSubmit={handleSubmit}/>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        userLogin: (userId) => dispatch(getLoginUser(userId)),
        closeModal: () => dispatch(setModalForm(false))
    }
}

export default connect(null, mapDispatchToProps)(SignIn);