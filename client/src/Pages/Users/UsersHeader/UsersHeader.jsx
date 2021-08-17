import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Divider, IconButton, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import UsersHeaderTools from './UsersHeaderTools/UsersHeaderTools';

import useStyles from './Styles';
import SortButton from '../../../components/SortButton/SortButton';

const UsersHeader = ({ handleSexFilter, sortUsers, userData, sexFilter }) => {
  const [expandedHeader, setExpandedHeader] = useState(false);
  const [selectedSortBtn, setSelectedSortBtn] = useState('_id');
  const classes = useStyles();

  const handleSort = (direction, toBeSorted) => {
    sortUsers(direction, toBeSorted);

    setSelectedSortBtn(toBeSorted);
  };

  const handleExpandHeader = () => {
    setExpandedHeader((prev) => !prev);
  };

  return (
    <div className={classes.usersHeaderMain}>
      <div className={classes.usersHeader}>
        <span className={classes.usersDivders}>
          <div className={classes.name}>
            <Typography className={classes.columnName}>First Name</Typography>
            <SortButton
              handleSort={handleSort}
              toBeSorted="firstName"
              selectedSortBtn={selectedSortBtn}
            />
          </div>

          <Divider orientation="vertical" flexItem />

          <div className={classes.name}>
            <Typography className={classes.columnName}>Last Name</Typography>
            <SortButton
              handleSort={handleSort}
              toBeSorted="lastName"
              selectedSortBtn={selectedSortBtn}
            />
          </div>

          <Divider orientation="vertical" flexItem />

          <div className={classes.sex}>
            <Typography className={classes.columnName}>Sex</Typography>
          </div>

          <Divider light orientation="vertical" flexItem />

          <div className={classes.birthday}>
            <Typography className={classes.columnName}>Birthday</Typography>
            <SortButton
              handleSort={handleSort}
              toBeSorted="birthday"
              selectedSortBtn={selectedSortBtn}
            />
          </div>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={classes.dropDownBtnContainer}>
          <IconButton
            className={classes.dropDownBtn}
            size="small"
            onClick={handleExpandHeader}
          >
            {expandedHeader ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </span>
      </div>
      {expandedHeader && (
        <UsersHeaderTools
          handleSexFilter={handleSexFilter}
          userData={userData}
          sexFilter={sexFilter}
        />
      )}
    </div>
  );
};

UsersHeader.propTypes = {
  handleSexFilter: PropTypes.func,
  sortUsers: PropTypes.func,
  userData: PropTypes.array,
  sexFilter: PropTypes.array,
};

export default UsersHeader;
