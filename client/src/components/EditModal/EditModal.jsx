/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
import createDateAndTimeString from '../util/functions/createDateAndTimeString';

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
        created: selectedUser.created,
        lastEdit: createDateAndTimeString(),
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
        <DialogTitle className={classes.title}>
          <Typography variant="h2">Edit User</Typography>
          <Typography gutterBottom variant="caption">
            ID: {selectedUser._id}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <div>
            <span className={classes.dateBox}>
              <Typography className={classes.dateTitle}>
                Date Created:
              </Typography>
              <Typography className={classes.date}>
                {selectedUser.created}
              </Typography>
            </span>
            <Divider />
            <span className={classes.dateBox}>
              <Typography className={classes.dateTitle}>
                Last Edited:
              </Typography>
              <Typography className={classes.date}>
                {selectedUser.lastEdit}
              </Typography>
            </span>
          </div>

          <Divider />

          <div className={classes.userFields}>
            <TextField
              className={classes.userField}
              variant="outlined"
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
              className={classes.userField}
              variant="outlined"
              error={lastNameError}
              onChange={editMade}
              label="Last Name"
              helperText={lastNameError ? 'Must contain only letters' : ''}
              defaultValue={selectedUser.lastName}
              inputRef={(ref) => {
                lastNameField = ref;
              }}
            />

            <FormControl className={classes.userField}>
              {/* <InputLabel shrink>Sex</InputLabel> */}
              <TextField
                label="Sex"
                variant="outlined"
                onChange={userSexChange}
                defaultValue={userSex}
                select
              >
                <MenuItem value={1}>M</MenuItem>
                <MenuItem value={2}>F</MenuItem>
                <MenuItem value={3}>NB</MenuItem>
              </TextField>
            </FormControl>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <BirthdayPicker
                className={classes.userField}
                userBirthday={userBirthday}
                userBirthdayChange={userBirthdayChange}
              />
            </MuiPickersUtilsProvider>
          </div>
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
