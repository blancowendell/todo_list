import API from './api';

export const fetchTodos = () => API.get('/todos');
export const createTodo = (title, userId, description, assignType) => {return API.post('/todos', { title, userId, description, assignType });};
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
