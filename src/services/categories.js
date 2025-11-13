import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/Categories`);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/Categories/${id}`);
  return response.data;
};

export default {
  getCategories,
  getCategoryById,
};
