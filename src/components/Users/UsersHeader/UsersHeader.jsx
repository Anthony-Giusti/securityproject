import { Button, Divider, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import UsersHeaderTools from './UsersHeaderTools/UsersHeaderTools';

import useStyles from './Styles';

const UsersHeader = ({ handleSexFilter, sortUsers }) => {
  const [expandedHeader, setExpandedHeader] = useState(false);
  const classes = useStyles();

  const handleExpandHeader = () => {
    setExpandedHeader((prev) => !prev);
  };

  return (
    <div className={classes.usersHeaderMain}>
      <div className={classes.usersHeader}>
        <div className={classes.name}>
          <Typography>First Name</Typography>
          <IconButton onClick={() => sortUsers('beep', 'firstName')}>
            <ExpandLessIcon />
          </IconButton>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={classes.name}>
          <Typography>Last Name</Typography>
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
