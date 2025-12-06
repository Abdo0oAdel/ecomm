import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./Theme/slice.js";
import authReducer from "./Auth/slice.js";
import cartReducer from "./Cart/slice.js";
import wishlistReducer from "./Wishlist/slice.js";
import checkoutReducer from "./CheckOut/slice.js";
import { tokenManager } from "../utils/tokenManager.js";
import { authActions } from "./Auth/slice.js";
import { cartActions } from "./Cart/slice.js";
import { wishlistActions } from "./Wishlist/slice.js";
import { cartAPI, wishlistAPI } from "../utils/api.js";
import { loadState, saveState } from "../utils/localStorage.js";

const persistedState = loadState();

const store = configureStore({
    reducer: {
        theme : themeReducer,
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        checkout: checkoutReducer,
        users: (await import("./User/slice.js")).default
    },
    preloadedState: persistedState
});

store.subscribe(() => {
    const { auth, cart } = store.getState();
    // Only save cart to localStorage if the user is not authenticated
    if (!auth.isAuthenticated) {
        saveState({
            cart: cart
        });
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

                if (cartResponse) {
                    const cartData = cartResponse.data || cartResponse;
                    const cartItems = cartData.cart?.items || cartData.items || [];
                    const totalQuantity = cartData.totalQuantity || cartData.cart?.totalQuantity || cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

                    store.dispatch(cartActions.setCart({
                        items: cartItems,
                        totalQuantity: totalQuantity
                    }));
                }

                if (wishlistResponse) {
                    const data = wishlistResponse.data || wishlistResponse;
                    const rawItems = Array.isArray(data) ? data : data.items || data.wishlist || [];

                    // Fetch product details for each wishlist item
                    const { getProductById } = await import('../services/products');
                    const itemsWithDetails = await Promise.all(
                        rawItems.map(async (item) => {
                            try {
                                const product = await getProductById(item.productId);
                                return {
                                    id: item.productId,
                                    name: item.productName,
                                    currentPrice: item.price,
                                    image: product.imageURL,
                                    originalPrice: product.originalPrice,
                                    discount: product.discount,
                                    isInStock: product.isInStock,
                                    stock: product.stock,
                                    rating: product.rating,
                                    reviews: product.reviews,
                                };
                            } catch (e) {
                                return {
                                    id: item.productId,
                                    name: item.productName,
                                    currentPrice: item.price,
                                    image: '',
                                };
                            }
                        })
                    );
                    store.dispatch(wishlistActions.setWishlist(itemsWithDetails));
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