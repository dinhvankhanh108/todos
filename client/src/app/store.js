import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../store/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

