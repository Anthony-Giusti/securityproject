import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';

const NavBar = () => {
    const x = 'beep';
    const history = useHistory();

    return( 
    <AppBar>
        <Toolbar>
        <Button endIcon={<ListIcon />} onClick={() => history.push('/')}>
            <Typography>Users</Typography>
        </Button>
        <Button endIcon={<AddIcon />} onClick={() => history.push('/create-user')}>
            <Typography>Create New User</Typography>
        </Button>
        </Toolbar>
      
    </AppBar>)
}

export default NavBar;