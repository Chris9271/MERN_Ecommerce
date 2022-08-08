import React from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {getLoginUser} from '../Store/Action/auth';
import { API_URL } from '../../utils/config';
import axios from 'axios';
import Swal from 'sweetalert2';

const SocialMedia = ({facebookUserLogin, googleUserLogin}) => {
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
        },
    });

    const handleGoogleLogIn = async(googleData) => {
        const loginWithGoogle = await axios.post(`${API_URL}/social/google`, {access_token: googleData.accessToken}, {withCredentials: true});
        if(loginWithGoogle.status === 200 && loginWithGoogle.data.code < 30000){
            Swal.fire({
                icon: 'success',
                html: loginWithGoogle.data.message,
                showConfirmButton: 'OK',
                focusConfirm: false
            }).then((result) => {
                if(result.isConfirmed){
                    history.push('/');
                    googleUserLogin()
                }
            })
        }else{
            Toast.fire({
                icon: 'error',
                html: loginWithGoogle.data.message,
            }).then((result) => {
                if(result.isDenied){
                    history.push('/sign');
                }
            })
        }
    }

    const handleFacebookLogin = async(response) => {
        if(response.status === "unknown"){
            Toast.fire({
                icon: 'error',
                html: 'Authenticated Fail',
            });
        }
        const loginWithFB = await axios.post(`${API_URL}/social/facebook`, {access_token: response.accessToken}, {withCredentials: true})
        if(loginWithFB.status === 200 && loginWithFB.data.code < 30000){
            Swal.fire({
                icon: 'success',
                html: loginWithFB.data.message,
                showConfirmButton: 'OK',
                focusConfirm: false
            }).then((result) => {
                if(result.isConfirmed){
                    history.push('/');
                    facebookUserLogin()
                }
            })
        }else{
            Toast.fire({
                icon: 'error',
                html: loginWithFB.data.message,
            }).then((result) => {
                if(result.isDenied){
                    history.push('/sign');
                }
            })
        }
    }

    return (
    <div className="c-social">
        <p className="c-social__title">
            <span className="c-social__title-text">
            Or Continue With Social Media
            </span>
        </p>
        
        <div className="c-social__buttons">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Google"
                onSuccess={handleGoogleLogIn}
                onFailure={handleGoogleLogIn}
            />
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                icon="fa-facebook"
                textButton="Facebook"
                cssClass="c-social__buttons-fb"
                callback={handleFacebookLogin}
                fields="email"
                autoLoad={false}
            />
        </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        facebookUserLogin: () => dispatch(getLoginUser()),
        googleUserLogin: () => dispatch(getLoginUser())
    }
}

export default connect(null, mapDispatchToProps)(SocialMedia);