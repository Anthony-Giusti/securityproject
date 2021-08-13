/* eslint-disable react/prop-types */
import {
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useTheme } from '@material-ui/styles';
import UsersHeaderTools from './UsersHeaderTools/UsersHeaderTools';

import useStyles from './Styles';
import SortButton from '../../../components/SortButton/SortButton';

const UsersHeader = ({ handleSexFilter, sortUsers }) => {
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
            <Typography>First Name</Typography>
            <SortButton
              handleSort={handleSort}
              toBeSorted="firstName"
              selectedSortBtn={selectedSortBtn}
            />
          </div>

          <Divider orientation="vertical" flexItem />

          <div className={classes.name}>
            <Typography>Last Name</Typography>
            <SortButton
              handleSort={handleSort}
              toBeSorted="lastName"
              selectedSortBtn={selectedSortBtn}
            />
          </div>

          <Divider orientation="vertical" flexItem />

          <div className={classes.sex}>
            <Typography>Sex</Typography>
          </div>

          <Divider orientation="vertical" flexItem />

          <div className={classes.birthday}>
            <Typography>Birthday</Typography>
            <SortButton
              handleSort={handleSort}
              toBeSorted="birthday"
              selectedSortBtn={selectedSortBtn}
            />
          </div>
        </span>

        <Divider orientation="vertical" flexItem />

        <span className={classes.dropDownBtn}>
          <IconButton size="small" onClick={handleExpandHeader}>
            {expandedHeader ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </span>
      </div>
      {expandedHeader && <UsersHeaderTools handleSexFilter={handleSexFilter} />}
    </div>
  );
};

export default UsersHeader;
