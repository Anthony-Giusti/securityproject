/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import isAlpha from 'validator/es/lib/isAlpha';
import useStyles from './styles';

import BirthdayPicker from '../BirthdayPicker/BirthdayPicker';

import sexIntToString from '../util/functions/sexIntToString';
import sexStringToInt from '../util/functions/sexStringToInt';
import brithdayDateToString from '../util/functions/birthdayDateToString';
import brithdayStringToDate from '../util/functions/birthdayStringToDate';

const EditModal = ({ editModalOpen, closeEditModal, selectedUser }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [userSex, setUserSex] = useState(sexStringToInt(selectedUser.sex));
  const [editModalConfirmOpen, setEditModalConfirmOpen] = useState(false);
  const [userBirthday, setUserBirthday] = useState(
    brithdayStringToDate(selectedUser.birthday)
  );

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const classes = useStyles();

  let firstNameField;
  let lastNameField;

  const confrimEdits = () => {
    let errorsFound = false;

    if (!isAlpha(firstNameField.value)) {
      setFirstNameError(true);
      errorsFound = true;
    } else {
      setFirstNameError(false);
    }

    if (!isAlpha(lastNameField.value)) {
      setLastNameError(true);
      errorsFound = true;
    } else {
      setLastNameError(false);
    }

    if (!errorsFound) {
      const editedUser = {
        _id: selectedUser._id,
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        sex: sexIntToString(userSex),
        birthday: brithdayDateToString(userBirthday),
      };

      setEditModalConfirmOpen(false);
      setIsEdited(false);
      closeEditModal('submit', editedUser);
    }
  };

  const discardEdits = () => {
    setEditModalConfirmOpen(false);
    setIsEdited(false);
    closeEditModal('discard', null);
  };

  const cancelEdits = () => {
    setEditModalConfirmOpen(false);
  };

  const handleModalClose = () => {
    if (isEdited) {
      setEditModalConfirmOpen(true);
    } else {
      closeEditModal('discard', null);
    }
  };

  const editMade = () => {
    if (!isEdited) {
      setIsEdited(true);
    }
  };

  const userSexChange = (e) => {
    setUserSex(e.target.value);
    editMade();
  };

  const userBirthdayChange = (newBirthday) => {
    setUserBirthday(newBirthday);
    editMade();
  };

  return (
    <>
      <Dialog open={editModalOpen} onClose={handleModalClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className={classes.userFields}>
          <TextField
            error={firstNameError}
            onChange={editMade}
            label="First Name"
            helperText={firstNameError ? 'Must contain only letters' : ''}
            defaultValue={selectedUser.firstName}
            inputRef={(ref) => {
              firstNameField = ref;
            }}
          />

          <TextField
            error={lastNameError}
            onChange={editMade}
            label="Last Name"
            helperText={lastNameError ? 'Must contain only letters' : ''}
            defaultValue={selectedUser.lastName}
            inputRef={(ref) => {
              lastNameField = ref;
            }}
          />

          <FormControl>
            <InputLabel>Sex</InputLabel>
            <Select onChange={userSexChange} defaultValue={userSex}>
              <MenuItem value={1}>M</MenuItem>
              <MenuItem value={2}>F</MenuItem>
              <MenuItem value={3}>NB</MenuItem>
            </Select>
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <BirthdayPicker
              userBirthday={userBirthday}
              userBirthdayChange={userBirthdayChange}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            className={classes.negitiveBtn}
            color="primary"
            onClick={confrimEdits}
            disabled={!isEdited}
          >
            Confirm Edits
          </Button>
          <Button
            className={classes.negitiveBtn}
            onClick={() => closeEditModal('discard', null)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editModalConfirmOpen}>
        <DialogContent>
          <Typography>Confirm edits before closing?</Typography>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            color="primary"
            onClick={confrimEdits}
          >
            Confirm Edits
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="secondary"
            onClick={discardEdits}
          >
            Discard Edits
          </Button>
          <Button onClick={cancelEdits}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditModal;
