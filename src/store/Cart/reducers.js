export const addToCart = (state, action) => {
    const existingItem = state.items.find(item => item.id === action.payload.id);
    if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
    } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
    }
}

export const removeFromCart = (state, action) => {
    state.items = state.items.filter(item => item.id !== action.payload);
}

export const updateQuantity = (state, action) => {
    const item = state.items.find(item => item.id === action.payload.id);
    if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
    }
}

export const clearCart = (state) => {
    state.items = [];
}

export const setCouponCode = (state, action) => {
    state.couponCode = action.payload;
}

