import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/auth`;

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
