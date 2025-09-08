import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../../store/todos/todosSlice';
import { TextField, Box } from '@mui/material';

const SearchFilter = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        fullWidth
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default SearchFilter;
