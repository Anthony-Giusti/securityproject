import { makeStyles, requirePropFactory } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

export default makeStyles((theme) => ({
  modalMain: {
    width: '60%',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
  },
  userId: {
    padding: '0 24px',
  },
  dateBox: {
    display: 'flex',
    alignItems: 'center',
    margin: '0.25em 0',
  },
  dateTitle: {
    width: '20%',
  },
  date: {
    flexBasis: '50%',
    flexGrow: 1,
    paddingLeft: '1em',
  },
  userFields: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: 10,
    marginTop: '1.5em',
  },
}));
