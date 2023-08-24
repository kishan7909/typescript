import actions from "./actions";

const initialState = {
  user: null,
  isLoading: false,
  isSucces: false,
  error: null,
  isUpdate: false,
  isUpdate: false,
  isFind: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isSucces: true,
        error: null,
      };
    case actions.USER_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        isSucces: false,
        error: null,
      };
    case actions.USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSucces: false,
      };

    case actions.USER_CLEAR:
      return initialState;
    // case actions.IS_USER_UPDATE:
    // return { ...state, }
  }

  return state;
};

export default userReducer;
