"use strict";
import { delay, takeEvery, takeLatest, put, all } from 'redux-saga/effects';
import actions from './actions';
import { deleteCategoriesService, getCategoriesService, saveCategoryService, updateCategoriesService } from '../../firestoreAPI.js/categories';

function* WATCH_SAVE_CATEGORIES(action) {
    yield put({
        type: actions.CATEGORIES_LOADING
    })
    const categories = action.payload
    const res = yield saveCategoryService(categories)
    if (res.id) {
        yield put({
            type: actions.GET_CATEGORIES,
        })

    } else {
        yield put({
            type: actions.CATEGORIES_ERROR,
            payload: res
        })
    }
}

function* WATCH_GET_CATEGORIES() {
    yield put({
        type: actions.CATEGORIES_LOADING,
    })
    try {
        const res = yield getCategoriesService()
        yield put({
            type: actions.SET_CATEGORIES,
            payload: res
        })
    } catch (err) {
        yield put({
            type: actions.CATEGORIES_ERROR,
            payload: err
        })
    }

}

function* WATCH_DELETE_CATEGORIES(action) {
    yield put({
        type: actions.CATEGORIES_LOADING,
    })

    const isDeleted = yield deleteCategoriesService(action.payload)

    if (isDeleted) {
        yield put({
            type: actions.GET_CATEGORIES,
        })
    } else {
        yield put({
            type: actions.CATEGORIES_ERROR,
            payload: "category Delete error"
        })
    }

}

function* WATCH_UPDATE_CATEGORIES(action) {
    yield put({
        type: actions.CATEGORIES_LOADING,
    })

    const isUpdate = yield updateCategoriesService(action.payload)

    if (isUpdate) {
        yield put({
            type: actions.GET_CATEGORIES,
        })
    } else {
        yield put({
            type: actions.CATEGORIES_ERROR,
            payload: "category Update error"
        })
    }
}
// function* WATCH_GET_BOOKED_APPOINTMENTS() {
//     yield put({
//         type: actions.APPOINTEMENTS_LOADING,
//     })
//     try {
//         const res = yield getBookedAppointmentsService()
//         yield put({
//             type: actions.SET_BOOKED_APPOINTMENTS,
//             payload: res
//         })
//     } catch (err) {
//         yield put({
//             type: actions.APPOINTMENTS_ERROR,
//             payload: err
//         })
//     }

// }

export default function* rootSaga() {
    yield all([
        takeEvery(actions.SAVE_CATEGORIS, WATCH_SAVE_CATEGORIES),
        takeEvery(actions.GET_CATEGORIES, WATCH_GET_CATEGORIES),
        takeEvery(actions.UPDATE_CATEGORIS, WATCH_UPDATE_CATEGORIES),
        takeEvery(actions.DELETE_CATEGORIS, WATCH_DELETE_CATEGORIES),
        // takeEvery(actions.GET_BOOKED_APPOINTMENTS, WATCH_GET_BOOKED_APPOINTMENTS)
    ])
}