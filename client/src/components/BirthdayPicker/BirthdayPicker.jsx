/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import date from 'date-and-time';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // container: {
  //   display: "flex",
  //   flexWrap: "wrap",
  // },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: 200,
  // },
}));

const BirthdayPicker = ({
  userBirthday,
  userBirthdayChange,
  birthdayError,
}) => {
  const classes = useStyles();

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

export default BirthdayPicker;
