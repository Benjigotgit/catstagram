import { AppAction } from '../actions/AppAction';

const initialState = {
  appLoading: {
    loading: false,
    message: ""
  },
}

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AppAction.LOADING:
      return {
        ...state,
        appLoading: action.payload
      }
    default:
      return state;
  }
};

export default AppReducer;
