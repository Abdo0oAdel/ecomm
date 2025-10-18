import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./theme/slice.js";
import authReducer from "./auth/slice.js";

const store = configureStore({
    reducer: {
        counter : themeReducer,
        auth: authReducer
    }
});

export default store;