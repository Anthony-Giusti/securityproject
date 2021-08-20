/* eslint-disable react/prop-types */
import DateFnsUtils from '@date-io/date-fns';
import { FormControl, MenuItem, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState, forwardRef, useImperativeHandle } from 'react';
import isAlpha from 'validator/es/lib/isAlpha';
import BirthdayPicker from '../BirthdayPicker/BirthdayPicker';
import brithdayDateToString from '../util/functions/birthdayDateToString';
import brithdayStringToDate from '../util/functions/birthdayStringToDate';
import createDateAndTimeString from '../util/functions/createDateAndTimeString';
import sexIntToString from '../util/functions/sexIntToString';
import sexStringToInt from '../util/functions/sexStringToInt';
import useStyles from './Styles';

const UserForm = forwardRef((props, ref) => {
  const [userSex, setUserSex] = useState(
    props.user ? sexStringToInt(props.user.sex) : 3
  );
  const [userBirthday, setUserBirthday] = useState(
    props.user ? brithdayStringToDate(props.user.birthday) : new Date()
  );
  const classes = useStyles();

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  let firstNameField;
  let lastNameField;

  const userSexChange = (e) => {
    setUserSex(e.target.value);

    if (props.editMade) {
      props.editMade();
    }
  };

  const userBirthdayChange = (newBirthday) => {
    setUserBirthday(newBirthday);

    if (props.editMade) {
      props.editMade();
    }
  };

  const validateForm = () => {
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

    const now = createDateAndTimeString();

    if (!errorsFound) {
      const editedUser = {
        _id: props.user ? props.user._id : null,
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        sex: sexIntToString(userSex),
        birthday: brithdayDateToString(userBirthday),
        created: props.user ? props.user.created : now,
        lastEdit: now,
      };

      props.submit(editedUser);
    }
  };

  useImperativeHandle(ref, () => ({
    sendForm() {
      validateForm();
    },
  }));

  return (
    <>
      <div className={classes.userFields}>
        <TextField
          className={classes.userField}
          variant="outlined"
          error={firstNameError}
          onChange={props.editMade ? props.editMade : null}
          label="First Name"
          helperText={firstNameError ? 'Must contain only letters' : ''}
          defaultValue={props.user ? props.user.firstName : ''}
          inputRef={(ref) => {
            firstNameField = ref;
          }}
        />

        <TextField
          className={classes.userField}
          variant="outlined"
          error={lastNameError}
          onChange={props.editMade ? props.editMade : null}
          label="Last Name"
          helperText={lastNameError ? 'Must contain only letters' : ''}
          defaultValue={props.user ? props.user.lastName : ''}
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
      </div>
    </>
  );
});

UserForm.displayName = 'UserForm';

export default UserForm;
