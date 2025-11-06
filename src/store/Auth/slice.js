import {createSlice} from "@reduxjs/toolkit";
import {login, logout, restoreAuth, setLoading, setError, clearError} from "./reducers.js";

const initialAuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'AUTHENTICATION',
    initialState: initialAuthState,
    reducers: {
        login,
        logout,
        restoreAuth,
        setLoading,
        setError,
        clearError
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;