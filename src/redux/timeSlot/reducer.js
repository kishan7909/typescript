import actions from "./actions"

const initialState = {
    timeslots: null,
    startTime: [],
    isLoading: false,
    isSuccess: false,
    error: null,
}

const timeslotReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_TIMESLOTS:
            return {
                ...state,
                timeslots: action.payload,
                isLoading: false,
                isSuccess: true,
                error: null
            }

        case actions.SET_TIMESLOTS_START_TIME_ARRAY:
            return {
                ...state,
                startTime: action.payload,
                isLoading: false,
                isSuccess: true,
                error: null
            }
        case actions.TIMESLOT_LOADING:
            return { ...state, isLoading: true, isSuccess: false, error: null }
        case actions.TIMESLOTERROR:
            return { ...state, error: action.payload, isLoading: false, isSuccess: false }
        case actions.IS_SUCCESS:
            return { ...state, isLoading: false, error: null, isSuccess: action.payload }
    }

    return state
}

export default timeslotReducer;