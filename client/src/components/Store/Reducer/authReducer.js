const initState = {
    userId: "",
    email: "",
    authBoolean: {
        isLogin: false, // 登入/出
        isLoginMode: true, //登入或註冊頁面
        passwordField: false,
        confirmpasswordField: false,
        modal: false
    }
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case "MODAL_FORM":
            return{
                ...state,
                authBoolean: {
                    ...state.authBoolean,
                    modal: action.payload
                }
            };
        case "USER_MAIL":
            return{
                ...state,
                email: action.payload
            };
        case "SWITCH_LOGIN_MODE":
            return{
                ...state,
                authBoolean: {
                    ...state.authBoolean,
                    isLoginMode: !state.authBoolean.isLoginMode,
                    passwordField: false,
                    confirmpasswordField: false,
                }
            };
        case "DISPLAY_PASSWORD_FIELD":
            return{
                ...state,
                authBoolean: {
                    ...state.authBoolean,
                    passwordField: !state.authBoolean.passwordField
                }
            };
        case "DISPLAY_CONFIRMPASSWORD_FIELD":
            return{
                ...state,
                authBoolean: {
                    ...state.authBoolean,
                    confirmpasswordField: !state.authBoolean.confirmpasswordField
                }
            };
        case "LOGIN":
            return{
                ...state,
                userId: action.payload,
                authBoolean: {
                    ...state.authBoolean,
                    isLogin: true,
                }
            } 
        case "LOGOUT":
            return{
                ...state,
                userId: "",
                authBoolean: {
                    ...state.authBoolean,
                    isLogin: false,
                }
            }
        default:
            return state
    }
}

export default authReducer;