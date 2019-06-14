import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import { SearchForm } from '@/components';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5, 2.5)
  },
  logo: {
    width: '120px',
    height: '120px',
    fontSize: '64px',
    backgroundColor: '#ff0000'
  },
  title: {
    margin: theme.spacing(2, 0)
  }
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Avatar className={classes.logo}>
            <LibraryMusicIcon color="inherit" fontSize="inherit" />
          </Avatar>

          <Typography className={classes.title} variant="h1">
            YT Record
          </Typography>

          <SearchForm />
        </Paper>
      </Container>
    </main>
  );
};

export default HomePage;
