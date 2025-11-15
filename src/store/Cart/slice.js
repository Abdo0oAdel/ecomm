import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, updateQuantity, clearCart, setCouponCode, setCart, setCartCount } from "./reducers.js";

const initialCartState = {
    items: [],
    couponCode: "",
    count: 0,
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
        setCart,
        setCartCount
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

