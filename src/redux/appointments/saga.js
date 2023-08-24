"use strict";
import { delay, takeEvery, takeLatest, put, all } from "redux-saga/effects";
import actions from "./actions";
import {
  canceledAppointmentService,
  getAppointmentsService,
  getBookedAppointmentsService,
  getCanceledAppointmentsService,
  getCompletedAppointmentsService,
  getUpcomingAppointmentsService,
  saveAppointmentsService,
  updateAppointmentService,
} from "../../firestoreAPI.js/appointments";
import { getDate } from "date-fns";
import moment from "moment";
import { cancelBookingMessage } from "../../api/otp";
import { error } from "@/components/Message";

function* WATCH_SAVE_APPOINTMENTS(action) {
  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  const { appointmentData, router } = action.payload;

  const res = yield saveAppointmentsService(appointmentData);
  if (res.id) {
    yield put({
      type: actions.APPOINTMENTS_SUCCESS,
      payload: true,
    });
    if (router) router.push("/thankyou");
    yield put({
      type: actions.GET_APPOINTMENTS,
    });
    // yield put({
    //   type: actions.GET_BOOKED_APPOINTMENTS,
    // });
  } else {
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: res,
    });
  }
}

function* WATCH_GET_APPOINTMENTS(action) {
  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  try {
    const res = yield getAppointmentsService();
    yield put({
      type: actions.SET_APPOINTMENTS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: err,
    });
  }
}

function* WATCH_GET_BOOKED_APPOINTMENTS(action) {
  const { date } = action?.payload;
  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  try {
    const res = yield getBookedAppointmentsService(date);
    yield put({
      type: actions.SET_BOOKED_APPOINTMENTS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: err,
    });
  }
}

function* WATCH_GET_UPCOMING_DATE_APPOINTMENTS(action) {
  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  try {
    let date = new Date();
    const res = yield getUpcomingAppointmentsService(
      date,
      action.payload.mobile
    );
    yield put({
      type: actions.SET_UPCOMING_DATE_APPOINTMENTS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: err,
    });
  }
}

function* WATCH_GET_COMPLETED_DATE_APPOINTMENTS(action) {
  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  try {
    let date = new Date();
    const res = yield getCompletedAppointmentsService(
      date,
      action.payload.mobile
    );
    yield put({
      type: actions.SET_COMPLETED_DATE_APPOINTMENTS,
      payload: res,
    });
  } catch (err) {
    console.info("----------------------------");
    console.info("err =>", err);
    console.info("----------------------------");
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: err,
    });
  }
}

function* WATCH_GET_CENCELED_DATE_APPOINTMENTS(action) {
  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  try {
    const res = yield getCanceledAppointmentsService(action.payload.mobile);
    yield put({
      type: actions.SET_CANCELED_DATE_APPOINTMENTS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: err,
    });
  }
}

function* WATCH_CANCELED_APPOINTMENT(action) {
  const date = action?.payload?.date;
  const time = action?.payload?.start_time;

  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  try {
    yield canceledAppointmentService(action.payload.id);
    yield put({
      type: actions.IS_CANCELED_APPOINTMENT,
    });
    yield cancelBookingMessage(action.payload.mobile, { time, date });
  } catch (err) {
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: err,
    });
  }
}

function* WATCH_UPDATE_APPOINTMENT(action) {
  yield put({
    type: actions.APPOINTEMENTS_LOADING,
  });
  try {
    const { appointmentData, router } = action.payload;
    yield updateAppointmentService(appointmentData, appointmentData?.id);
    router.push("/appointments");
    yield put({
      type: actions.APPOINTMENTS_SUCCESS,
      payload: true,
    });
  } catch (err) {
    error("Something went wrong !");
    yield put({
      type: actions.APPOINTMENTS_ERROR,
      payload: err,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SAVE_APPOINTMENTS, WATCH_SAVE_APPOINTMENTS),
    takeEvery(actions.GET_APPOINTMENTS, WATCH_GET_APPOINTMENTS),
    takeEvery(actions.GET_BOOKED_APPOINTMENTS, WATCH_GET_BOOKED_APPOINTMENTS),
    takeEvery(
      actions.GET_UPCOMING_DATE_APPOINTMENTS,
      WATCH_GET_UPCOMING_DATE_APPOINTMENTS
    ),
    takeEvery(
      actions.GET_COMPLETED_DATE_APPOINTMENTS,
      WATCH_GET_COMPLETED_DATE_APPOINTMENTS
    ),
    takeEvery(
      actions.GET_CANCELED_DATE_APPOINTMENTS,
      WATCH_GET_CENCELED_DATE_APPOINTMENTS
    ),
    takeEvery(actions.CANCELED_APPOINTMENT, WATCH_CANCELED_APPOINTMENT),
    takeEvery(actions.UPDATE_APPOINTMENT, WATCH_UPDATE_APPOINTMENT),
  ]);
}
