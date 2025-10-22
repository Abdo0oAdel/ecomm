import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, updateQuantity, clearCart, setCouponCode } from "./reducers.js";

const initialCartState = {
    items: [],
    couponCode: "",
}

const cartSlice = createSlice({
    name: 'CART',
    initialState: initialCartState,
    reducers: {
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCouponCode
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

