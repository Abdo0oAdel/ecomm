
import { createRoot } from "react-dom/client";

import "./assets/styles/styles.css";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById("root")).render(
      <App />
);
