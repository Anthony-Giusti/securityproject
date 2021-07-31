import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './Styles';

const User = ({ user, openEditModal, handleRemoveUser }) => {
  const classes = useStyles();

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
        <IconButton>
          <EditIcon onClick={() => openEditModal(user)} />
        </IconButton>
        <IconButton>
          <DeleteIcon onClick={() => handleRemoveUser(user)} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default User;
