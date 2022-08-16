import React, { useEffect } from 'react';
import Home from './Home';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import {API_URL} from '../../utils/config';

const Verify = () => {
    const history = useHistory();
    const verifyURLSearchParams = new URLSearchParams(window.location.search).toString().split("=")[1];
    const verifyType = new URLSearchParams(window.location.search).toString().split("=")[0];
    
    useEffect(() => {
        (async() => {
            let verifyUser;
            if(verifyType === "auth"){
                verifyUser = await axios.post(`${API_URL}/${verifyType}/verify`, {verifyStr: verifyURLSearchParams}, {withCredentials: true});
            }else if(verifyType === "request"){
                verifyUser = await axios.post(`${API_URL}/verify/${verifyType}`, {verifyStr: verifyURLSearchParams}, {withCredentials: true});
            }
            if(verifyUser.status === 200 && verifyUser.data.code < 30000){
                Swal.fire({
                    icon: 'success',
                    html: verifyUser.data.message,
                    showConfirmButton: 'OK',
                    focusConfirm: false
                }).then((result) => {
                    if(result.isConfirmed){
                        history.push('/');
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    html: verifyUser.data.message,
                    showConfirmButton: 'OK',
                    focusConfirm: false
                }).then((result) => {
                    if(result.isConfirmed){
                        history.push('/');
                    }
                })
            }
        })()
    }, [verifyType])
    return (
        <Home/>
    )
}

export default Verify;