import API from './api';

export const login = (username, password) =>
  API.post('/auth/login', { username, password });

export const register = (username, password) =>
  API.post('/auth/register', { username, password });
