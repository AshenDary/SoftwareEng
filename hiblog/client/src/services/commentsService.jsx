import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/comments`;

export const getComments = async (articleId) => {
  try {
    const url = articleId ? `${API_URL}?articleId=${articleId}` : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    throw error;
  }
};

export const getComment = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch comment:', error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(API_URL, commentData);
    return response.data;
  } catch (error) {
    console.error('Failed to create comment:', error);
    throw error;
  }
};

export const updateComment = async (id, commentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Failed to update comment:', error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete comment:', error);
    throw error;
  }
};
