import { makeStyles } from '@material-ui/core';
import { blueGrey, grey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  btnActive: {
    color: theme.palette.secondary.main,
  },
  btnPassive: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));
