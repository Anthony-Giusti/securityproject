import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import 'date-fns';

import useStyles from './Styles';
import User from '../../components/User/User';
import EditModal from '../../components/EditModal/EditModal';
import UsersHeader from './UsersHeader/UsersHeader';
import brithdayStringToDate from '../../components/util/functions/birthdayStringToDate';

const Users = ({ userData, removeUser, submitEditedUser, fetchUserData }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sexFilter, setSexFilter] = useState([]);
  const [visibleUserData, setVisibleUserData] = useState([]);
  const [currentSort, setCurrentSort] = useState({
    property: '_id',
    order: 'ascending',
  });

  const classes = useStyles();

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleSexFilter = (newSex) => {
    if (sexFilter.includes(newSex)) {
      setSexFilter((prev) => prev.filter((sex) => sex !== newSex));
    } else {
      setSexFilter((prev) => [...prev, newSex]);
    }
  };

  const filterUsers = (users) => {
    const filteredUsers = [];

    users.forEach((user) => {
      for (let x = 0; x < sexFilter.length; x += 1) {
        if (user.sex === sexFilter[x]) {
          filteredUsers.push(user);
          break;
        }
      }
    });

    return filteredUsers;
  };

  const sortByBirthday = (users, order) => {
    const filteredUsers = [...userData];

    if (order === 'descending') {
      filteredUsers.sort((a, b) =>
        brithdayStringToDate(a.birthday) > brithdayStringToDate(b.birthday)
          ? 1
          : -1
      );
    } else if (order === 'ascending') {
      filteredUsers.sort((a, b) =>
        brithdayStringToDate(a.birthday) < brithdayStringToDate(b.birthday)
          ? 1
          : -1
      );
    }

    return filteredUsers;
  };

  const sortUsers = (users, order, list) => {
    const filteredUsers = users;

    if (order === 'descending') {
      filteredUsers.sort((a, b) =>
        a[list].toLowerCase() > b[list].toLowerCase() ? 1 : -1
      );
    }

    if (order === 'ascending') {
      filteredUsers.sort((a, b) =>
        a[list].toLowerCase() < b[list].toLowerCase() ? 1 : -1
      );
    }

    return filteredUsers;
  };

  const handleSortUsers = (order, list) => {
    let sortedUsers = [...userData];

    if (list === 'birthday') {
      sortedUsers = sortByBirthday(sortedUsers, order);
    } else {
      sortedUsers = sortUsers(sortedUsers, order, list);
    }

    setCurrentSort({ property: list, order });

    if (sexFilter.length > 0) {
      setVisibleUserData(filterUsers(sortedUsers));
    } else {
      setVisibleUserData(sortedUsers);
    }
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

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    handleSortUsers(currentSort.order, currentSort.property);
  }, [userData, sexFilter]);

  return (
    <div className={classes.usersMain}>
      <UsersHeader
        handleSexFilter={handleSexFilter}
        sortUsers={handleSortUsers}
        userData={visibleUserData}
        sexFilter={sexFilter}
      />
      {visibleUserData.map((user) => (
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

Users.propTypes = {
  userData: PropTypes.object,
  removeUser: PropTypes.func,
  submitEditedUser: PropTypes.func,
  fetchUserData: PropTypes.func,
};

export default Users;
