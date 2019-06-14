import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh'
  }
}));

const NoMatchPage = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Container maxWidth="md">
        <Typography align="center" variant="h1">
          404
        </Typography>
      </Container>
    </main>
  );
};

export default NoMatchPage;
