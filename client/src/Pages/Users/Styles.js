import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles({
  usersMain: {
    width: '90%',
    margin: '0 auto',
    background: grey[200],
    borderRadius: '0.5em',
    padding: '0 0.5em 0.5em',
  },
  usersHeader: {
    display: 'flex',
    width: '90%',
    padding: 16,
  },
  name: {
    width: '30%',
  },
  sex: {
    width: '100%',
  },
  birthday: {
    width: '30%',
  },
});
