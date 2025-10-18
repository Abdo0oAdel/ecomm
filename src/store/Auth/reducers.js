export const login = (state, action) => {
    state.isAuthenticated = true
    state.user = action.payload.user
    state.token = action.payload.token
}

export const logout = (state) => {
    state.isAuthenticated = false
    state.user = null
    state.token = null
}