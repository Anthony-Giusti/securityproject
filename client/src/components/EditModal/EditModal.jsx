import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTheme } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import DateFnsUtils from '@date-io/date-fns';
import isAlpha from 'validator/es/lib/isAlpha';
import useStyles from './styles';

import BirthdayPicker from '../BirthdayPicker/BirthdayPicker';

import sexIntToString from '../util/functions/sexIntToString';
import sexStringToInt from '../util/functions/sexStringToInt';
import brithdayDateToString from '../util/functions/birthdayDateToString';
import brithdayStringToDate from '../util/functions/birthdayStringToDate';
import createDateAndTimeString from '../util/functions/createDateAndTimeString';
import validateUserNames from '../util/functions/validateUserNames';
import UserForm from '../UserForm/UserForm';

const EditModal = ({ editModalOpen, closeEditModal, selectedUser }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [userSex, setUserSex] = useState(sexStringToInt(selectedUser.sex));
  const [editModalConfirmOpen, setEditModalConfirmOpen] = useState(false);
  const [userBirthday, setUserBirthday] = useState(
    brithdayStringToDate(selectedUser.birthday)
  );

  const ref = useRef(null);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const lgDevice = useMediaQuery(theme.breakpoints.up('lg'));
  const mdDevice = useMediaQuery(theme.breakpoints.up('md'));
  const smDevice = useMediaQuery(theme.breakpoints.down('sm'));

  // let firstNameField;
  // let lastNameField;

  // const confrimEdits = () => {
  //   let errorsFound = false;

  //   const errors = validateUserNames({
  //     firstName: firstNameField.value,
  //     lastName: lastNameField.value,
  //   });

  //   if (errors.firstName) {
  //     setFirstNameError(true);
  //     errorsFound = true;
  //   } else {
  //     setFirstNameError(false);
  //   }

  //   if (errors.lastName) {
  //     setLastNameError(true);
  //     errorsFound = true;
  //   } else {
  //     setLastNameError(false);
  //   }

  //   if (!errorsFound) {
  //     const editedUser = {
  //       _id: selectedUser._id,
  //       firstName: firstNameField.value,
  //       lastName: lastNameField.value,
  //       sex: sexIntToString(userSex),
  //       birthday: brithdayDateToString(userBirthday),
  //       created: selectedUser.created,
  //       lastEdit: createDateAndTimeString(),
  //     };

  //     setEditModalConfirmOpen(false);
  //     setIsEdited(false);
  //     closeEditModal('submit', editedUser);
  //   }
  // };

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

  // const userSexChange = (e) => {
  //   setUserSex(e.target.value);
  //   editMade();
  // };

  // const userBirthdayChange = (newBirthday) => {
  //   setUserBirthday(newBirthday);
  //   editMade();
  // };

  const handleSubmit = (editedUser) => {
    console.log(editedUser);
    setEditModalConfirmOpen(false);
    setIsEdited(false);
    closeEditModal('submit', editedUser);
  }

  return (
    <>
      <Dialog open={editModalOpen} onClose={handleModalClose} fullWidth>
        <div className={classes.title}>
          <Typography variant="h2">Edit User</Typography>
          <Typography gutterBottom variant="caption">
            ID: {selectedUser._id}
          </Typography>
        </div>

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

          <UserForm submit={handleSubmit} user={selectedUser} editMade={editMade} ref={ref} />

          {/* <div className={classes.userFields}>
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
              <TextField
                label="Sex"
                variant="outlined"
                onChange={userSexChange}
                value={userSex}
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
          </div> */}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            className={classes.negitiveBtn}
            color="primary"
            onClick={() => ref.current.sendForm()}
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
          <DialogActions
            // disableSpacing={mdDevice ? false : true}
            className={classes.confirmDialogBtnsContainer}
          >
            <Button
              className={classes.confirmDialogBtn}
              variant="contained"
              startIcon={<CheckIcon />}
              color="primary"
              onClick={() => ref.current.sendForm()}
            >
              Confirm Edits
            </Button>
            <Button
              className={classes.confirmDialogBtn}
              variant="contained"
              startIcon={<DeleteIcon />}
              color="secondary"
              onClick={discardEdits}
            >
              Discard Edits
            </Button>
            <Button className={classes.confirmDialogBtn} onClick={cancelEdits}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

EditModal.propTypes = {
  editModalOpen: PropTypes.bool,
  closeEditModal: PropTypes.func,
  selectedUser: PropTypes.object,
};

export default EditModal;
