/* eslint-disable react/prop-types */
import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';
import isAlpha from 'validator/es/lib/isAlpha';
import BirthdayPicker from '../BirthdayPicker/BirthdayPicker';
import brithdayDateToString from '../util/functions/birthdayDateToString';
import brithdayStringToDate from '../util/functions/birthdayStringToDate';
import createDateAndTimeString from '../util/functions/createDateAndTimeString';
import sexIntToString from '../util/functions/sexIntToString';
import sexStringToInt from '../util/functions/sexStringToInt';
import useStyles from './Styles';

const UserForm = ({ user, editMade, submit }) => {
  const [userSex, setUserSex] = useState(
    user ? sexStringToInt(user.sex) : 3
  );
  const [userBirthday, setUserBirthday] = useState(
    user ? brithdayStringToDate(user.birthday) : new Date()
  );
  const classes = useStyles();

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  let firstNameField;
  let lastNameField;

  const userSexChange = (e) => {
    setUserSex(e.target.value);
    editMade();
  };
  
  const userBirthdayChange = (newBirthday) => {
    setUserBirthday(newBirthday);
    editMade();
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
        _id: user ? user.id : null,
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        sex: sexIntToString(userSex),
        birthday: brithdayDateToString(userBirthday),
        created:  user ? user.created : now,
        lastEdit: now,
      };

      submit(editedUser);
    }
  };

  return (
    <>
    <div className={classes.userFields}>
            <TextField
              className={classes.userField}
              variant="outlined"
              error={firstNameError}
              onChange={editMade}
              label="First Name"
              helperText={firstNameError ? 'Must contain only letters' : ''}
              defaultValue={user ? user.firstName: ''}
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
              defaultValue={user ? user.lastName : ''}
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
          <Button onClick={validateForm}>Submit</Button>
          </>
  );
};


export default UserForm;