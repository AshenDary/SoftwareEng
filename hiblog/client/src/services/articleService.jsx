import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/articles`;

export const getArticles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

export const getArticle = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await axios.post(API_URL, articleData);
    return response.data;
  } catch (error) {
    console.error('Failed to create article:', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error('Failed to update article:', error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw error;
  }
};
