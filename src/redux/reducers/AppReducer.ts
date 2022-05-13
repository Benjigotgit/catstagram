import { AppAction } from '../actions/AppAction';

const initialState = {
  loadingSpinner: {
    loading: false,
    message: ""
  },
  appError: {
    visible: false,
    title: undefined,
    error: {
      errorMessage: undefined
    }
  },
}

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AppAction.LOADING:
      return {
        ...state,
        loadingSpinner: action.payload
      }
    case AppAction.ERROR:
      return {
        ...state,
        appError: action.payload
      }
    default:
      return state;
  }
};

export default AppReducer;
