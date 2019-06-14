import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import { useStore, useDispatch, appConstants, videoConstants } from '@/store';
import { secToTime, useForm } from '@/helpers';
import { videoService } from '@/services';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  }
}));

const VideoForm = () => {
  const { currentTime, isPlaying } = useStore('player');
  const { duration, id, title } = useStore('video');
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialValues = {
    id,
    title: title || '',
    startTime: 0,
    endTime: duration || 0,
    removeSilence: true,
    normalizeVolume: false,
    audioBitrate: 128
  };

  const validate = values => {
    const errors = {};
    if (!values.title) errors.title = 'Title is required.';
    if (values.startTime >= values.endTime) errors.duration = 'Duration is invalid.';
    return errors;
  };

  const processForm = async () => {
    setIsSubmitting(false);
    dispatch({
      type: appConstants.TOGGLE_LOADER,
      payload: true
    });
    dispatch({ type: videoConstants.PROCESS_REQUEST });

    try {
      await videoService.process(values);
      dispatch({
        type: appConstants.TOGGLE_LOADER,
        payload: false
      });
      dispatch({ type: videoConstants.PROCESS_SUCCESS });
    } catch (err) {
      dispatch({
        type: appConstants.TOGGLE_LOADER,
        payload: false
      });
      dispatch({
        type: appConstants.SEND_NOTIFICATION,
        payload: err.message
      });
      dispatch({ type: videoConstants.PROCESS_FAILURE });
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setValues,
    setFieldValue,
    setIsSubmitting
  } = useForm(initialValues, validate, processForm);

  useEffect(() => {
    setValues(initialValues);
  }, [id]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit} onReset={handleReset}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.duration && touched.startTime}
            fullWidth
            helperText={errors.duration && touched.startTime && errors.duration}
            label="Start time"
            name="startTime"
            value={secToTime(values.startTime)}
            variant="outlined"
            InputProps={{
              readOnly: true,
              inputProps: {
                style: { textAlign: 'center' }
              },
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    disabled={isPlaying}
                    edge="start"
                    onClick={() => setFieldValue('startTime', currentTime)}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.duration && touched.endTime}
            fullWidth
            helperText={errors.duration && touched.endTime && errors.duration}
            label="End time"
            name="endTime"
            value={secToTime(values.endTime)}
            variant="outlined"
            InputProps={{
              readOnly: true,
              inputProps: {
                style: { textAlign: 'center' }
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={isPlaying}
                    edge="end"
                    onClick={() => setFieldValue('endTime', currentTime)}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            error={!!errors.title && touched.title}
            fullWidth
            helperText={errors.title && touched.title && errors.title}
            label="Title"
            name="title"
            value={values.title}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch checked={values.removeSilence} name="removeSilence" onChange={handleChange} />
            }
            label="Remove silence"
          />

          <FormControlLabel
            control={
              <Switch
                checked={values.normalizeVolume}
                name="normalizeVolume"
                onChange={handleChange}
              />
            }
            label="Normalize volume"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="audioBitrate">Audio Bitrate</InputLabel>
            <Select
              input={<OutlinedInput id="audioBitrate" labelWidth={95} name="audioBitrate" />}
              value={values.audioBitrate}
              onChange={handleChange}
            >
              <MenuItem value={96}>96 Kbps</MenuItem>
              <MenuItem value={128}>128 Kbps</MenuItem>
              <MenuItem value={192}>192 Kbps</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.button}
            color="primary"
            disabled={isSubmitting}
            type="submit"
            size="large"
            variant="contained"
          >
            Record MP3
          </Button>
          <Button className={classes.button} type="reset" size="large" variant="contained">
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VideoForm;
