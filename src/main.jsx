import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import "./assets/styles/styles.css";
import "./assets/styles/rtl.css";
import App from "./App.jsx";
import store from "./store/index.js";
import i18n from "./i18n/config.js";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>
);
