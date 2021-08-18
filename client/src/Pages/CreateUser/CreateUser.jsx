import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import isBefore from 'validator/es/lib/isBefore';
import useStyles from './styles';

import BirthdayPicker from '../../components/BirthdayPicker/BirthdayPicker';
import brithdayDateToString from '../../components/util/functions/birthdayDateToString';
import sexIntToString from '../../components/util/functions/sexIntToString';
import createDateAndTimeString from '../../components/util/functions/createDateAndTimeString';
import validateUserNames from '../../components/util/functions/validateUserNames';
import UserForm from '../../components/UserForm/UserForm';

const CreateUser = ({ submitUser }) => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [userBirthday, setUserBirthday] = useState(new Date());
  const [userSex, setUserSex] = useState(3);

  const classes = useStyles();

  let firstNameField;
  let lastNameField;

  const handleSubmit = () => {
    let errorsFound = false;

    const errors = validateUserNames({
      firstName: firstNameField.value,
      lastName: lastNameField.value,
    });

    if (errors.firstName) {
      setFirstNameError(true);
      errorsFound = true;
    } else {
      setFirstNameError(false);
    }

    if (errors.lastName) {
      setLastNameError(true);
      errorsFound = true;
    } else {
      setLastNameError(false);
    }

    if (!errorsFound) {
      const createDateAndTime = createDateAndTimeString();

      const newUser = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        sex: sexIntToString(userSex),
        birthday: brithdayDateToString(userBirthday),
        created: createDateAndTime,
        lastEdit: createDateAndTime,
      };

      submitUser(newUser);
    }
  };

  const handleBirthdayChange = (birthday) => {
    if (isBefore(brithdayDateToString(birthday, new Date()))) {
      setUserBirthday(birthday);
      setBirthdayError(false);
    } else {
      setUserBirthday(new Date());
      setBirthdayError(true);
    }
  };

  const handleUserSexChange = (e) => {
    setUserSex(e.target.value);
  };

  const submit = (user) => {
    console.log(user);
  }
  const editMade = () => {
    console.log(editMade);
  }

  return (
    <div>
      <Typography>New User</Typography>
      <div><UserForm user={null} editMade={null} submit={submit} /></div>
      
      {/* <form onSubmit={handleSubmit} className={classes.createUserForm}>
        <TextField
          error={firstNameError}
          label="First Name"
          helperText={firstNameError ? 'Must contain only letters' : ''}
          inputRef={(ref) => {
            firstNameField = ref;
          }}
        />

        <TextField
          error={lastNameError}
          label="Last Name"
          helperText={lastNameError ? 'Must contain only letters' : ''}
          inputRef={(ref) => {
            lastNameField = ref;
          }}
        />

        <FormControl>
          <InputLabel>Sex</InputLabel>
          <Select onChange={handleUserSexChange} defaultValue={3}>
            <MenuItem value={1}>M</MenuItem>
            <MenuItem value={2}>F</MenuItem>
            <MenuItem value={3}>NB</MenuItem>
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BirthdayPicker
            userBirthday={userBirthday}
            userBirthdayChange={handleBirthdayChange}
            birthdayError={birthdayError}
          />
        </MuiPickersUtilsProvider>
      </form> */}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit New User
      </Button>
    </div>
  );
};

CreateUser.propTypes = {
  submitUser: PropTypes.func,
};

export default CreateUser;
