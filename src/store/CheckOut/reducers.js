export const setShippingAddress = (state, action) => {
  state.shippingAddress = action.payload;
};

export const setPaymentMethod = (state, action) => {
  state.paymentMethod = action.payload;
};
export const updateField = (state, action) => {
  const { field, value } = action.payload;
  state.formData[field] = value;
};

export const setSaveInfo = (state, action) => {
  state.saveInfo = action.payload;
};

export const setCouponCode = (state, action) => {
  state.couponCode = action.payload;
};
export const setSelectedPayment = (state, action) => {
  state.selectedPayment = action.payload;
};

export const setCheckoutItems = (state, action) => {
  state.items = action.payload;
};

export const clearCheckoutData = (state) => {
    state.items = [];
    state.shippingAddress = null;
    state.paymentMethod = null;
};

export const addToCheckout = (state, action) => {
    const existingItem = state.items.find(item => item.id === action.payload.id);
    if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
    } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
    }
};

export const removeFromCheckout = (state, action) => {
    state.items = state.items.filter(item => item.id !== action.payload);
};

export const updateQuantity = (state, action) => {
    const item = state.items.find(
        item => item.id === action.payload.id || item.productId === action.payload.id
    );
    if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
    }
};
