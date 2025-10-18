export const toggleTheme = (state) => {
    state.mode = state.mode === 'light' ? 'dark' : 'light';
}

export const setTheme = (state, action) => {
    state.mode = action.payload;
}

