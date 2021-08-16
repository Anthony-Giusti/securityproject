/* eslint-disable react/prop-types */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import useStyles from './Styles';
import Theme from '../../../../Themes/Theme';
import getAverageInt from '../../../../components/util/functions/getAverageInt';

const UsersHeaderTools = ({ handleSexFilter, userData }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    handleSexFilter(e.target.value);
  };

  const handleGetAverage = () => {
    const now = new Date();

    // userAges = usersData.forEach((user) => {

    // })

    // return getAverageInt();
  }

  const classes = useStyles();

  return (
    <div className={classes.toolsMain}>
      <div className={classes.toolsSection}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Only Include</FormLabel>
          <FormGroup>
            <FormControlLabel
              onChange={handleChange}
              control={<Checkbox name="male" />}
              value="M"
              label="Male"
            />
            <FormControlLabel
              control={<Checkbox name="female" />}
              onChange={handleChange}
              value="F"
              label="Female"
            />
            <FormControlLabel
              control={<Checkbox name="non-binary" />}
              onChange={handleChange}
              value="NB"
              label="Non-Binary"
            />
          </FormGroup>
        </FormControl>
      </div>
      {/* <div className={classes.toolsSection}>
        Beep
      </div> */}
    </div>
  );
};

export default UsersHeaderTools;
