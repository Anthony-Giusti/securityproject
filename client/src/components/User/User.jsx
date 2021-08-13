/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import { useTheme } from '@material-ui/styles';
import useStyles from './Styles';

const User = ({ user, openEditModal, handleRemoveUser }) => {
  const [expandedMenuOpen, setExpanededMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const lgDevice = useMediaQuery(theme.breakpoints.up('lg'));
  const mdDevice = useMediaQuery(theme.breakpoints.up('md'));
  const smDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const handleExpandedMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExpandedMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card elevation={1} className={classes.userMain}>
      <CardContent className={classes.userInfo}>
        <span className={classes.name}>
          <Typography>{user.firstName}</Typography>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={classes.name}>
          <Typography>{user.lastName}</Typography>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={classes.sex}>
          <Typography>{user.sex}</Typography>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={classes.birthday}>
          <Typography>{user.birthday}</Typography>
        </span>
      </CardContent>

      <Divider orientation="vertical" flexItem />

      <CardActions className={classes.userButtons}>
        {mdDevice && (
          <>
            <IconButton size="small" onClick={() => openEditModal(user)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => handleRemoveUser(user)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
        {smDevice && (
          <>
            <IconButton onClick={handleExpandedMenuOpen} size="small">
              <MoreVertIcon />
            </IconButton>
          </>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleExpandedMenuClose}
        >
          <MenuItem>
            <Button
              startIcon={<EditIcon />}
              size="small"
              onClick={() => handleRemoveUser(user)}
            >
              Delete User
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              startIcon={<DeleteIcon />}
              size="small"
              onClick={() => openEditModal(user)}
            >
              Edit User
            </Button>
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default User;
