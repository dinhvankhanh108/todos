import React from 'react';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';
import StatusFilter from '../components/filters/StatusFilter';
import PriorityFilter from '../components/filters/PriorityFilter';
import SearchFilter from '../components/filters/SearchFilter';
import { Container, Paper, Typography, Box, Divider } from '@mui/material';

const TodoPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          bgcolor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(10px)',
          borderRadius: 2
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography 
            variant="h4" 
            component="h1"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1
            }}
          >
            Tasks
          </Typography>
        </Box>
        <TodoForm />
        <hr />
        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <SearchFilter />
          <StatusFilter />
          <PriorityFilter />
        </Box>
        <TodoList />
      </Paper>
    </Container>
  );
};

export default TodoPage;