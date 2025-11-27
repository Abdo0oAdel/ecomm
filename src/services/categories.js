
import { axiosWithAuth } from "../utils/helpers";


export const getCategories = async () => {
  try {
    const response = await axiosWithAuth.get(`/api/Categories`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories');
  }
};


export const getCategoryById = async (id) => {
  try {
    const response = await axiosWithAuth.get(`/api/Categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch category');
  }
};


export default {
  getCategories,
  getCategoryById,
};
