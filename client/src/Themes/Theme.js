import { createTheme } from '@material-ui/core/styles';
import {
  blueGrey,
  red,
  grey,
  cyan,
  teal,
  green,
} from '@material-ui/core/colors';

const Theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: red[900],
    },
    selected: {
      main: '#81c784',
    },
    default: {
      main: grey[300],
    },
    positive: {
      main: green[400],
    },
    negitive: {
      main: red[900],
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default Theme;
