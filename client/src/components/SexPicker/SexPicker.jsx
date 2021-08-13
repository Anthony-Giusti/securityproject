/* eslint-disable react/prop-types */
import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import sexStringToInt from '../util/functions/sexStringToInt';

const SexPicker = ({ userSex, changeUserSex }) => (
  <FormControl>
    <InputLabel>Sex</InputLabel>
    <Select onChange={changeUserSex} defaultValue={sexStringToInt(userSex)}>
      <MenuItem value={1}>M</MenuItem>
      <MenuItem value={2}>F</MenuItem>
      <MenuItem value={3}>NB</MenuItem>
    </Select>
  </FormControl>
);

export default SexPicker;
