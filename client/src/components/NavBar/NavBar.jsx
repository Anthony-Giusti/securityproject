import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/styles';

import useStyles from './Styles';

const NavBar = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(history.location.pathname);
  const classes = useStyles();
  const theme = useTheme();
  const mdDevice = useMediaQuery(theme.breakpoints.up('sm'));

  console.log(mdDevice);

  const handlePageChange = (route) => {
    setCurrentPage(route);
    history.push(route);
  };

  return (
    <AppBar className={classes.navBarMain}>
      <Toolbar className={classes.toolbar}>
        <Button
          className={classes.toolbarBtn}
          variant="contained"
          endIcon={!mdDevice ? null : <ListIcon />}
          onClick={() => handlePageChange('/')}
          color={currentPage === '/' ? 'secondary' : 'default'}
        >
          <Typography>Users</Typography>
        </Button>
        <Button
          variant="contained"
          endIcon={!mdDevice ? null : <AddIcon />}
          onClick={() => handlePageChange('/create-user')}
          color={currentPage === '/create-user' ? 'secondary' : 'default'}
        >
          <Typography>Create New User</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
