import API from './api';

export const fetchUsers = async () => {
  try {
    const response = await API.get('/users');
    return response;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
