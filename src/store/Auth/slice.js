import {createSlice} from "@reduxjs/toolkit";
import {login, logout} from "./reducers.js";

const initialAuthState = {
    isAuthenticated: true,
}

const authSlice = createSlice({
    name: 'AUTHENTICATION',
    initialState: initialAuthState,
    reducers: {
        login,
        logout
    }
})


export const authActions = authSlice.actions;

export default authSlice.reducer;