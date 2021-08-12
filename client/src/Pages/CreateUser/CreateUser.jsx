import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";


import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import isAlpha from "validator/es/lib/isAlpha";
import isBefore from "validator/es/lib/isBefore";


import BirthdayPicker from "../../components/BirthdayPicker/BirthdayPicker";
import brithdayDateToString from "../../components/util/functions/birthdayDateToString";
import sexIntToString from "../../components/util/functions/sexIntToString";

const CreateUser = ({submitUser}) => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [userBirthday, setUserBirthday] = useState(new Date());
  const [userSex, setUserSex] = useState(3)

  let firstNameField;
  let lastNameField;

  const handleSubmit = () => {
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

    if (birthdayError) {
      errorsFound = true;
    }

    if (!errorsFound) {
      const newUser = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        sex: sexIntToString(userSex),
        birthday: brithdayDateToString(userBirthday),
      };

      submitUser(newUser);
  }
}

  const handleBirthdayChange = (birthday) => {
    if(isBefore(brithdayDateToString(birthday, new Date()))){
      setUserBirthday(birthday);
      setBirthdayError(false);
    } else {
      setUserBirthday(new Date());
      setBirthdayError(true);
    }

    
  }

  const handleUserSexChange = (e) => {
    setUserSex(e.target.value);
  }

  return (
    <div>
      <Typography>New User</Typography>
      <form onSubmit={handleSubmit}>
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
          <Select  onChange={handleUserSexChange} defaultValue={3}>
            <MenuItem value={1}>M</MenuItem>
            <MenuItem value={2}>F</MenuItem>
            <MenuItem value={3}>NB</MenuItem>
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BirthdayPicker 
            userBirthday={userBirthday}
             userBirthdayChange={handleBirthdayChange} 
             birthdayError={birthdayError} />
        </MuiPickersUtilsProvider>
      </form>

      <Button onClick={handleSubmit}>Submit New User</Button>
    </div>
  );
};

export default CreateUser;
