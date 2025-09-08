import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // JSON Server local

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Todo API endpoints
export const todoAPI = {
  // Get all todos
  getTodos: () => api.get('/todos'),
  
  // Get todo by ID
  getTodoById: (id) => api.get(`/todos/${id}`),
  
  // Create new todo
  createTodo: (todoData) => {
    console.log('todoData', todoData)
    return api.post('/todos', todoData); // JSON Server sẽ tự động tạo ID unique
  },
  
  // Update todo
  updateTodo: (id, todoData) => {
    console.log('todoDataEdit', todoData)
    console.log('id', id)
    return api.patch(`/todos/${id}`, todoData);
  },

  deleteTodo: (id) => {
    return api.delete(`/todos/${id}`);
  }
};

export default api;
