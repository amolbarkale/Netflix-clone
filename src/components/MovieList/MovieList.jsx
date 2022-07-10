import { Grid } from '@mui/material';
import { Movie } from '..';
import useStyles from './styles';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const classes = useStyles();
  const startFrom = excludeFirst ? 1 : 0;

  return (<Grid conatianer className={classes.movieContainer}>{movies.results.slice(startFrom, numberOfMovies).map((movie, index) => (<Movie movie={movie} key={index} index={index} />))}</Grid>);
};
export default MovieList;
