import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todos/todosSlice';
import { Button, TextField, Paper, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      // Không cần tự tạo ID, JSON Server sẽ tự động tạo
      dispatch(addTodo({ title: title.trim(), priority, completed: false }));
      setTitle('');
      setPriority('MEDIUM');
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        bgcolor: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(8px)',
        borderRadius: 2,
        mb: 2
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            fullWidth
          />
          <FormControl size="small" sx={{ minWidth: '140px', flexShrink: 0 }}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </Select>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TodoForm;
