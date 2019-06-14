import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';

import { useStore, useDispatch, playerConstants } from '@/store';
import { round, secToTime, useInterval } from '@/helpers';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexFlow: 'column',
    margin: theme.spacing(2, 0)
  },
  embed: {
    position: 'relative',
    height: 0,
    paddingBottom: '56.25%'
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  controls: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  button: {
    flexGrow: 1
  },
  input: {
    padding: theme.spacing(0, 1)
  }
}));

const Video = () => {
  const player = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const { isPlaying } = useStore('player');
  const { id } = useStore('video');
  const dispatch = useDispatch();
  const classes = useStyles();

  const initPlayer = () => {
    if (!document.getElementById('YouTubeAPI')) {
      const script = document.createElement('script');
      script.id = 'YouTubeAPI';
      script.src = 'https://www.youtube.com/iframe_api';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);

      window['onYouTubeIframeAPIReady'] = () => {
        constructPlayer();
      };
    } else {
      constructPlayer();
    }
  };

  const constructPlayer = () => {
    player.current = new window['YT'].Player('player', {
      videoId: id,
      events: {
        onStateChange: handlePlayerStateChange
      }
    });
  };

  const updatePlayer = () => {
    player.current.cueVideoById(id);
    setCurrentTime(0);
    dispatch({
      type: playerConstants.UPDATE_STATE,
      payload: { currentTime: 0 }
    });
  };

  const getPlayerCurrentTime = () => round(player.current.getCurrentTime());

  const handlePlayerStateChange = event => {
    const { PLAYING, PAUSED, ENDED } = window['YT'].PlayerState;

    switch (event.data) {
      case PLAYING:
        dispatch({ type: playerConstants.UPDATE_STATE, payload: { isPlaying: true } });
        break;
      case PAUSED:
      case ENDED:
        setCurrentTime(getPlayerCurrentTime());
        dispatch({
          type: playerConstants.UPDATE_STATE,
          payload: { currentTime: getPlayerCurrentTime(), isPlaying: false }
        });
        break;
    }
  };

  const handleCurrentTime = value => {
    player.current.seekTo(value);
    setCurrentTime(value);
    dispatch({
      type: playerConstants.UPDATE_STATE,
      payload: { currentTime: value }
    });
  };

  useInterval(
    () => {
      setCurrentTime(getPlayerCurrentTime());
    },
    isPlaying ? 100 : null
  );

  useEffect(() => {
    if (!player.current) initPlayer();
    else updatePlayer();
  }, [id]);

  return (
    <Paper className={classes.paper}>
      <div className={classes.embed}>
        <div id="player" className={classes.iframe} />
      </div>

      <div className={classes.controls}>
        <Button
          className={classes.button}
          disabled={isPlaying}
          size="large"
          variant="contained"
          onClick={() => handleCurrentTime(round(currentTime - 0.1))}
        >
          <FastRewindIcon />
        </Button>

        <TextField
          className={classes.input}
          InputProps={{
            readOnly: true,
            inputProps: {
              style: { textAlign: 'center' }
            }
          }}
          value={secToTime(currentTime)}
          variant="outlined"
        />

        <Button
          className={classes.button}
          disabled={isPlaying}
          size="large"
          variant="contained"
          onClick={() => handleCurrentTime(round(currentTime + 0.1))}
        >
          <FastForwardIcon />
        </Button>
      </div>
    </Paper>
  );
};

export default Video;
