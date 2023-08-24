import actions from "./actions"

const initialState = {
    categories: null,
    isLoading: false,
    isSuccess: false,
    error: null,
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
                isSuccess: false,
                error: null
            }

        case actions.CATEGORIES_LOADING:
            return { ...state, isLoading: true, isSuccess: false, error: null }
        case actions.CATEGORIES_ERROR:
            return { ...state, error: action.payload, isLoading: false, isSuccess: false }
        case actions.CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, error: null, isSuccess: action.payload }
    }

    return state
}

export default categoriesReducer