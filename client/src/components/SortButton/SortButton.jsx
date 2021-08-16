/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Button, Divider, IconButton, Typography } from '@material-ui/core';
import useStyles from './styles';

const SortButton = ({ handleSort, toBeSorted, selectedSortBtn }) => {
  const [currentDirection, setCurrentDirection] = useState('descending');
  const classes = useStyles();

  const handleClick = (direction) => {
    handleSort(direction, toBeSorted);

    if (direction === 'ascending') {
      setCurrentDirection('descending');
    } else if (direction === 'descending') {
      setCurrentDirection('ascending');
    }
  };

  return (
    <>
      {currentDirection === 'ascending' && (
        <IconButton
          className={
            selectedSortBtn === toBeSorted
              ? classes.btnActive
              : classes.btnPassive
          }
          onClick={() => handleClick('ascending')}
        >
          <ArrowUpwardIcon id={toBeSorted} />
        </IconButton>
      )}
      {currentDirection === 'descending' && (
        <IconButton
          className={
            selectedSortBtn === toBeSorted
              ? classes.btnActive
              : classes.btnPassive
          }
          onClick={() => handleClick('descending')}
        >
          <ArrowDownwardIcon id={toBeSorted} />
        </IconButton>
      )}
    </>
  );
};

export default SortButton;
