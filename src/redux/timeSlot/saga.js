"use strict";
import { delay, takeEvery, takeLatest, put, all } from 'redux-saga/effects';
import actions from './actions';
// import { saveUserDetails } from '../../firestoreAPI.js/user';
import { getTimeSlotsService, get_TimeSlots_StartTime_ArrayService, saveTimeSlotService } from '../../firestoreAPI.js/timeslot';

function* WATCH_SAVE_TIMESLOT(action) {
    yield put({
        type: actions.TIMESLOT_LOADING
    })
    const timeSlot = action.payload
    const res = yield saveTimeSlotService(timeSlot)
    if (res.id) {
        yield put({
            type: actions.GET_TIMESLOTS,
        })
    } else {
        yield put({
            type: actions.TIMESLOTERROR,
            payload: res
        })
    }
}

function* WATCH_GET_TIMESLOT() {
    yield put({
        type: actions.TIMESLOT_LOADING,
    })
    try {
        const res = yield getTimeSlotsService()
        yield put({
            type: actions.SET_TIMESLOTS,
            payload: res
        })
    } catch (err) {
        yield put({
            type: actions.TIMESLOTERROR,
            payload: err
        })
    }

}
function* WATCH_GET_START_TIMESLOT_ARRAY() {
    yield put({
        type: actions.TIMESLOT_LOADING,
    })
    try {
        const res = yield get_TimeSlots_StartTime_ArrayService()
        yield put({
            type: actions.SET_TIMESLOTS_START_TIME_ARRAY,
            payload: res
        })
    } catch (err) {
        yield put({
            type: actions.TIMESLOTERROR,
            payload: err
        })
    }

}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.SAVE_TIMESLOT, WATCH_SAVE_TIMESLOT),
        takeEvery(actions.GET_TIMESLOTS, WATCH_GET_TIMESLOT),
        takeEvery(actions.GET_TIMESLOTS_START_TIME_ARRAY, WATCH_GET_START_TIMESLOT_ARRAY),

    ])
}