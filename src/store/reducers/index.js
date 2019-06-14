import { combineReducers } from '../';

import { appInitialState, appReducer } from './app.reducer';
import { playerInitialState, playerReducer } from './player.reducer';
import { videoInitialState, videoReducer } from './video.reducer';

export const initialState = {
  app: appInitialState,
  player: playerInitialState,
  video: videoInitialState
};

export const rootReducer = combineReducers({
  app: appReducer,
  player: playerReducer,
  video: videoReducer
});
