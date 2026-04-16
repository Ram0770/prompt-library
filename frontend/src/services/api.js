import axios from 'axios';

const API_URL = '/prompts';

export const getPrompts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPrompt = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPrompt = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
