import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { useDispatch, appConstants, videoConstants } from '@/store';
import { history, useForm } from '@/helpers';
import { videoService } from '@/services';

const useStyles = makeStyles(() => ({
  form: {
    width: '100%'
  }
}));

const SearchForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialValues = { query: '' };

  const validate = values => {
    let errors = {};
    if (!values.query) errors.query = 'URL is required.';
    return errors;
  };

  const processForm = async () => {
    setIsSubmitting(false);
    dispatch({
      type: appConstants.TOGGLE_LOADER,
      payload: true
    });
    dispatch({ type: videoConstants.FETCH_REQUEST });

    try {
      const res = await videoService.fetch(values.query);
      dispatch({
        type: appConstants.TOGGLE_LOADER,
        payload: false
      });
      dispatch({ type: videoConstants.FETCH_SUCCESS, payload: res });
      history.push('/video');
    } catch (err) {
      dispatch({
        type: appConstants.TOGGLE_LOADER,
        payload: false
      });
      dispatch({
        type: appConstants.SEND_NOTIFICATION,
        payload: err.message
      });
      dispatch({ type: videoConstants.FETCH_FAILURE });
    }
  };

  const { values, isSubmitting, handleChange, handleBlur, handleSubmit, setIsSubmitting } = useForm(
    initialValues,
    validate,
    processForm
  );

  return (
    <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        name="query"
        label="URL"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled={isSubmitting} edge="end" type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default SearchForm;
