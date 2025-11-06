import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./Theme/slice.js";
import authReducer from "./Auth/slice.js";
import cartReducer from "./Cart/slice.js";
import wishlistReducer from "./Wishlist/slice.js";
import { tokenManager } from "../utils/tokenManager.js";
import { authActions } from "./Auth/slice.js";
import { cartActions } from "./Cart/slice.js";
import { wishlistActions } from "./Wishlist/slice.js";
import { cartAPI, wishlistAPI } from "../utils/api.js";

const store = configureStore({
    reducer: {
        theme : themeReducer,
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
});

// Initialize auth state from tokens on app load
const initializeAuth = async () => {
    // Set up callback to sync Redux when tokens are cleared
    tokenManager.setOnTokensClearedCallback(() => {
        store.dispatch(authActions.logout());
    });

    // Restore auth state if valid tokens exist
    if (tokenManager.hasTokens()) {
        const user = tokenManager.getUserFromToken();

        if (user) {
            store.dispatch(authActions.restoreAuth({ user }));

            // Load cart and wishlist from backend
            try {
                const [cartResponse, wishlistResponse] = await Promise.all([
                    cartAPI.getCart(),
                    wishlistAPI.getWishlist()
                ]);

                if (cartResponse?.cart) {
                    store.dispatch(cartActions.setCart(cartResponse.cart));
                }

                if (wishlistResponse?.wishlist) {
                    store.dispatch(wishlistActions.setWishlist(wishlistResponse.wishlist));
                }
            } catch (error) {
                // Silently fail - user can still use the app
            }
        }
    }
};

// Initialize on store creation
initializeAuth();

export default store;