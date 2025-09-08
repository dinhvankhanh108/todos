import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, selectFilter } from '../../store/todos/todosSlice';
import { ButtonGroup, Button, Box } from '@mui/material';

const StatusFilter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <ButtonGroup variant="outlined" size="small" aria-label="filter todos">
        <Button 
          onClick={() => handleFilterChange('all')}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          sx={{ 
            px: 2, 
            minWidth: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          All
        </Button>
        <Button 
          onClick={() => handleFilterChange('active')}
          variant={filter === 'active' ? 'contained' : 'outlined'}
          sx={{ 
            px: 2, 
            minWidth: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Incomplete
        </Button>
        <Button 
          onClick={() => handleFilterChange('completed')}
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          sx={{ 
            px: 2, 
            minWidth: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Completed
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default StatusFilter;
