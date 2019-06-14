import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import VideoPage from './VideoPage';
import NoMatchPage from './NoMatchPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/video" component={VideoPage} />
      <Route component={NoMatchPage} />
    </Switch>
  );
};

export default Routes;
