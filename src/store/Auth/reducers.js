export const login = (state, action) => {
    state.isAuthenticated = true
    state.user = action.payload.user
    state.error = null
    state.loading = false
}

export const logout = (state) => {
    state.isAuthenticated = false
    state.user = null
    state.error = null
}

export const setLoading = (state, action) => {
    state.loading = action.payload
}

export const setError = (state, action) => {
    state.error = action.payload
    state.loading = false
}

export const clearError = (state) => {
    state.error = null
}