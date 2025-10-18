
import { createRoot } from "react-dom/client";
import "./assets/styles/styles.css";
import App from "./App.jsx";
import store from "./store/index.js";
import provider from "react-redux/src/components/Provider.js";

createRoot(document.getElementById("root")).render(
    <provider store={store}>
      <App />
    </provider>
);
