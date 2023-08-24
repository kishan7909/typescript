"use strict";
import { delay, takeEvery, takeLatest, put, all } from "redux-saga/effects";
import actions from "./actions";
import authActions from "../auth/actions"
import {
  getUserDetails,
  saveUserDetails,
  updateUserService,
} from "../../firestoreAPI.js/user";

function* WATCH_SAVE_USER(action) {
  yield put({
    type: actions.USER_LOADING,
    payload: true,
  });
  const {userDetails,router} = action.payload;

  const res = yield saveUserDetails(userDetails);

  if (res.id) {
    router.push("/dashboard")
    yield put({
      type: actions.SET_USER,
      payload: {
        user: {
          ...userDetails,
          userId: res.id,
          isLoading:false,
          name: `${userDetails?.firstName} ${userDetails?.lastName}`,
        },
        isFind: true,
      },
    });
    yield put ({
      type:authActions.SET_STATE,
      payload:{
        email:userDetails?.email,
        mobile:userDetails?.mobile
      }
    })
  } else {
   
    yield put({
      type: actions.USER_ERROR,
      payload: res,
    });
  }
  yield put({
    type: actions.USER_LOADING,
    payload: false,
  });
}

function* WATCH_GET_USER_DETAIL(action) {
  yield put({
    type: actions.USER_LOADING,
    payload: true,
  });
  const {mobile, email, router, update} = action.payload;
  let collumn = mobile ? "mobile" :"email";
  const res = yield getUserDetails(mobile ? mobile : email,
    collumn);
  if(res) {
    yield put({
      type: actions.USER_LOADING,
      payload: false,
    });
  }
  if (res?.email && res?.mobile) {
    yield put({
      type: actions.SET_USER,
      payload: {
        user: { ...res, name: `${res.firstName} ${res.lastName}` },
        isLoading:false
      },
    });
    yield put({
      type:authActions.SET_STATE,
      payload:{
        mobile :res?.mobile,
        email:res?.email
      }
    })
    if(router && update) router?.push("/profile")
    else if(router) router.push("/dashboard")

  } else if (!res?.email) {
    yield put({
      type: actions.USER_LOADING,
      payload: false,
    });
    router.push("/profile/edit")
  } else {
    yield put({
      type: actions.USER_LOADING,
      payload: false,
    });
    yield put({
      type: actions.USER_ERROR,
      payload: res,
    });
  }
}

function* WATCH_UPDATE_USER(action) {
  yield put({
    type: actions.USER_LOADING,
    payload: true,
  });
  const { data, id, router } = action.payload;
  try {
    yield updateUserService(data, id);
    yield put({
      type: actions.GET_USER_DETAIL,
      payload: {
        mobile : action.payload.mobile,
        update:true,
        router
      },
    });
    // if(router) router?.push("/profile")
    yield put({
      type: actions.SET_USER,
      payload: {
        isUpdate: true,
      },
    });
  } catch (err) {
    yield put({
      type: actions.USER_ERROR,
      payload: err,
    });
  }
}

function* WATCH_GET_USER_DETAIL_EMAIL(action) {

} 

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SAVE_USER, WATCH_SAVE_USER),
    takeEvery(actions.GET_USER_DETAIL, WATCH_GET_USER_DETAIL),
    takeEvery(actions.UPDATE_USER, WATCH_UPDATE_USER),
    takeEvery(actions.GET_USER_DETAIL_EMAIL, WATCH_GET_USER_DETAIL_EMAIL),
  ]);
}
