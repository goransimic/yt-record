import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import { useStore } from '@/store';
import { history } from '@/helpers';
import { SearchForm, Video, VideoForm } from '@/components';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(2)
  },
  paper: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2)
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: theme.spacing(1),
    fontSize: '24px',
    backgroundColor: '#ff0000'
  }
}));

const VideoPage = () => {
  const { id } = useStore('video');
  const classes = useStyles();

  useEffect(() => {
    if (!id) history.push('/');
  }, [id]);

  return (
    <React.Fragment>
      <AppBar color="default" position="static">
        <Toolbar>
          <Avatar className={classes.logo} component={RouterLink} to="/">
            <LibraryMusicIcon color="inherit" fontSize="inherit" />
          </Avatar>

          <Link color="inherit" component={RouterLink} to="/" underline="none" variant="h4">
            YT Record
          </Link>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Container maxWidth="md">
          <SearchForm />

          <Video />

          <Paper className={classes.paper}>
            <VideoForm />
          </Paper>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default VideoPage;
