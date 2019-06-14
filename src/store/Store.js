import React, { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

const StoreContext = createContext();
const DispatchContext = createContext();

export const Store = ({ children, initialState, rootReducer }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const storeContextValue = useMemo(() => state, [state]);
  const dispatchContextValue = useMemo(() => dispatch, [state]);

  return (
    <StoreContext.Provider value={storeContextValue}>
      <DispatchContext.Provider value={dispatchContextValue}>{children}</DispatchContext.Provider>
    </StoreContext.Provider>
  );
};

export const combineReducers = reducers => (state, action) => {
  const newState = {};
  Object.keys(reducers).forEach(index => (newState[index] = reducers[index](state[index], action)));
  return newState;
};

export const useStore = key => useContext(StoreContext)[key];

export const useDispatch = () => useContext(DispatchContext);

Store.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.object,
  rootReducer: PropTypes.func
};
