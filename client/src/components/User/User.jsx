import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import { useTheme } from '@material-ui/styles';
import useStyles from './Styles';

const User = ({ user, openEditModal, handleRemoveUser }) => {
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
        <span className={`${classes.infoCell} ${classes.name}`}>
          <Typography className={classes.userText}>{user.firstName}</Typography>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={`${classes.infoCell} ${classes.name}`}>
          <Typography>{user.lastName}</Typography>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={`${classes.infoCell} ${classes.sex}`}>
          <Typography>{user.sex}</Typography>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={`${classes.infoCell} ${classes.birthday}`}>
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

User.propTypes = {
  user: PropTypes.object,
  openEditModal: PropTypes.func,
  handleRemoveUser: PropTypes.func,
};

export default User;
