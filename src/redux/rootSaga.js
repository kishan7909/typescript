import { all } from "redux-saga/effects"
import auth from './auth/saga';
import user from './user/saga';
import timeslot from './timeSlot/saga';
import appointments from './appointments/saga';
import categories from './category/saga';

export default function* rootSaga() {
    yield all([auth(), user(), timeslot(), appointments(), categories()])
}