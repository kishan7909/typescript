import actions from "./actions"

const initialState = {
    user: null,
    mobile: null,
    email: null,
    isLoading: false,
    isSucces: false,
    isLoginWeb: false,
    isOtpWrong: false,
    isOtpSendSuccess: false,
    isVerify: false,
    error: null,
    otpIsExpired: false,
    token: null,

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_AUTH:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isSucces: true,
                error: null
            }
        case actions.SET_MOBILE:
            return {
                ...state,
                ...action.payload
            }
        case actions.AUTH_LOADING:
            return { ...state, isLoading: action.payload, }
        case actions.SET_STATE:
            return { ...state, ...action.payload, }
        case actions.IS_LOGIN_WEB:
            return { ...state, isLoginWeb: true }
        case actions.OTP_SEND:
            return { ...state, isOtpSendSuccess: true }
        case actions.IS_VERIFIED:
            return { ...state, isLoading: false, isOtpSendSuccess: false, isOtpWrong: false, ...action.payload }
        case actions.AUTH_ERROR:
            return { ...state, error: action.payload }
        case actions.AUTH_CLEAR:
            return initialState

    }

    return state;
}

export default authReducer;