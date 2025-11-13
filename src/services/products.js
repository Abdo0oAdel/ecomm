import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/Product`);
  return response.data;
};

export default {
  getProducts,
};
