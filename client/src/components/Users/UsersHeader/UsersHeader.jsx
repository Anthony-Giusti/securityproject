import { Divider, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import UsersHeaderTools from "./UsersHeaderTools/UsersHeaderTools";

import useStyles from "./Styles";
import SortButton from "../../SortButton/SortButton";

const UsersHeader = ({ handleSexFilter, sortUsers }) => {
  const [expandedHeader, setExpandedHeader] = useState(false);
  const [selectedSortBtn, setSelectedSortBtn] = useState("_id");
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
        <div>
          <Typography>ID</Typography>
          <SortButton
            handleSort={handleSort}
            toBeSorted="_id"
            selectedSortBtn={selectedSortBtn}
          />
        </div>

        <Divider orientation="vertical" flexItem />

        <div>
          <Typography>First Name</Typography>
          <SortButton
            handleSort={handleSort}
            toBeSorted="firstName"
            selectedSortBtn={selectedSortBtn}
          />
        </div>

        <Divider orientation="vertical" flexItem />

        <div>
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
