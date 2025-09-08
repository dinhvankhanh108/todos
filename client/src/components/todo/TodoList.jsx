import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, selectTodos, selectStatus, selectError } from '../../store/todos/todosSlice';
import TodoItem from './TodoItem';
import { Card, CardContent, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { Assignment, Error } from '@mui/icons-material';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = (
      <Box display="flex" justifyContent="center" alignItems="center" p={10}>
        <CircularProgress sx={{ mr: 2 }} />
        <Typography variant="body1" color="text.secondary">Loading tasks...</Typography>
      </Box>
    );
  } else if (status === 'succeeded') {
    content = (
      <Box 
        display="flex" 
        flexDirection="column" 
        gap={2} 
        sx={{ 
          pb: 1,
          height: '500px', // Chiều cao cố định thay vì maxHeight
          overflowY: 'auto', // Thêm scroll dọc
          pr: 1, // Padding để tránh scrollbar che nội dung
        }}
      >
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Box key={todo.id} sx={{ flexShrink: 0 }}>
              <TodoItem
                todo={todo}
              />
            </Box>
          ))
        ) : (
          <Card sx={{ border: '2px dashed', borderColor: 'divider', width: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 5 }}>
              <Assignment sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No tasks found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add a new task to get started
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    );
  } else if (status === 'failed') {
    content = (
      <Alert severity="error" icon={<Error />}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {content}
    </Box>
  );
};

export default TodoList;
