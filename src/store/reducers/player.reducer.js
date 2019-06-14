import { playerConstants } from '../constants';

export const playerInitialState = {
  currentTime: 0,
  isPlaying: false
};

export const playerReducer = (state = playerInitialState, action) => {
  switch (action.type) {
    case playerConstants.UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
