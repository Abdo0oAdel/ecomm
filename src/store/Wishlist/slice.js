import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist, removeFromWishlist, clearWishlist, moveAllToBag, setWishlist } from "./reducers.js";

const initialWishlistState = {
    items: [],
}

const wishlistSlice = createSlice({
    name: 'WISHLIST',
    initialState: initialWishlistState,
    reducers: {
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        moveAllToBag,
        setWishlist
    }
})

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;

