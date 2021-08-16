import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  toolsMain: {
    display: 'flex',
    padding: '1em',
    borderTop: '1px solid white',
  },
  toolsSection: {
    backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
    borderRadius: '1em',
    padding: '1em',
  },
}));
