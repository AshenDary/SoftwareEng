import axios from 'axios';

const API_URL = 'http://localhost:5000/profile';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getProfile = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(API_URL, profileData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/password`, passwordData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Failed to change password:', error);
    throw error;
  }
};
