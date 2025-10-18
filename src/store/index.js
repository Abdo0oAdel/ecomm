import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./Theme/slice.js";
import authReducer from "./Auth/slice.js";

const store = configureStore({
    reducer: {
        theme : themeReducer,
        auth: authReducer
    }
});

export default store;