import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import useStyles from './Styles';

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

SortButton.propTypes = {
  handleSort: PropTypes.func,
  toBeSorted: PropTypes.string,
  selectedSortBtn: PropTypes.string,
};

export default SortButton;
