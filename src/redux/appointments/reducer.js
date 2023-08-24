import actions from "./actions"

const initialState = {
    appointments: null,
    upcoming: [],
    completed: [],
    canceled: [],
    bookedAppointments: [],
    isLoading: false,
    isSuccess: false,
    isCanceled: false,
    error: null,
}

const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload,
                isLoading: false,
                isSuccess: false,
                error: null
            }
        case actions.SET_BOOKED_APPOINTMENTS:
            return {
                ...state,
                bookedAppointments: action.payload,
                isLoading: false,
                isSuccess: false,
                error: null
            }
        case actions.SET_UPCOMING_DATE_APPOINTMENTS:
            return {
                ...state,
                upcoming: action.payload,
                isLoading: false,
                isSuccess: false,
                error: null
            }
        case actions.SET_COMPLETED_DATE_APPOINTMENTS:
            return {
                ...state,
                completed: action.payload,
                isLoading: false,
                isSuccess: false,
                error: null
            }
        case actions.SET_CANCELED_DATE_APPOINTMENTS:
            return {
                ...state,
                canceled: action.payload,
                isLoading: false,
                isSuccess: false,
                error: null
            }
        case actions.APPOINTEMENTS_LOADING:
            return { ...state, isLoading: true, isSuccess: false, error: null }
        case actions.IS_CANCELED_APPOINTMENT:
            return { ...state, isLoading: false, isSuccess: false, error: null, isCanceled: !state.isCanceled }
        case actions.APPOINTMENTS_ERROR:
            return { ...state, error: action.payload, isLoading: false, isSuccess: false }
        case actions.APPOINTMENTS_SUCCESS:
            return { ...state, isLoading: false, error: null, isSuccess: action.payload }
    }

    return state
}

export default appointmentsReducer