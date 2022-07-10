import { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ColorModeContext } from '../Utils/ToggleColorMode';
import { fetchToken } from '../Utils';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: '79a991e25f9e02fa5e64e16b0bd251892e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genresOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genresOrCategory.toLowerCase());
          if (foundGenre) {
            history.push('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genresOrCategory.startsWith('top') ? 'top_rated' : genresOrCategory;
            history.push('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          window.location.href = '/';
          // history.push('/');
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
