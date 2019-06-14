import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { history, theme } from './helpers';
import { Store, initialState, rootReducer } from './store';
import Routes from './views';
import { Loader, Notification } from './components';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <Store initialState={initialState} rootReducer={rootReducer}>
      <Router history={history}>
        <Routes />
      </Router>

      <Loader />
      <Notification />
    </Store>
  </ThemeProvider>
);

export default App;
