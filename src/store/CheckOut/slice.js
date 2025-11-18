import { createSlice } from "@reduxjs/toolkit";
import {
  setShippingAddress,
  setPaymentMethod,
  setCheckoutItems,
  clearCheckoutData,
  addToCheckout,
  removeFromCheckout,
  updateQuantity,
  updateField,
  setSaveInfo,
  setCouponCode,
  setSelectedPayment,
} from "./reducers.js";

const initialState = {
  items: [],
  shippingAddress: null,
  paymentMethod: null,
  formData: {
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  },
  saveInfo: false,
  couponCode: "",
  selectedPayment: "bank",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingAddress,
    setPaymentMethod,
    setCheckoutItems,
    clearCheckoutData,
    addToCheckout,
    removeFromCheckout,
    updateQuantity,
    updateField,
    setSaveInfo,
    setCouponCode,
    setSelectedPayment,
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;