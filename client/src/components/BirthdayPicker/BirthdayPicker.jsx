import React from 'react';
import PropTypes from 'prop-types';

import { KeyboardDatePicker } from '@material-ui/pickers';

const BirthdayPicker = ({ userBirthday, userBirthdayChange }) => {
  const handleDateChange = (newBirthday) => {
    userBirthdayChange(newBirthday);
  };

  return (
    <>
      <KeyboardDatePicker
        inputVariant="outlined"
        openTo="year"
        disableToolbar
        variant="dialog"
        format="MM/dd/yyyy"
        maxDate={new Date()}
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
};

export default BirthdayPicker;
