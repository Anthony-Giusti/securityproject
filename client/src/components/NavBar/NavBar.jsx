import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useEffect, useState } from 'react';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/styles';

import useStyles from './Styles';

const NavBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const mdDevice = useMediaQuery(theme.breakpoints.up('sm'));

  console.log(mdDevice);

  return (
    <AppBar className={classes.navBarMain}>
      <Toolbar className={classes.toolbar}>
        <Button
          className={classes.toolbarBtn}
          variant="contained"
          endIcon={!mdDevice ? null : <ListIcon />}
          onClick={() => history.push('/')}
          color={history.location.pathname === '/' ? 'secondary' : 'default'}
        >
          <Typography>Users</Typography>
        </Button>
        <Button
          variant="contained"
          endIcon={!mdDevice ? null : <AddIcon />}
          onClick={() => history.push('/create-user')}
          color={
            history.location.pathname === '/create-user'
              ? 'secondary'
              : 'default'
          }
        >
          <Typography>Create New User</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
