import axios from 'axios';

const API_URL = 'http://localhost:5000/statistics';

export const getStatistics = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    throw error;
  }
};
