import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Button, Divider, IconButton, Typography } from '@material-ui/core';

const SortButton = ({handleSort, isCurrentlySelected, toBeSorted}) => {
    const [currentDirection, setCurrentDirection] = useState('descending')

    const handleClick = (direction) => {
        handleSort(direction, toBeSorted)

        if (direction === 'ascending') {
            setCurrentDirection('descending');
        } else if (direction === 'descending') {
            setCurrentDirection('ascending')
        }
    }


    return (
        <>
                {currentDirection === 'descending' &&( 
                <IconButton onClick={() => handleClick('descending')}>
                    <ExpandLessIcon />
                </IconButton>)
                }
                {currentDirection === 'ascending' &&( 
                <IconButton onClick={() => handleClick('ascending')}>
                    <ExpandMoreIcon />
                </IconButton>)
                }
        </>
    )
}

export default SortButton;