import { Button, Divider, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import UsersHeaderTools from './UsersHeaderTools/UsersHeaderTools';

import useStyles from './Styles';
import SortButton from '../../SortButton/SortButton';

const UsersHeader = ({ handleSexFilter, sortUsers }) => {
  const [expandedHeader, setExpandedHeader] = useState(false);
  const [currentSort, setCurrentSort] = useState(null);
  const classes = useStyles();

  const handleExpandHeader = () => {
    setExpandedHeader((prev) => !prev);
  };

  return (
    <div className={classes.usersHeaderMain}>
      <div className={classes.usersHeader}>
        <div>
          <Typography>ID</Typography>
          <SortButton handleSort={sortUsers} toBeSorted='id'/>
        </div>
  
        <Divider orientation="vertical" flexItem />

        <div>
          <Typography>First Name</Typography>
          <SortButton handleSort={sortUsers} toBeSorted='firstName'/>
        </div>

        <Divider orientation="vertical" flexItem />
        
        <div>
          <Typography>Last Name</Typography>
          <SortButton handleSort={sortUsers} toBeSorted='lastName'/>
        </div>

        <Divider orientation="vertical" flexItem />
        
        <div className={classes.sex}>
          <Typography>Sex</Typography>
        </div>

        <Divider orientation="vertical" flexItem />
        <div className={classes.birthday}>
          <Typography>Birthday</Typography>
        </div>
        <Divider orientation="vertical" flexItem />
        <IconButton onClick={handleExpandHeader}>
          {expandedHeader ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      {expandedHeader && <UsersHeaderTools handleSexFilter={handleSexFilter} />}
    </div>
  );
};

export default UsersHeader;
