import { Grid } from '@mui/material';
import { Movie } from '..';
import useStyles from './styles';

const MovieList = ({ movies, numberOfMovies }) => {
  const classes = useStyles();
  return (<Grid conatianer className={classes.movieContainer}>{movies.results.slice(0, numberOfMovies).map((movie, index) => (<Movie movie={movie} key={index} index={index} />))}</Grid>);
};
export default MovieList;
