import { axiosWithAuth } from "../utils/helpers";

export async function placeOrder(orderData) {
  try {
    // Assuming the backend endpoint for placing an order is /orders
    const response = await axiosWithAuth.post("/orders", orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to place order');
  }
}
