import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./Theme/slice.js";
import authReducer from "./Auth/slice.js";
import cartReducer from "./Cart/slice.js";
import wishlistReducer from "./Wishlist/slice.js";

const store = configureStore({
    reducer: {
        theme : themeReducer,
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
});

export default store;