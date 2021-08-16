import { makeStyles } from '@material-ui/core';

export default makeStyles({
  userMain: {
    display: 'flex',
    width: '100%',
    margin: '0.2em 0',
  },
  userInfo: {
    display: 'flex',
    width: '90%',
    padding: '16px 0',
  },
  name: {
    width: '35%',
  },
  sex: {
    width: '10%',
  },
  birthday: {
    width: '20%',
  },
  userButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '10%',
    padding: 0,
  },
});
