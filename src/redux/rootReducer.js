import { combineReducers } from "redux";
import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import timeslotReducer from './timeSlot/reducer';
import appointmentsReducer from './appointments/reducer';
import categoriesReducer from './category/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    timeslot: timeslotReducer,
    appointments: appointmentsReducer,
    categories: categoriesReducer
})

export default rootReducer