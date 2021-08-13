/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import 'date-fns';

import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './Styles';
import User from '../User/User';
import EditModal from '../EditModal/EditModal';
import UsersHeader from './UsersHeader/UsersHeader';

const Users = ({
  userData,
  removeUser,
  submitEditedUser,
  handleSexFilter,
  sortUsers,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const classes = useStyles();

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = (action, editedUser) => {
    if (action === 'submit') {
      submitEditedUser(editedUser);
    }
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const confirmRemoveUser = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleRemoveUser = () => {
    removeUser(selectedUser._id);
    setSelectedUser(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div className={classes.usersMain}>
      <UsersHeader handleSexFilter={handleSexFilter} sortUsers={sortUsers} />
      {userData.map((user) => (
        <User
          key={user._id}
          user={user}
          handleRemoveUser={confirmRemoveUser}
          openEditModal={openEditModal}
        />
      ))}
      {selectedUser && editModalOpen && (
        <EditModal
          editModalOpen={editModalOpen}
          closeEditModal={closeEditModal}
          selectedUser={selectedUser}
        />
      )}

      {selectedUser && (
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>
            Confirm deletion of user {selectedUser.firstName}{' '}
            {selectedUser.lastName}?
          </DialogTitle>
          <DialogActions>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="secondary"
              onClick={() => handleRemoveUser()}
            >
              Confirm Delete
            </Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Users;
