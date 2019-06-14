import { appConstants } from '../constants';

export const appInitialState = {
  loader: false,
  notification: null
};

export const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case appConstants.SEND_NOTIFICATION:
      return { ...state, notification: action.payload };
    case appConstants.TOGGLE_LOADER:
      return { ...state, loader: action.payload };
    default:
      return state;
  }
};
