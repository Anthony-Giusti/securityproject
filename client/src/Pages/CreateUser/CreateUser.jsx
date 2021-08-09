import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

const CreateUser = () => {
  let firstNameField;
  let lastNameField;

  return (
    <div>
      <Typography>New User</Typography>
      <form>
        <TextField
          // error={firstNameError}
          // onChange={editMade}
          label="First Name"
          // helperText={firstNameError ? 'Must contain only letters' : ''}
          inputRef={(ref) => {
            firstNameField = ref;
          }}
        />

        <TextField
          // error={lastNameError}
          // onChange={editMade}
          label="Last Name"
          // helperText={lastNameError ? 'Must contain only letters' : ''}
          inputRef={(ref) => {
            lastNameField = ref;
          }}
        />

        <FormControl>
          <InputLabel>Sex</InputLabel>
          <Select defaultValue={3}>
            <MenuItem value={1}>M</MenuItem>
            <MenuItem value={2}>F</MenuItem>
            <MenuItem value={3}>NB</MenuItem>
          </Select>
        </FormControl>

        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <BirthdayPicker
                userBirthday={userBirthday}
                userBirthdayChange={userBirthdayChange}
                />
            </MuiPickersUtilsProvider> */}
      </form>
    </div>
  );
};

export default CreateUser;
