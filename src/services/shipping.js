import { axiosWithAuth } from "../utils/helpers";

export const getShipping = async () => {
  try {
    const response = await axiosWithAuth.get("/api/Shipping");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch shipping info");
  }
};

export const getShippingById = async (id) => {
  try {
    const response = await axiosWithAuth.get(`/api/Shipping/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch shipping info by ID");
  }
};

export const createShipping = async (shippingData) => {
  try {
    const response = await axiosWithAuth.post("/api/Shipping", shippingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create shipping info");
  }
};

export const updateShipping = async (id, shippingData) => {
  try {
    const response = await axiosWithAuth.put(`/api/Shipping/${id}`, shippingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update shipping info");
  }
};

export const updateShippingStatus = async (id, statusData) => {
  try {
    const response = await axiosWithAuth.patch(`/api/Shipping/${id}/status`, statusData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update shipping status");
  }
};

export default {
  getShipping,
  getShippingById,
  createShipping,
  updateShipping,
  updateShippingStatus,
};
