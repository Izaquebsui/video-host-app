import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Está correto, pois App.jsx está no mesmo nível!
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
