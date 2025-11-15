export async function removeCartItem(productId) {
  try {
    const response = await axiosWithAuth.delete(`/Cart/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove cart item');
  }
}

// Update cart item quantity
export async function updateCartItemQuantity(productId, quantity) {
  try {
    // Assuming backend expects PUT /Cart/{productId} with { quantity }
    const response = await axiosWithAuth.put(`/Cart/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update cart item');
  }
}
import { axiosWithAuth } from "../utils/helpers";

export async function addToCart(productId, quantity = 1) {
  try {
    const response = await axiosWithAuth.post(`/Cart/${productId}?quantity=${quantity}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add to cart');
  }
}

export async function getCart() {
  try {
    const response = await axiosWithAuth.get("/Cart");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch cart');
  }
}
