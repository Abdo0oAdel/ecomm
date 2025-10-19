import {createSlice} from "@reduxjs/toolkit";
import {toggleTheme, setTheme} from "./reducers.js";

const initialThemeState = {
    mode: 'light',
}

const themeSlice = createSlice({
    name: 'THEME',
    initialState: initialThemeState,
    reducers: {
        toggleTheme,
        setTheme
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;

