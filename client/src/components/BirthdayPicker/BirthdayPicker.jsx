import React from 'react';
import PropTypes from 'prop-types';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const BirthdayPicker = ({
  userBirthday,
  userBirthdayChange,
  birthdayError,
}) => {
  const handleDateChange = (newBirthday) => {
    userBirthdayChange(newBirthday);
  };

  return (
    <>
      <KeyboardDatePicker
        inputVariant="outlined"
        openTo="year"
        error={birthdayError}
        helperText={birthdayError ? 'Birthday must be in the past' : ''}
        disableToolbar
        variant="dialog"
        format="MM/dd/yyyy"
        maxDate={new Date()}
        id="date-picker-inline"
        label="Date picker inline"
        value={userBirthday}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </>
  );
};

BirthdayPicker.propTypes = {
  userBirthday: PropTypes.object,
  userBirthdayChange: PropTypes.func,
  birthdayError: PropTypes.bool,
};

export default BirthdayPicker;
