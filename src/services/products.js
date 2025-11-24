

import { axiosWithAuth } from "../utils/helpers";



export const getProductById = async (id) => {
  try {
    const response = await axiosWithAuth.get(`/Product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axiosWithAuth.post(`/Product`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosWithAuth.put(`/Product/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosWithAuth.delete(`/Product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosWithAuth.get(`/Product/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
  }
};

export const getMyProducts = async () => {
  try {
    const response = await axiosWithAuth.get(`/Product/my-products`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch my products');
  }
};

export const getProductsByUser = async (userId) => {
  try {
    const response = await axiosWithAuth.get(`/Product/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products by user');
  }
};

export const uploadProductImages = async (productId, images) => {
  try {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    const response = await axiosWithAuth.post(`/Product/${productId}/images`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload product images');
  }
};

export const deleteProductImages = async (productId) => {
  try {
    const response = await axiosWithAuth.delete(`/Product/${productId}/images`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product images');
  }
};

export const deleteSingleProductImage = async (productId, imageId) => {
  try {
    const response = await axiosWithAuth.delete(`/Product/${productId}/images/${imageId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product image');
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
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getMyProducts,
  getProductsByUser,
  uploadProductImages,
  deleteProductImages,
  deleteSingleProductImage,
};
