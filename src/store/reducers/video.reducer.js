import { videoConstants } from '../constants';

export const videoInitialState = {
  id: null,
  title: null,
  duration: null,
  isLoading: false
};

export const videoReducer = (state = videoInitialState, action) => {
  switch (action.type) {
    case videoConstants.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case videoConstants.FETCH_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case videoConstants.FETCH_FAILURE:
      return { ...state, isLoading: false };
    case videoConstants.PROCESS_REQUEST:
      return { ...state, isLoading: true };
    case videoConstants.PROCESS_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case videoConstants.PROCESS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
