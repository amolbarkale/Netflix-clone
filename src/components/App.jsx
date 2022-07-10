import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { useRef } from 'react';
import useStyles from './styles';
import { Actors, Movies, MoviesInformation, Navbar, Profile } from '.';
import useAlan from './Alan';

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>
          <Route path="/movie/:id">
            <MoviesInformation />
          </Route>
          <Route path="/actors/:id">
            <Actors />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
