import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import { useStore, useDispatch, appConstants } from '@/store';

const Notification = () => {
  const { notification } = useStore('app');
  const dispatch = useDispatch();

  return (
    <Snackbar
      action={
        <IconButton
          color="inherit"
          onClick={() => dispatch({ type: appConstants.SEND_NOTIFICATION, payload: null })}
        >
          <CloseIcon />
        </IconButton>
      }
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top'
      }}
      autoHideDuration={6000}
      message={notification}
      open={!!notification}
      onClose={() => dispatch({ type: appConstants.SEND_NOTIFICATION, payload: null })}
    />
  );
};

export default Notification;
