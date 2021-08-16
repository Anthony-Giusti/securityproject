import { makeStyles, requirePropFactory } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

export default makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
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
    // gridAutoColumns: 'min-content',
    // gridAutoFlow: 'column',
    gap: 10,
    // gridAutoRows: 'minmax(50px, auto)',
    flexWrap: 'wrap',
    marginTop: '1.5em',
  },
  userField: {
    // margin: '0.4em',
  },
}));
