import { createRoot } from "react-dom/client";
import "./assets/styles/styles.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);
