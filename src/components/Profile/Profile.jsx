import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favouriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchListMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography varient="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp;<ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies?.results?.length && !watchListMovies?.results?.length
        ? (
          <Typography varient="h5">Add favourites or watchlist some movie to see them here!
          </Typography>
        ) : (
          <Box><RatedCards title="Favorite Movies" data={favouriteMovies} />
            <RatedCards title="Watchlist" data={watchListMovies} />
          </Box>
        )}
    </Box>
  );
};

export default Profile;
