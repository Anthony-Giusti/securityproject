import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Button, Divider, IconButton, Typography } from "@material-ui/core";

const SortButton = ({ handleSort, toBeSorted, selectedSortBtn }) => {
  const [currentDirection, setCurrentDirection] = useState("descending");

  const handleClick = (direction) => {
    handleSort(direction, toBeSorted);

    if (direction === "ascending") {
      setCurrentDirection("descending");
    } else if (direction === "descending") {
      setCurrentDirection("ascending");
    }
  };

  return (
    <>
      {currentDirection === "descending" && (
        <IconButton
          color={selectedSortBtn === toBeSorted ? "secondary" : "default"}
          onClick={() => handleClick("descending")}
        >
          <ExpandLessIcon id={toBeSorted} />
        </IconButton>
      )}
      {currentDirection === "ascending" && (
        <IconButton
          color={selectedSortBtn === toBeSorted ? "secondary" : "primary"}
          onClick={() => handleClick("ascending")}
        >
          <ExpandMoreIcon id={toBeSorted} />
        </IconButton>
      )}
    </>
  );
};

export default SortButton;
