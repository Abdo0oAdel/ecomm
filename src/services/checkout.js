
import { checkoutAPI } from "../utils/api";
import { axiosWithAuth } from "../utils/helpers";

export async function placeOrder(orderData) {
  return checkoutAPI.placeOrder(orderData);
}

// Create PayPal payment for an order
export async function createPayPalPayment(orderId) {
  try {
    const response = await axiosWithAuth.post("/api/Payments", { orderId });
    return response.data;
  } catch (error) {
    // propagate error
    throw error;
  }
}
