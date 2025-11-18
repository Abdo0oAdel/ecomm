import { checkoutAPI } from "../utils/api";

export async function placeOrder(orderData) {
  return checkoutAPI.placeOrder(orderData);
}
