export const setCartCount = (state, action) => {
    state.count = action.payload;
}
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
    const item = state.items.find(
        item => item.id === action.payload.id || item.productId === action.payload.id
    );
    if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
    }
}

export const clearCart = (state) => {
    state.items = [];
    state.count = 0;
}

export const setCouponCode = (state, action) => {
    state.couponCode = action.payload;
}

export const setCart = (state, action) => {
    if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.count = action.payload.length;
    } else if (action.payload && Array.isArray(action.payload.items)) {
        state.items = action.payload.items;
        state.count = typeof action.payload.totalQuantity === 'number' ? action.payload.totalQuantity : action.payload.items.length;
    } else {
        state.items = [];
        state.count = 0;
    }
}

