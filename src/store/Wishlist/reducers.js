export const addToWishlist = (state, action) => {
    const exists = state.items.find(item => item.id === action.payload.id);
    if (!exists) {
        state.items.push(action.payload);
    }
}

export const removeFromWishlist = (state, action) => {
    state.items = state.items.filter(item => item.id !== action.payload);
}

export const clearWishlist = (state) => {
    state.items = [];
}

export const moveAllToBag = (state) => {
    // This will be handled in the component by dispatching addToCart for each item
    state.items = [];
}

export const setWishlist = (state, action) => {
    state.items = action.payload;
}

