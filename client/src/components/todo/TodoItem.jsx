import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, toggleTodo, deleteTodo } from '../../store/todos/todosSlice';
import { 
  Card, CardContent, Checkbox, IconButton, Chip, Box, Typography, 
  TextField, FormControl, Select, MenuItem 
} from '@mui/material';
import { 
  Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, 
  Cancel as CancelIcon 
} from '@mui/icons-material';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo({ id: todo.id, completed: !todo.completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const startEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
  };

  const saveEdit = () => {
    if (editTitle.trim() !== '') {
      dispatch(updateTodo({ 
        id: todo.id, 
        title: editTitle.trim(), 
        priority: editPriority 
      }));
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 1,
        bgcolor: todo.completed ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: 2
        }
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggle}
            color="primary"
          />
          
          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <TextField
                size="small"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth
              />
              <FormControl size="small" sx={{ minWidth: '120px' }}>
                <Select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={saveEdit} color="primary" size="small">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={cancelEdit} color="secondary" size="small">
                <CancelIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body1"
                  sx={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                    wordBreak: 'break-word'
                  }}
                >
                  {todo.title}
                </Typography>
              </Box>
              
              <Chip 
                label={todo.priority}
                color={getPriorityColor(todo.priority)}
                size="small"
                variant="outlined"
                sx={{ 
                  minWidth: '70px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  onClick={startEdit}
                  color="primary" 
                  size="small"
                  disabled={todo.completed}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={handleDelete}
                  color="error" 
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
