

import { axiosWithAuth } from "../utils/helpers";


export const getProductById = async (id) => {
  try {
    const response = await axiosWithAuth.get(`/Product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
};


export const getProducts = async () => {
  try {
    const response = await axiosWithAuth.get(`/Product`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};


export default {
  getProducts,
  getProductById,
};
