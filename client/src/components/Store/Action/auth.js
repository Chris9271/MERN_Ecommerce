import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../utils/config';

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

// 顯示Modal表單
export const setModalForm = (status) => {
    return (dispatch) => {
        dispatch({type: "MODAL_FORM", payload: status})
    }
}

// 取得用戶輸入之電子郵箱
export const getEmail = (e) => {
    return (dispatch) => {
        dispatch({type: "USER_MAIL", payload: e.target.value})
    }
}

// 切換為註冊/登入頁面
export const changeLoginMode = () => {
    return (dispatch) => {
        dispatch({type: "SWITCH_LOGIN_MODE"})
    }
}

// 顯示/隱藏用戶輸入密碼
export const showPassword = (e) => {
    return (dispatch) => {
        if(e.target.id === "password"){
            dispatch({type: "DISPLAY_PASSWORD_FIELD"})
        }else if(e.target.id === "confirmpassword"){
            dispatch({type: "DISPLAY_CONFIRMPASSWORD_FIELD"})
        }
    }
}

// 用戶登入
export const getLoginUser = (userId) => {
    return (dispatch) => {
        dispatch({type: "LOGIN", payload: userId})
    }
}

export const getLogoutUser = () => {
    return async(dispatch) => {
        try{
            const signOut = await axios.get(`${API_URL}/auth/logout`, {withCredentials: true});
            if(signOut.status === 200 && signOut.data.code < 30000){
                Swal.fire({
                    icon: 'success',
                    html: signOut.data.message,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    focusConfirm: false,    
                }).then((result) => {
                    if(result.isConfirmed){
                        dispatch({type: "LOGOUT"})
                        dispatch({type: "CLOSE_MOBILE_MENU"})
                    }
                })
            }else{
                Toast.fire({
                    code: 'error',
                    html: signOut.data.message
                })
            }
        }catch(err){
            console.log(err)
        }
    }
}