import { delay, takeEvery, takeLatest, put, all } from 'redux-saga/effects';
import actions from './actions';
import userActions from '../user/actions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { confirmOtp, resendOtp, sendOtp } from '../../api/otp';
import { store } from '../store';
import { doApiCall } from "../../helper/apiCaller"
import { success, error } from './../../components/Message';


function* WATCH_SIGN_IN(action) {
    const user = action.payload
    // AsyncStorage.setItem('auth', JSON.stringify({
    //     user: user,
    //     uid: user.uid
    // }))
    yield put({
        type: actions.SET_AUTH,
        payload: {
            user: user,
            uid: user?.uid !== undefined ? user?.uid : null
        }
    })
}
function* WATCH_SEND_OTP(action) {
    const resp = yield doApiCall(
        sendOtp,
        action.payload,
        actions.AUTH_LOADING,
        actions.AUTH_ERROR,
    )
    if (resp.id) {
        yield put({
            type: actions.SET_STATE,
            payload: {
                isOtpSendSuccess: true,
                mobile: action.payload.mobile
            }
        })
    }
}


function* WATCH_CONFIRM_OTP(action) {
    const { router } = action.payload
    const resp = yield doApiCall(
        confirmOtp,
        action.payload,
        actions.AUTH_LOADING,
        actions.AUTH_ERROR,
    )
    if (resp.isVerfied) {
        yield put({
            type: actions.IS_VERIFIED,
            payload: {
                isVerify: true,
                mobile: action.payload.mobile,
                token: resp.token
            }
        })
        yield put({
            type: userActions.GET_USER_DETAIL,
            payload: {
                mobile: action.payload.mobile,
                router
            }
        })
    } else if (resp.otpIsExpired) {
        error("Otp is expired")
        yield put({
            type: actions.SET_STATE,
            payload: {
                otpIsExpired: true,
                isOtpWrong: false,
                isLoading: false,
            }
        })
    }
    else if (resp.isOtpWrong) {
        error("Otp is worng")
        yield put({
            type: actions.SET_STATE,
            payload: {
                isOtpWrong: true,
                isLoading: false
            }
        })
    }
    else {
        yield put({
            type: actions.AUTH_ERROR,
            payload: resp
        })
    }
}

function* WATCH_RESEND_OTP(action) {

    // const resp = yield resendOtp(action.payload.mobile)
    const resp = yield doApiCall(
        resendOtp,
        action.payload,
        actions.AUTH_LOADING,
        actions.AUTH_ERROR
    )

    if (resp) {
        success("Otp is Sent")
        action.payload.startTimer()
    } else {
        error("Something went wrong")
    }

}




export default function* rootSaga() {
    yield all([
        takeEvery(actions.SIGN_IN, WATCH_SIGN_IN),
        takeEvery(actions.SEND_OTP, WATCH_SEND_OTP),
        takeEvery(actions.CONFIRM_OTP, WATCH_CONFIRM_OTP),
        takeEvery(actions.RESEND_OTP, WATCH_RESEND_OTP),
    ])
}