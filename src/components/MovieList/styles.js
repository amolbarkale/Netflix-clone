import { WrapText } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movieContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
