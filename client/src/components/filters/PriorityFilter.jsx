import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPriorityFilter, selectPriorityFilter } from '../../store/todos/todosSlice';
import { Box, ButtonGroup, Button } from '@mui/material';

const PriorityFilter = () => {
  const priorityFilter = useSelector(selectPriorityFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (newPriorityFilter) => {
    dispatch(setPriorityFilter(newPriorityFilter));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <ButtonGroup variant="outlined" size="small" aria-label="priority filter">
        <Button 
          onClick={() => handleFilterChange('all')}
          variant={priorityFilter === 'all' ? 'contained' : 'outlined'}
          sx={{ px: 2, minWidth: '70px' }}
        >
          All
        </Button>
        <Button 
          onClick={() => handleFilterChange('HIGH')}
          variant={priorityFilter === 'HIGH' ? 'contained' : 'outlined'}
          sx={{ px: 2, minWidth: '70px' }}
        >
          High
        </Button>
        <Button 
          onClick={() => handleFilterChange('MEDIUM')}
          variant={priorityFilter === 'MEDIUM' ? 'contained' : 'outlined'}
          sx={{ px: 2, minWidth: '70px' }}
        >
          Medium
        </Button>
        <Button 
          onClick={() => handleFilterChange('LOW')}
          variant={priorityFilter === 'LOW' ? 'contained' : 'outlined'}
          sx={{ px: 2, minWidth: '70px' }}
        >
          Low
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default PriorityFilter; 