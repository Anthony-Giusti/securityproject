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

const UsersHeaderTools = ({ handleSexFilter }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    handleSexFilter(e.target.value);
  };

  return (
    <div>
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
  );
};

export default UsersHeaderTools;
