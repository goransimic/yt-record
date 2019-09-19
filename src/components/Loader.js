import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStore } from '@/store';

const useStyles = makeStyles(() => ({
  loader: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0, 0.5)'
  }
}));

const Loader = () => {
  const { loader } = useStore('app');
  const classes = useStyles();

  return loader ? (
    <Fragment>
      <style>
        {`
            body {
              overflow: hidden;
              padding-right: ${
                window.innerWidth > document.documentElement.clientWidth ? '15px' : ''
              };
            }
          `}
      </style>

      <div className={classes.loader}>
        <CircularProgress size={120} thickness={4} />
      </div>
    </Fragment>
  ) : null;
};

export default Loader;
