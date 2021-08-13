import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import BirthdayPicker from '../BirthdayPicker/BirthdayPicker';

const userForm = ({ user }) => {
  const [userSex, setUserSex] = useState(
    user ? sexStringToInt(selectedUser.sex) : 3
  );
  const [userBirthday, setUserBirthday] = useState(
    user ? brithdayStringToDate(selectedUser.birthday) : new Date()
  );

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const x = 'beep';

  const userSexChange = (e) => {
    setUserSex(e.target.value);
    editMade();
  };

  return (
    <>
      <TextField
        error={firstNameError}
        onChange={editMade}
        label="First Name"
        helperText={firstNameError ? 'Must contain only letters' : ''}
        defaultValue={user ? user.firstName : ''}
        inputRef={(ref) => {
          firstNameField = ref;
        }}
      />

      <TextField
        error={lastNameError}
        onChange={editMade}
        label="Last Name"
        helperText={lastNameError ? 'Must contain only letters' : ''}
        defaultValue={user ? user.lastName : ''}
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
    </>
  );
};
