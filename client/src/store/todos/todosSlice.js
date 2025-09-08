import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todoAPI } from '../../service/api';

// Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await todoAPI.getTodos();
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await todoAPI.createTodo(todo);
  return response.data;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async ({ id, completed }) => {
  // const response = await todoAPI.toggleTodo(id, completed);
  const response = await todoAPI.updateTodo(id, { completed });
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, title, priority }) => {
  const response = await todoAPI.updateTodo(id, { title, priority });
  return response.data;
});

export const updatePriority = createAsyncThunk('todos/updatePriority', async ({ id, priority }) => {
  const response = await todoAPI.updateTodo(id, { priority });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await todoAPI.deleteTodo(id);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: 'all', // 'all' | 'completed' | 'active'
    priorityFilter: 'all', // 'all' | 'LOW' | 'MEDIUM' | 'HIGH'
    searchTerm: ''
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      // Toggle todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.todos.find(todo => todo.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      // Update todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todo = state.todos.find(todo => todo.id === action.payload.id);
        if (todo) {
          if (action.payload.title !== undefined) {
            todo.title = action.payload.title;
          }
          if (action.payload.priority !== undefined) {
            todo.priority = action.payload.priority;
          }
        }
      })
      // Update priority
      .addCase(updatePriority.fulfilled, (state, action) => {
        const todo = state.todos.find(todo => todo.id === action.payload.id);
        if (todo) {
          todo.priority = action.payload.priority;
        }
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  }
});

export const { setFilter, setPriorityFilter, setSearchTerm } = todosSlice.actions;

export const selectTodos = (state) => {
  const { todos, filter, priorityFilter, searchTerm } = state.todos;
  
  // First filter by search term
  let filteredTodos = todos;
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredTodos = todos.filter(todo => 
      todo.title.toLowerCase().includes(term)
    );
  }
  
  // Then filter by completion status
  if (filter === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  } else if (filter === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }
  
  // Then filter by priority
  if (priorityFilter !== 'all') {
    filteredTodos = filteredTodos.filter(todo => todo.priority === priorityFilter);
  }
  
  return filteredTodos;
};

export const selectFilter = (state) => state.todos.filter;
export const selectPriorityFilter = (state) => state.todos.priorityFilter;
export const selectSearchTerm = (state) => state.todos.searchTerm;
export const selectStatus = (state) => state.todos.status;
export const selectError = (state) => state.todos.error;

export default todosSlice.reducer;
