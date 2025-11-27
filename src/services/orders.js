// src/services/orders.js

import { axiosWithAuth } from "../utils/helpers";

// Get all orders (admin)
export const getOrders = async () => {
    try {
        const response = await axiosWithAuth.get("/api/orders");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch orders");
    }
};

// Get a single order by ID
export const getOrderById = async (id) => {
    try {
        const response = await axiosWithAuth.get(`/api/orders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch order");
    }
};

// Update an order's status
export const updateOrder = async (id, statusData) => {
    try {
        const response = await axiosWithAuth.put(`/api/orders/${id}`, statusData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update order");
    }
};

// Cancel an order
export const deleteOrder = async (id) => {
    try {
        const response = await axiosWithAuth.delete(`/api/orders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to cancel order");
    }
};

// Get all orders for a specific user
export const getOrdersByUser = async (userId) => {
    try {
        const response = await axiosWithAuth.get(`/api/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch user orders");
    }
};

// Create an order from current user's cart (checkout)
export const checkoutOrder = async (checkoutData) => {
    try {
        const response = await axiosWithAuth.post("/api/orders/checkout", checkoutData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create order");
    }
};

export default {
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUser,
    checkoutOrder,
};
