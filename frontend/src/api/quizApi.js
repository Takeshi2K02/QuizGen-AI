// src/api/quizApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/quiz';

export const generateQuiz = async ({ passage, total, difficulty, title }) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, {
      passage,
      total,
      difficulty,
      title,
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error generating quiz:', error.response?.data || error.message);
    throw error;
  }
};

export const getMyQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching quizzes:', error.response?.data || error.message);
    throw error;
  }
};

export const getQuizById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching quiz by ID:', error.response?.data || error.message);
    throw error;
  }
};
