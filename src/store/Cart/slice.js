import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, updateQuantity, clearCart, setCouponCode, setCart } from "./reducers.js";

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
        setCouponCode,
        setCart
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

