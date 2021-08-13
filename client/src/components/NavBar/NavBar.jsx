import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './Styles';

const NavBar = () => {
  const x = 'beep';
  const history = useHistory();
  const classes = useStyles();

  return (
    <AppBar className={classes.navBarMain}>
      <Toolbar>
        <Button
          variant="contained"
          endIcon={<ListIcon />}
          onClick={() => history.push('/')}
        >
          <Typography>Users</Typography>
        </Button>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => history.push('/create-user')}
        >
          <Typography>Create New User</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
