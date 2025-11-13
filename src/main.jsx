import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./assets/styles/styles.css";
import "./assets/styles/rtl.css";
import App from "./App.jsx";
import store from "./store/index.js";
import "./i18n/config.js";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
